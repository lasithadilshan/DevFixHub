import { TutorialArticle } from "../types";

export const TUTORIALS_AI: TutorialArticle[] = [
  {
    title: "Building a Production RAG Pipeline with LangChain and Vector Databases",
    description: "Step-by-step guide to architecting an enterprise Retrieval-Augmented Generation (RAG) system with semantic chunking, dense embeddings, vector search, and cross-encoder re-ranking.",
    slug: "building-rag-pipeline-langchain",
    category: "AI",
    tags: ["ai", "rag", "langchain", "vector-database", "embeddings", "python"],
    date: "2026-03-10",
    author: "DevFixHub Core Team",
    readingTime: "14 min",
    difficulty: "Advanced",
    prerequisites: [
      "Python 3.10+ and virtual environments",
      "Basic understanding of embeddings and vector distance metrics",
      "OpenAI API key or local embedding model provider"
    ],
    sections: [
      {
        title: "1. Core Architecture of a Production RAG System",
        content: "A standard naive RAG system suffers from low retrieval precision and context fragmentation. A production-grade RAG pipeline incorporates document normalization, recursive chunking with sentence boundary preservation, dense vector storage (e.g. Chroma, pgvector, or Pinecone), metadata filtering, and reciprocal rank fusion (RRF) with a cross-encoder re-ranker before passing context to the LLM.",
        code: `# Install production dependencies
pip install langchain langchain-openai langchain-community chromadb sentence-transformers`,
        language: "bash"
      },
      {
        title: "2. Document Ingestion and Semantic Chunking",
        content: "Fixed-character chunking often slices code blocks or sentences mid-phrase. Using LangChain's RecursiveCharacterTextSplitter with separator hierarchies ('\\n\\n', '\\n', '. ', ' ') preserves semantic integrity while maintaining token boundaries.",
        code: `from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# 1. Load markdown/text documents
loader = DirectoryLoader(
    "./knowledge_base",
    glob="**/*.md",
    loader_cls=TextLoader
)
raw_docs = loader.load()

# 2. Chunk documents with optimal token overlap
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=150,
    separators=["\\n\\n", "\\n", "(?<=\\. )", " ", ""],
    length_function=len,
    is_separator_regex=True
)

chunked_docs = text_splitter.split_documents(raw_docs)
print(f"Loaded {len(raw_docs)} files -> Generated {len(chunked_docs)} semantic chunks.")`,
        language: "python"
      },
      {
        title: "3. Generating Embeddings and Populating Vector Store",
        content: "Generate dense vector embeddings (1536-dim or 3072-dim) and store them with persistent indexing. We configure Chroma with OpenAI's text-embedding-3-small for high retrieval accuracy at low cost.",
        code: `from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

embedding_model = OpenAIEmbeddings(
    model="text-embedding-3-small",
    dimensions=1536
)

# Persist to disk
vector_store = Chroma.from_documents(
    documents=chunked_docs,
    embedding=embedding_model,
    persist_directory="./chroma_db",
    collection_name="enterprise_docs"
)

# Create a retriever with similarity scoring threshold
retriever = vector_store.as_retriever(
    search_type="similarity_score_threshold",
    search_kwargs={"k": 6, "score_threshold": 0.65}
)`,
        language: "python"
      },
      {
        title: "4. Cross-Encoder Re-Ranking for Precision Filtering",
        content: "Vector search returns items close in cosine space, but cosine distance does not guarantee relevance to the nuanced question. Passing the top 10 results through a cross-encoder (like BAAI/bge-reranker-base) re-scores question-document pairs directly, discarding irrelevant noise.",
        code: `from sentence_transformers import CrossEncoder

# Initialize local cross-encoder reranker
reranker = CrossEncoder("BAAI/bge-reranker-base")

def rerank_documents(query: str, retrieved_docs: list, top_n: int = 3):
    pairs = [[query, doc.page_content] for doc in retrieved_docs]
    scores = reranker.predict(pairs)
    
    # Sort docs by descending score
    scored_docs = sorted(zip(retrieved_docs, scores), key=lambda x: x[1], reverse=True)
    return [doc for doc, score in scored_docs[:top_n]]`,
        language: "python"
      },
      {
        title: "5. Assembling the End-to-End Generation Chain with LCEL",
        content: "Using LangChain Expression Language (LCEL), construct an immutable runnable chain with streaming response capabilities, citation injection, and system guardrails.",
        code: `from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# Define strict RAG prompt template
prompt = ChatPromptTemplate.from_messages([
    ("system", """You are a technical support specialist. Answer the question using ONLY the provided context.
If the context does not contain enough information to answer definitively, state 'I do not have enough context to answer this question.'
Always reference source document names where available.

Context:
{context}"""),
    ("human", "{question}")
])

llm = ChatOpenAI(model="gpt-4o", temperature=0.1)

def format_docs(docs):
    return "\\n\\n---\\n\\n".join(
        f"[Source: {d.metadata.get('source', 'unknown')}]: {d.page_content}"
        for d in docs
    )

# Composable LCEL pipeline
rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

response = rag_chain.invoke("What is the token limit on cluster deployments?")
print(response)`,
        language: "python"
      }
    ],
    bestPractices: [
      "Always attach metadata (document source, section, last updated timestamp) to chunks for citation tracing.",
      "Use hybrid search (BM25 keyword matching + dense vector similarity) to handle exact alphanumeric IDs and acronyms.",
      "Enforce maximum context token budgets to prevent LLM context window overflows and excessive inference latency.",
      "Evaluate your RAG pipeline using synthetic question generation and RAGAS metrics (Faithfulness, Answer Relevance, Context Recall)."
    ],
    commonMistakes: [
      "Using naive fixed character splitting that truncates sentences, JSON payloads, or code blocks in the middle.",
      "Feeding 20+ retrieved chunks directly to the LLM without re-ranking, triggering the 'lost in the middle' attention phenomenon.",
      "Allowing hallucination by not instructing the model to decline answering when retrieved context score is below the threshold."
    ],
    faq: [
      {
        question: "When should I choose RAG over Fine-Tuning a model?",
        answer: "Choose RAG when your knowledge base changes frequently, requires dynamic permissions, or needs transparent source citations. Fine-tuning teaches a model style, syntax, or tone, but is expensive and ineffective for knowledge retrieval."
      },
      {
        question: "How do I choose between Chroma, Pinecone, and pgvector?",
        answer: "Use Chroma for local development and rapid prototyping. Use pgvector if you already use PostgreSQL for transactional data. Use Pinecone, Qdrant, or Weaviate for dedicated billion-scale distributed vector search."
      }
    ],
    relatedErrors: ["rest-api-401-unauthorized-error", "react-useeffect-infinite-loop"],
    relatedTutorials: ["building-an-ai-chatbot", "python-data-processing-pandas"],
    relatedTools: ["json-formatter", "base64-decoder"]
  },
  {
    title: "Building Autonomous Multi-Agent Workflows with LangGraph",
    description: "Learn how to architect resilient cyclical AI agent architectures featuring state persistence, conditional edge routing, tool execution, and human-in-the-loop oversight with LangGraph.",
    slug: "building-ai-agents-with-langgraph",
    category: "AI",
    tags: ["ai", "agents", "langgraph", "langchain", "python", "workflow"],
    date: "2026-03-12",
    author: "DevFixHub Core Team",
    readingTime: "15 min",
    difficulty: "Advanced",
    prerequisites: [
      "Python 3.10+",
      "Familiarity with LangChain ChatOpenAI and tools",
      "Understanding of directed graphs and finite state machines"
    ],
    sections: [
      {
        title: "1. Why Graph-Based State Machines for Autonomous Agents?",
        content: "Linear chains (like LangChain AgentExecutor) fail when tasks require backtracking, conditional branching, validation loops, or human approval. LangGraph frames agents as stateful multi-actor computation graphs where nodes represent agent actions or tools, and edges define control flow with cyclic iteration.",
        code: `# Install LangGraph and LangChain OpenAI
pip install langgraph langchain-openai`,
        language: "bash"
      },
      {
        title: "2. Defining Agent State with TypedDict and Message Reducers",
        content: "The graph state is the single source of truth passed to every node. In LangGraph, we use Python's TypedDict with an Annotated reducer (add_messages) to append message history automatically without mutating previous states.",
        code: `from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]
    iteration_count: int
    is_approved: bool`,
        language: "python"
      },
      {
        title: "3. Binding Dynamic Tools and Agent Node",
        content: "Equip the LLM with executable tools (calculators, web search, database querying) using OpenAI's tool-calling format, and define the primary reasoning node.",
        code: `from langchain_core.tools import tool
from langchain_openai import ChatOpenAI

@tool
def execute_sql_query(query: str) -> str:
    """Execute a read-only SQL query against the analytics database."""
    # Simulated execution
    return f"Query executed successfully: {query} -> 42 rows returned."

tools = [execute_sql_query]
model = ChatOpenAI(model="gpt-4o", temperature=0).bind_tools(tools)

def agent_node(state: AgentState):
    messages = state["messages"]
    response = model.invoke(messages)
    return {
        "messages": [response],
        "iteration_count": state.get("iteration_count", 0) + 1
    }`,
        language: "python"
      },
      {
        title: "4. Constructing StateGraph with Conditional Routing Edges",
        content: "Add nodes for the agent and tool execution, define conditional routing based on whether the agent emitted a tool call or finalized its answer, and add loopback cycles.",
        code: `from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode

# Initialize graph
workflow = StateGraph(AgentState)

# Add processing nodes
workflow.add_node("agent", agent_node)
workflow.add_node("action", ToolNode(tools))

# Entry point
workflow.set_entry_point("agent")

# Conditional router function
def should_continue(state: AgentState) -> str:
    last_message = state["messages"][-1]
    # If the model requested tool calls, route to action node
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "action"
    # Otherwise, terminate the workflow
    return END

workflow.add_conditional_edges(
    "agent",
    should_continue,
    {"action": "action", END: END}
)

# Once action completes, cycle back to agent for evaluation
workflow.add_edge("action", "agent")`,
        language: "python"
      },
      {
        title: "5. Compiling Graph with Memory Checkpoints and Interrupts",
        content: "Using MemorySaver enables full conversational persistence and human-in-the-loop approvals. The graph can pause before dangerous actions and resume once confirmed.",
        code: `from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import HumanMessage

memory = MemorySaver()

# Compile graph with human review interrupt before action node
app = workflow.compile(
    checkpointer=memory,
    interrupt_before=["action"]
)

# Execute initial step
thread_config = {"configurable": {"thread_id": "session-101"}}
initial_input = {"messages": [HumanMessage(content="Show me monthly churn metrics via SQL")]}

for event in app.stream(initial_input, thread_config):
    print(event)

# Review pending state and resume
current_state = app.get_state(thread_config)
print("Paused before:", current_state.next)

# Resume execution after approval
app.stream(None, thread_config)`,
        language: "python"
      }
    ],
    bestPractices: [
      "Always set a maximum recursion limit (e.g. recursion_limit=25) to prevent unbounded loops if agents fail to reach consensus.",
      "Store graph checkpoints in persistent storage (e.g. PostgresSaver) in production to survive server restarts.",
      "Isolate tools that execute write operations behind human-in-the-loop approval gates (interrupt_before).",
      "Keep node functions pure and side-effect-free, only returning updated state slices."
    ],
    commonMistakes: [
      "Mutating the state dictionary directly in a node instead of returning the incremental state changes.",
      "Omitting termination conditions on multi-agent conversations, leading to recursive billing explosions.",
      "Failing to pass thread_id configurations when using checkpointers, causing cross-user state collisions."
    ],
    faq: [
      {
        question: "How does LangGraph differ from LangChain AgentExecutor?",
        answer: "AgentExecutor is an inflexible while-loop hard-coded into LangChain. LangGraph exposes the underlying DAG/FSM directly, letting you build multi-agent swarms, parallel branching, time-travel debugging, and persistent session memory."
      },
      {
        question: "Can LangGraph run across multiple serverless microservices?",
        answer: "Yes. Because state is serialized into checkpointers (Postgres, Redis) by thread_id, different worker processes can resume execution of any step seamlessly."
      }
    ],
    relatedErrors: ["react-useeffect-infinite-loop", "docker-container-exited-code-137"],
    relatedTutorials: ["building-rag-pipeline-langchain", "building-an-ai-chatbot"],
    relatedTools: ["json-formatter", "uuid-generator"]
  },
  {
    title: "Enforcing Guaranteed Structured Outputs from LLMs with Pydantic",
    description: "Eliminate JSON parsing errors and hallucinated keys by leveraging OpenAI Structured Outputs and Pydantic schema validation for guaranteed type safety.",
    slug: "structured-outputs-pydantic-openai",
    category: "AI",
    tags: ["ai", "pydantic", "structured-outputs", "python", "json-schema", "openai"],
    date: "2026-03-14",
    author: "DevFixHub Core Team",
    readingTime: "10 min",
    difficulty: "Intermediate",
    prerequisites: [
      "Python 3.9+",
      "Basic understanding of Pydantic BaseModel",
      "OpenAI Python SDK (v1.40.0+)"
    ],
    sections: [
      {
        title: "1. The Vulnerability of Unconstrained JSON Generation",
        content: "Instructing an LLM to 'Respond in JSON' frequently results in invalid JSON, trailing commas, markdown formatting fences (\`\`\`json), or randomly omitted fields. OpenAI's Structured Outputs feature uses context-free grammar (CFG) constrained sampling at the token level, guaranteeing 100% adherence to your Pydantic schema.",
        code: `# Ensure modern SDK installed
pip install "openai>=1.40.0" "pydantic>=2.0.0"`,
        language: "bash"
      },
      {
        title: "2. Modeling Schema with Pydantic V2",
        content: "Define nested Pydantic models with explicit types, Enum restrictions, and Field descriptions that guide the LLM's reasoning engine.",
        code: `from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field

class SentimentType(str, Enum):
    POSITIVE = "positive"
    NEUTRAL = "neutral"
    NEGATIVE = "negative"

class ExtractedEntity(BaseModel):
    name: str = Field(description="Entity or brand name")
    category: str = Field(description="Category, e.g., Organization, Person, Metric")
    confidence_score: float = Field(ge=0.0, le=1.0, description="Model confidence between 0 and 1")

class ArticleAnalysis(BaseModel):
    summary: str = Field(description="A concise 2-sentence executive summary")
    sentiment: SentimentType
    key_entities: List[ExtractedEntity]
    actionable_recommendations: List[str]`,
        language: "python"
      },
      {
        title: "3. Querying the Model via beta.chat.completions.parse",
        content: "Use the native parse method in the OpenAI SDK. Under the hood, OpenAI compiles the Pydantic model into a strict JSON Schema and constrains token generation.",
        code: `import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

user_article = """
Acme Corp reported a 24% increase in quarterly revenue to $1.2B, driven by enterprise AI adoption.
However, supply chain bottlenecks in Europe caused a 5% delay in hardware shipments.
CEO Jane Doe stated that operational realignment will be complete by Q4.
"""

completion = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[
        {"role": "system", "content": "You are a senior equity research assistant."},
        {"role": "user", "content": f"Extract detailed analysis from this article:\\n{user_article}"}
    ],
    response_format=ArticleAnalysis,
)

analysis: ArticleAnalysis = completion.choices[0].message.parsed

# Directly access typed attributes with full IDE autocomplete!
print(f"Sentiment: {analysis.sentiment.value}")
print(f"Summary: {analysis.summary}")
for entity in analysis.key_entities:
    print(f"- {entity.name} ({entity.category}): {entity.confidence_score:.2f}")`,
        language: "python"
      },
      {
        title: "4. Handling Refusals and Error Recovery",
        content: "If a user prompt violates safety policies or contains adversarial jailbreaks, the model will return a refusal rather than structured output. Always inspect the refusal attribute before consuming the parsed object.",
        code: `message = completion.choices[0].message

if message.refusal:
    print(f"Model refused to process request: {message.refusal}")
else:
    structured_data = message.parsed
    # Safe to persist to database or forward to downstream APIs
    save_to_database(structured_data.model_dump())`,
        language: "python"
      }
    ],
    bestPractices: [
      "Use Field(description='...') on every attribute to give the model contextual semantic guidance.",
      "Prefer Enums over plain strings for finite state values (e.g. status, sentiment, priority).",
      "Keep schemas modular by nesting sub-models rather than defining monolithic flat models.",
      "Check for message.refusal before attempting to access message.parsed in production web handlers."
    ],
    commonMistakes: [
      "Using complex unsupported Pydantic types like Union with arbitrary primitives which cannot compile to strict JSON Schema.",
      "Relying on manual regex extraction from unstructured completions when native parse is available.",
      "Setting optional fields without providing default values or Optional[T] typing."
    ],
    faq: [
      {
        question: "What is the difference between JSON Mode and Structured Outputs?",
        answer: "JSON Mode ensures the model outputs valid JSON syntax, but does NOT guarantee the keys, types, or nested structure match your schema. Structured Outputs guarantees 100% adherence to your exact schema through constrained decoding."
      },
      {
        question: "Does using Structured Outputs slow down response time?",
        answer: "The first request with a new schema has a slight setup latency while the grammar is compiled. Subsequent requests with the same schema have zero latency overhead and benefit from standard inference speeds."
      }
    ],
    relatedErrors: ["rest-api-400-bad-request-error", "react-useeffect-infinite-loop"],
    relatedTutorials: ["building-an-ai-chatbot", "python-data-processing-pandas"],
    relatedTools: ["json-formatter", "base64-decoder"]
  },
  {
    title: "Running Private Offline LLMs with Ollama and TypeScript",
    description: "Run open-weights LLMs like Llama 3, Mistral, and DeepSeek locally on your machine with complete data privacy using Ollama and the TypeScript SDK.",
    slug: "local-llm-inference-ollama",
    category: "AI",
    tags: ["ai", "local-llm", "ollama", "typescript", "open-source", "privacy"],
    date: "2026-03-16",
    author: "DevFixHub Core Team",
    readingTime: "10 min",
    difficulty: "Intermediate",
    prerequisites: [
      "Node.js 18+ and TypeScript",
      "Machine with at least 8GB RAM (16GB+ recommended for 8B models)",
      "Basic terminal familiarity"
    ],
    sections: [
      {
        title: "1. Installing Ollama and Pulling Models",
        content: "Ollama bundles model weights, quantization configurations, and optimized inference runtimes (llama.cpp) into a single unified CLI daemon for macOS, Linux, and Windows.",
        code: `# Install on macOS or Linux
curl -fsSL https://ollama.com/install.sh | sh

# Pull and test Llama 3 8B model
ollama run llama3:8b "Why is the sky blue? Answer in 1 sentence."`,
        language: "bash"
      },
      {
        title: "2. Setting Up the TypeScript Ollama Client",
        content: "Install the official Ollama JavaScript/TypeScript library. The client connects to the local daemon running at http://127.0.0.1:11434.",
        code: `# Install dependencies
npm install ollama
npm install -D typescript @types/node tsx`,
        language: "bash"
      },
      {
        title: "3. Streaming Local Completions in TypeScript",
        content: "Streaming provides instant user feedback with token-by-token rendering without loading entire completions into memory.",
        code: `import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });

async function streamLocalLLM() {
  const response = await ollama.chat({
    model: 'llama3:8b',
    messages: [
      { role: 'system', content: 'You are an expert TypeScript architect. Keep answers concise.' },
      { role: 'user', content: 'Explain the benefits of const assertions in TypeScript with a code snippet.' }
    ],
    stream: true,
  });

  process.stdout.write('Response: ');
  for await (const part of response) {
    process.stdout.write(part.message.content);
  }
  console.log('\\n--- Stream complete ---');
}

streamLocalLLM().catch(console.error);`,
        language: "typescript"
      },
      {
        title: "4. Custom Model Creation with Modelfiles",
        content: "You can bake custom system prompts, temperature parameters, and stop tokens into a customized model alias using Ollama Modelfiles.",
        code: `# Create a file named Modelfile:
FROM llama3:8b

# Set temperature (lower = more deterministic)
PARAMETER temperature 0.2
PARAMETER top_p 0.9

# Set persistent system prompt
SYSTEM """
You are CodeAuditBot, a secure code reviewer.
Review code specifically for OWASP Top 10 vulnerabilities, memory leaks, and performance traps.
Always output findings in markdown bullet points.
"""`,
        language: "dockerfile"
      },
      {
        title: "5. Building and Running Your Custom Model",
        content: "Compile the Modelfile into an Ollama model alias and query it from your TypeScript application.",
        code: `# Build custom model
ollama create code-audit-bot -f ./Modelfile

# Query in TypeScript
const audit = await ollama.chat({
  model: 'code-audit-bot',
  messages: [{ role: 'user', content: 'Audit this route: app.get("/user", (req, res) => db.query("SELECT * FROM users WHERE id = " + req.query.id));' }]
});

console.log(audit.message.content);`,
        language: "typescript"
      }
    ],
    bestPractices: [
      "Select quantized models (e.g. Q4_K_M) that comfortably fit in your available GPU VRAM or unified memory.",
      "Use the keep_alive option to keep models loaded in memory for fast consecutive requests, or set it to 0 to unload immediately and free memory.",
      "Configure Ollama environment variables (OLLAMA_NUM_PARALLEL, OLLAMA_MAX_LOADED_MODELS) for multi-user server instances.",
      "Never expose port 11434 directly to the public internet without a reverse proxy and authentication layer."
    ],
    commonMistakes: [
      "Trying to load 70B parameter models without at least 48GB of unified RAM or multi-GPU setups.",
      "Forgetting to check if the Ollama daemon service is active before firing API requests.",
      "Ignoring temperature settings when generating structured or factual technical output."
    ],
    faq: [
      {
        question: "Is Ollama suitable for high-traffic production environments?",
        answer: "Ollama is optimized for local development and edge deployments. For high-concurrency production deployments, dedicated inference engines like vLLM, TGI (Text Generation Inference), or TensorRT-LLM are recommended."
      },
      {
        question: "Does Ollama send my prompts or code to external servers?",
        answer: "No. All inference executes 100% locally on your machine's CPU and GPU. Zero telemetry or prompt tokens leave your local network."
      }
    ],
    relatedErrors: ["docker-container-exited-code-137", "cors-policy-error"],
    relatedTutorials: ["building-an-ai-chatbot", "typescript-beginner-guide"],
    relatedTools: ["base64-decoder", "json-formatter"]
  },
  {
    title: "Implementing Multi-Turn LLM Function Calling and Dynamic Tools in TypeScript",
    description: "Build robust agentic workflows where models intelligently select tools, execute TypeScript functions with validated arguments, and synthesize dynamic results.",
    slug: "llm-function-calling-tools",
    category: "AI",
    tags: ["ai", "function-calling", "typescript", "tools", "llm", "agentic"],
    date: "2026-03-18",
    author: "DevFixHub Core Team",
    readingTime: "12 min",
    difficulty: "Advanced",
    prerequisites: [
      "Node.js 18+ and TypeScript",
      "OpenAI API Key",
      "Understanding of asynchronous TypeScript and Zod schema validation"
    ],
    sections: [
      {
        title: "1. The Function Calling Lifecycle",
        content: "Tool calling allows LLMs to interact with the outside world. The cycle consists of: 1) Client supplies tool schemas to the model; 2) Model decides whether to reply directly or call one/more tools; 3) Client executes the matching JavaScript functions; 4) Client provides tool outputs back to the model; 5) Model synthesizes the final user response.",
        code: `# Install OpenAI SDK and Zod for validation
npm install openai zod`,
        language: "bash"
      },
      {
        title: "2. Defining Tools and Typed Schemas with Zod",
        content: "Use Zod to create schemas that serve as both runtime validators and JSON Schema definitions for the model.",
        code: `import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import OpenAI from 'openai';

const WeatherQuerySchema = z.object({
  city: z.string().describe('The name of the city, e.g. Tokyo, London, San Francisco'),
  unit: z.enum(['celsius', 'fahrenheit']).default('celsius').describe('Temperature unit')
});

type WeatherQueryParams = z.infer<typeof WeatherQuerySchema>;

// Concrete implementation
async function fetchWeather(params: WeatherQueryParams) {
  // Simulate live weather API call
  return {
    city: params.city,
    temperature: params.unit === 'celsius' ? 22 : 72,
    unit: params.unit,
    condition: 'Partly Cloudy'
  };
}

// Convert to OpenAI Tool definition
const tools: OpenAI.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'get_current_weather',
      description: 'Get the current real-time weather for a given city.',
      parameters: zodToJsonSchema(WeatherQuerySchema) as Record<string, any>
    }
  }
];`,
        language: "typescript"
      },
      {
        title: "3. Multi-Turn Recursive Tool Resolution Loop",
        content: "In production, an agent must execute multiple tool calls in succession or handle consecutive multi-step workflows until the model has all required information.",
        code: `const openai = new OpenAI();

async function runAgent(userPrompt: string) {
  const messages: OpenAI.ChatCompletionMessageParam[] = [
    { role: 'system', content: 'You are an intelligent assistant with access to real-time tools.' },
    { role: 'user', content: userPrompt }
  ];

  let keepGoing = true;
  let maxTurns = 5;

  while (keepGoing && maxTurns > 0) {
    maxTurns--;
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      tools,
      tool_choice: 'auto',
    });

    const choice = response.choices[0];
    const message = choice.message;
    messages.push(message);

    // If the model didn't call any tools, we are done
    if (!message.tool_calls || message.tool_calls.length === 0) {
      keepGoing = false;
      return message.content;
    }

    // Execute all tools requested by the model (supports parallel tool calls)
    for (const toolCall of message.tool_calls) {
      console.log(\`Calling tool: \${toolCall.function.name}\`);
      if (toolCall.function.name === 'get_current_weather') {
        const rawArgs = JSON.parse(toolCall.function.arguments);
        const parsedArgs = WeatherQuerySchema.parse(rawArgs);
        const result = await fetchWeather(parsedArgs);

        // Feed tool result back to the model with matching tool_call_id
        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify(result)
        });
      }
    }
  }

  throw new Error('Agent exceeded maximum turn limit without resolving.');
}`,
        language: "typescript"
      },
      {
        title: "4. Executing the Agent and Inspecting Results",
        content: "Call the agent with a prompt that triggers tool invocation and inspect the synthesized response.",
        code: `async function main() {
  const result = await runAgent("What is the weather in Tokyo and Paris right now?");
  console.log("\\nFinal Answer:\\n", result);
}

main().catch(console.error);`,
        language: "typescript"
      }
    ],
    bestPractices: [
      "Always validate parsed JSON tool arguments with a schema library like Zod to prevent crashes from malformed model parameters.",
      "Keep tool descriptions explicit and unambiguous so the model can accurately distinguish between similar tools.",
      "Implement a strict maximum turn limit (e.g. 5-10 iterations) to avoid expensive infinite execution loops.",
      "Always match the tool_call_id precisely in the tool response message."
    ],
    commonMistakes: [
      "Executing sensitive tools (deleting databases, sending emails) without human confirmation.",
      "Failing to handle parallel tool calls when the model issues multiple tool requests in a single response.",
      "Omiting schema descriptions, leaving the LLM to guess what parameter inputs mean."
    ],
    faq: [
      {
        question: "Can an LLM execute multiple functions in parallel?",
        answer: "Yes! Modern models like GPT-4o support Parallel Function Calling, returning multiple entries in message.tool_calls so you can execute them concurrently with Promise.all()."
      },
      {
        question: "What happens if a tool function throws an error?",
        answer: "Catch the error and return an error message as the tool response (e.g. { error: 'Database connection timed out' }). The LLM can interpret this and decide to retry or apologize to the user."
      }
    ],
    relatedErrors: ["rest-api-400-bad-request-error", "react-useeffect-infinite-loop"],
    relatedTutorials: ["building-an-ai-chatbot", "building-rag-pipeline-langchain"],
    relatedTools: ["json-formatter", "base64-decoder"]
  }
];
