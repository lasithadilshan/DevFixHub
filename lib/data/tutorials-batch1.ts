import { TutorialArticle } from "../types";

export const TUTORIALS_BATCH_1: TutorialArticle[] = [
  {
    title: "Spring Boot REST API Tutorial",
    description: "Build a production-grade, secure REST API with Spring Boot 3, Java 21, and Spring Data JPA from scratch.",
    slug: "spring-boot-rest-api-tutorial",
    category: "Spring Boot",
    tags: ["spring-boot", "java", "rest-api", "backend"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "10 min",
    difficulty: "Beginner",
    prerequisites: ["Java Development Kit (JDK 17 or 21) installed", "Basic understanding of object-oriented Java programming", "Maven or Gradle installed"],
    sections: [
      {
        title: "1. Project Initialization",
        content: "Generate a new Spring Boot project via start.spring.io with dependencies: Spring Web, Spring Data JPA, and H2 Database.",
        code: "// pom.xml dependencies\n<dependencies>\n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-web</artifactId>\n    </dependency>\n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-data-jpa</artifactId>\n    </dependency>\n    <dependency>\n        <groupId>com.h2database</groupId>\n        <artifactId>h2</artifactId>\n        <scope>runtime</scope>\n    </dependency>\n</dependencies>",
        language: "xml"
      },
      {
        title: "2. Creating the Domain Entity",
        content: "Define a clean JPA entity with auto-generated ID, validation constraints, and getters/setters.",
        code: "@Entity\n@Table(name = \"articles\")\npublic class Article {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    @Column(nullable = false)\n    private String title;\n\n    @Column(columnDefinition = \"TEXT\")\n    private String content;\n\n    public Article() {}\n    public Article(String title, String content) {\n        this.title = title;\n        this.content = content;\n    }\n    // Getters and Setters\n}",
        language: "java"
      },
      {
        title: "3. Spring Data JPA Repository",
        content: "Extend JpaRepository to automatically inherit full CRUD operations without writing raw SQL.",
        code: "@Repository\npublic interface ArticleRepository extends JpaRepository<Article, Long> {\n    List<Article> findByTitleContainingIgnoreCase(String keyword);\n}",
        language: "java"
      },
      {
        title: "4. Building the REST Controller",
        content: "Expose standard RESTful endpoints (@GetMapping, @PostMapping, @PutMapping, @DeleteMapping) returning ResponseEntity.",
        code: "@RestController\n@RequestMapping(\"/api/v1/articles\")\npublic class ArticleController {\n    private final ArticleRepository repository;\n\n    public ArticleController(ArticleRepository repository) {\n        this.repository = repository;\n    }\n\n    @GetMapping\n    public ResponseEntity<List<Article>> getAll() {\n        return ResponseEntity.ok(repository.findAll());\n    }\n\n    @PostMapping\n    public ResponseEntity<Article> create(@RequestBody Article article) {\n        Article saved = repository.save(article);\n        return ResponseEntity.status(HttpStatus.CREATED).body(saved);\n    }\n}",
        language: "java"
      }
    ],
    bestPractices: [
      "Always use constructor injection rather than @Autowired field injection.",
      "Wrap responses in ResponseEntity with appropriate HTTP status codes (201 Created, 204 No Content).",
      "Use DTOs (Data Transfer Objects) instead of exposing database entities directly to API consumers."
    ],
    commonMistakes: [
      "Returning null from controller methods instead of throwing a NotFoundException.",
      "Mutating entities in-place without transaction boundaries."
    ],
    faq: [
      {
        question: "How do I test these endpoints from the terminal?",
        answer: "Run curl -X GET http://localhost:8080/api/v1/articles or import the endpoints into Postman."
      }
    ],
    relatedErrors: ["spring-boot-port-8080-already-in-use", "spring-boot-ambiguous-handler-methods"],
    relatedTutorials: ["spring-boot-postgresql", "spring-boot-jwt-authentication"],
    relatedTools: ["json-formatter"]
  },
  {
    title: "Spring Boot JWT Authentication",
    description: "Implement stateless JSON Web Token (JWT) authentication, refresh tokens, and Spring Security 6 authorization.",
    slug: "spring-boot-jwt-authentication",
    category: "Spring Boot",
    tags: ["spring-boot", "jwt", "security", "auth"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "12 min",
    difficulty: "Intermediate",
    prerequisites: ["Completion of Spring Boot REST API tutorial", "Basic knowledge of cryptography and HTTP headers"],
    sections: [
      {
        title: "1. Setting up Spring Security & JJWT",
        content: "Add Spring Boot Starter Security and the jjwt library for signing and validating JWT tokens.",
        code: "<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-security</artifactId>\n</dependency>\n<dependency>\n    <groupId>io.jsonwebtoken</groupId>\n    <artifactId>jjwt-api</artifactId>\n    <version>0.12.5</version>\n</dependency>",
        language: "xml"
      },
      {
        title: "2. JwtService Token Generator",
        content: "Create a utility to generate cryptographically signed HMAC-SHA256 tokens with expiration claims.",
        code: "@Service\npublic class JwtService {\n    private final SecretKey key = Keys.hmacShaKeyFor(\"my-ultra-secret-32-byte-hex-key-devfixhub!\".getBytes());\n\n    public String generateToken(String username) {\n        return Jwts.builder()\n            .subject(username)\n            .issuedAt(new Date())\n            .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour\n            .signWith(key)\n            .compact();\n    }\n}",
        language: "java"
      }
    ],
    bestPractices: [
      "Keep access token lifetimes short (15-60 minutes) and use refresh tokens for rotation.",
      "Store secrets in environment variables, never committed to git."
    ],
    commonMistakes: [
      "Using an insecure weak signing key under 256 bits (32 characters)."
    ],
    faq: [
      {
        question: "Can the client decode a JWT payload?",
        answer: "Yes, JWT payloads are Base64URL encoded, not encrypted. Never place passwords or credit cards in JWT claims."
      }
    ],
    relatedErrors: ["rest-api-401-unauthorized-error"],
    relatedTutorials: ["jwt-authentication-explained", "spring-boot-rest-api-tutorial"],
    relatedTools: ["base64-decoder"]
  },
  {
    title: "Spring Boot with PostgreSQL Database",
    description: "Connect Spring Boot to PostgreSQL using HikariCP connection pooling, Docker, and Liquibase migrations.",
    slug: "spring-boot-postgresql",
    category: "Spring Boot",
    tags: ["spring-boot", "postgresql", "database", "sql"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "8 min",
    difficulty: "Beginner",
    prerequisites: ["PostgreSQL installed locally or running via Docker", "Spring Boot basics"],
    sections: [
      {
        title: "1. PostgreSQL Driver Dependency",
        content: "Add the org.postgresql driver to pom.xml.",
        code: "<dependency>\n    <groupId>org.postgresql</groupId>\n    <artifactId>postgresql</artifactId>\n    <scope>runtime</scope>\n</dependency>",
        language: "xml"
      },
      {
        title: "2. Connection Properties",
        content: "Configure connection strings and Hikari pool settings in application.yml.",
        code: "spring:\n  datasource:\n    url: jdbc:postgresql://localhost:5432/devfix_db\n    username: postgres\n    password: secretpassword\n    driver-class-name: org.postgresql.Driver\n    hikari:\n      maximum-pool-size: 10\n      minimum-idle: 5\n  jpa:\n    hibernate:\n      ddl-auto: validate\n    show-sql: true",
        language: "yaml"
      }
    ],
    bestPractices: [
      "Never use ddl-auto=create-drop in production; use Flyway or Liquibase migrations instead.",
      "Size Hikari connection pools appropriately based on CPU cores."
    ],
    commonMistakes: [
      "Leaving default ddl-auto=update in production, which can lock tables during deployments."
    ],
    faq: [
      {
        question: "How do I spin up a PostgreSQL instance quickly for local dev?",
        answer: "Run: docker run -d --name pg -e POSTGRES_PASSWORD=secretpassword -p 5432:5432 postgres:16-alpine."
      }
    ],
    relatedErrors: ["spring-boot-failed-to-configure-datasource", "sql-unknown-column-error"],
    relatedTutorials: ["spring-boot-rest-api-tutorial", "docker-beginner-guide"]
  },
  {
    title: "Spring Boot with MongoDB",
    description: "Build reactive and document-based microservices using Spring Data MongoDB and MongoRepository.",
    slug: "spring-boot-mongodb",
    category: "Spring Boot",
    tags: ["spring-boot", "mongodb", "nosql", "database"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "7 min",
    difficulty: "Beginner",
    prerequisites: ["MongoDB instance running locally or MongoDB Atlas connection URI"],
    sections: [
      {
        title: "1. Spring Data MongoDB Starter",
        content: "Add spring-boot-starter-data-mongodb dependency.",
        code: "<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-data-mongodb</artifactId>\n</dependency>",
        language: "xml"
      },
      {
        title: "2. Mongo Document Definition",
        content: "Annotate domain models with @Document and @Id.",
        code: "@Document(collection = \"logs\")\npublic class ErrorLog {\n    @Id\n    private String id;\n    private String serviceName;\n    private String errorMessage;\n    private Instant timestamp = Instant.now();\n\n    // Getters and Setters\n}",
        language: "java"
      }
    ],
    bestPractices: [
      "Create compound indexes using @CompoundIndex for frequent multi-field queries."
    ],
    commonMistakes: [
      "Treating MongoDB like a relational database with heavy cross-collection lookups."
    ],
    faq: [
      {
        question: "How do I configure connection strings for MongoDB Atlas?",
        answer: "Set spring.data.mongodb.uri=mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname in application.properties."
      }
    ],
    relatedErrors: ["spring-boot-bean-creation-exception"],
    relatedTutorials: ["spring-boot-rest-api-tutorial"],
    relatedTools: ["json-validator"]
  },
  {
    title: "Spring Boot Unit Testing with JUnit 5 & Mockito",
    description: "Write clean, robust unit and integration tests for Spring Boot controllers and services using Mockito and MockMvc.",
    slug: "spring-boot-unit-testing",
    category: "Spring Boot",
    tags: ["spring-boot", "testing", "junit", "mockito"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "9 min",
    difficulty: "Intermediate",
    prerequisites: ["Spring Boot basics", "JUnit 5 fundamentals"],
    sections: [
      {
        title: "1. Service Unit Test with @ExtendWith(MockitoExtension.class)",
        content: "Test service business logic in complete isolation without loading the heavyweight Spring context.",
        code: "@ExtendWith(MockitoExtension.class)\nclass ArticleServiceTest {\n    @Mock\n    private ArticleRepository repository;\n\n    @InjectMocks\n    private ArticleService service;\n\n    @Test\n    void shouldReturnArticleWhenFound() {\n        Article article = new Article(\"Test Title\", \"Content\");\n        when(repository.findById(1L)).thenReturn(Optional.of(article));\n\n        Article result = service.getById(1L);\n        assertThat(result.getTitle()).isEqualTo(\"Test Title\");\n    }\n}",
        language: "java"
      },
      {
        title: "2. Controller Web Slice Test with @WebMvcTest",
        content: "Test HTTP endpoints, JSON serialization, and status codes using MockMvc.",
        code: "@WebMvcTest(ArticleController.class)\nclass ArticleControllerTest {\n    @Autowired\n    private MockMvc mockMvc;\n\n    @MockBean\n    private ArticleService service;\n\n    @Test\n    void shouldReturnOkStatus() throws Exception {\n        mockMvc.perform(get(\"/api/v1/articles\"))\n            .andExpect(status().isOk());\n    }\n}",
        language: "java"
      }
    ],
    bestPractices: [
      "Prefer pure unit tests with Mockito for fast CI feedback (< 1 second).",
      "Use @WebMvcTest for controller validation and status tests instead of full @SpringBootTest."
    ],
    commonMistakes: [
      "Using @SpringBootTest on every test class, causing slow test suites that take 10+ minutes to execute."
    ],
    faq: [
      {
        question: "What is the difference between @Mock and @MockBean?",
        answer: "@Mock is a pure Mockito annotation that does not involve Spring. @MockBean registers the mock directly into the Spring ApplicationContext."
      }
    ],
    relatedErrors: ["spring-boot-bean-creation-exception"],
    relatedTutorials: ["spring-boot-rest-api-tutorial"]
  },
  {
    title: "Build REST API with FastAPI",
    description: "Create high-performance, asynchronous REST APIs with Python 3, FastAPI, Pydantic, and Uvicorn.",
    slug: "build-rest-api-with-fastapi",
    category: "Python",
    tags: ["fastapi", "python", "rest-api", "async"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "8 min",
    difficulty: "Beginner",
    prerequisites: ["Python 3.10+ installed", "Basic understanding of Python functions and types"],
    sections: [
      {
        title: "1. Installation and Basic Setup",
        content: "Install FastAPI and the Uvicorn ASGI server.",
        command: "pip install fastapi uvicorn[standard]",
        language: "bash"
      },
      {
        title: "2. Defining Data Models and Endpoints",
        content: "Use Pydantic for automatic data validation, serialization, and interactive Swagger docs.",
        code: "from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\nfrom typing import List\n\napp = FastAPI(title=\"DevFixHub API\")\n\nclass BugReport(BaseModel):\n    id: int\n    title: str\n    resolved: bool = False\n\nbugs_db: List[BugReport] = []\n\n@app.get(\"/bugs\", response_model=List[BugReport])\nasync def get_bugs():\n    return bugs_db\n\n@app.post(\"/bugs\", response_model=BugReport, status_code=201)\nasync def create_bug(bug: BugReport):\n    bugs_db.append(bug)\n    return bug",
        language: "python"
      }
    ],
    bestPractices: [
      "Always define explicit response_model in route decorators for automatic schema documentation and output filtering.",
      "Use async def only for operations that perform non-blocking I/O (database or network calls)."
    ],
    commonMistakes: [
      "Using blocking libraries (like time.sleep() or requests) inside async def routes, which blocks the event loop."
    ],
    faq: [
      {
        question: "Where can I view the auto-generated documentation?",
        answer: "Visit http://localhost:8000/docs for Swagger UI or http://localhost:8000/redoc for ReDoc."
      }
    ],
    relatedErrors: ["fastapi-422-unprocessable-entity", "python-keyerror"],
    relatedTutorials: ["python-virtual-environments"]
  },
  {
    title: "Python Virtual Environments: venv & pip Best Practices",
    description: "Master Python environment isolation using venv, requirements.txt, and modern package management.",
    slug: "python-virtual-environments",
    category: "Python",
    tags: ["python", "venv", "pip", "tooling"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "6 min",
    difficulty: "Beginner",
    prerequisites: ["Python 3 installed"],
    sections: [
      {
        title: "1. Creating and Activating an Isolated Environment",
        content: "Always create a local .venv folder inside your project directory.",
        command: "# Create environment\npython3 -m venv .venv\n\n# Activate on macOS/Linux:\nsource .venv/bin/activate\n\n# Activate on Windows:\n.venv\\Scripts\\activate",
        language: "bash"
      },
      {
        title: "2. Freezing and Restoring Dependencies",
        content: "Export installed packages to a pinned requirements.txt file for reproducible deployments.",
        command: "pip freeze > requirements.txt\n\n# Install on a fresh machine:\npip install -r requirements.txt",
        language: "bash"
      }
    ],
    bestPractices: [
      "Always add .venv and venv to your project's .gitignore file.",
      "Use 'python -m pip' rather than plain 'pip' to avoid path ambiguities."
    ],
    commonMistakes: [
      "Committing virtual environment binaries to Git repositories."
    ],
    faq: [
      {
        question: "How do I exit an active virtual environment?",
        answer: "Type 'deactivate' into your terminal and press Enter."
      }
    ],
    relatedErrors: ["python-modulenotfounderror", "python-importerror"],
    relatedTutorials: ["build-rest-api-with-fastapi"]
  },
  {
    title: "Python JSON Processing: Parsing, Formatting, and Serialization",
    description: "Master Python's json module: parse strings, handle files, customize encoders, and prevent KeyErrors.",
    slug: "python-json-processing",
    category: "Python",
    tags: ["python", "json", "data", "parsing"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "7 min",
    difficulty: "Beginner",
    prerequisites: ["Basic Python knowledge"],
    sections: [
      {
        title: "1. Parsing and Serializing JSON",
        content: "Use json.loads for strings and json.load for file streams.",
        code: "import json\n\n# Parsing JSON string\nraw_json = '{\"name\": \"DevFixHub\", \"active\": true}'\ndata = json.loads(raw_json)\nprint(data[\"name\"]) # DevFixHub\n\n# Pretty-printing to string\nformatted = json.dumps(data, indent=2)\nprint(formatted)",
        language: "python"
      }
    ],
    bestPractices: [
      "Use dict.get() or Pydantic to read JSON attributes defensively."
    ],
    commonMistakes: [
      "Confusing json.load (reads file pointer) with json.loads (reads string)."
    ],
    faq: [
      {
        question: "How do I serialize Python datetime objects to JSON?",
        answer: "Pass default=str to json.dumps: json.dumps(data, default=str)."
      }
    ],
    relatedErrors: ["python-keyerror"],
    relatedTutorials: ["build-rest-api-with-fastapi"],
    relatedTools: ["json-formatter", "json-validator"]
  },
  {
    title: "Python Web Scraping with BeautifulSoup and Requests",
    description: "Extract structured data, parse HTML DOM, and respect robots.txt using Python, Requests, and BeautifulSoup4.",
    slug: "python-web-scraping",
    category: "Python",
    tags: ["python", "web-scraping", "beautifulsoup", "automation"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "9 min",
    difficulty: "Intermediate",
    prerequisites: ["Python fundamentals", "Basic HTML and CSS selector knowledge"],
    sections: [
      {
        title: "1. Fetching and Parsing HTML",
        content: "Send HTTP GET requests with custom User-Agent headers and parse with BeautifulSoup.",
        code: "import requests\nfrom bs4 import BeautifulSoup\n\nheaders = {'User-Agent': 'DevFixHub-Scraper/1.0'}\nresponse = requests.get('https://example.com', headers=headers)\n\nsoup = BeautifulSoup(response.text, 'html.parser')\nheading = soup.find('h1').text\nprint(heading)",
        language: "python"
      }
    ],
    bestPractices: [
      "Always set custom User-Agent headers and add rate-limiting delays (time.sleep) between requests."
    ],
    commonMistakes: [
      "Scraping dynamic client-rendered SPA sites with Requests instead of Playwright or Selenium."
    ],
    faq: [
      {
        question: "Is web scraping legal?",
        answer: "Scraping public data is generally legal in many jurisdictions, provided you comply with robots.txt, terms of service, and copyright laws."
      }
    ],
    relatedErrors: ["python-modulenotfounderror"],
    relatedTutorials: ["python-virtual-environments"]
  },
  {
    title: "JavaScript Async Await Masterclass",
    description: "Understand the JavaScript event loop, microtask queues, error handling with try/catch, and Promise.all.",
    slug: "javascript-async-await",
    category: "JavaScript",
    tags: ["javascript", "async", "event-loop", "es6"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "8 min",
    difficulty: "Beginner",
    prerequisites: ["Basic JavaScript variables and functions"],
    sections: [
      {
        title: "1. Asynchronous Control Flow",
        content: "Async/await provides readable, synchronous-looking syntax on top of Promises.",
        code: "async function fetchDeveloperData(userId) {\n  try {\n    const response = await fetch(`/api/users/${userId}`);\n    if (!response.ok) {\n      throw new Error(`HTTP Error: ${response.status}`);\n    }\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(\"Failed to fetch:\", error.message);\n    throw error;\n  }\n}",
        language: "javascript"
      },
      {
        title: "2. Running Tasks in Parallel with Promise.all",
        content: "Avoid waterfall requests by executing independent async operations concurrently.",
        code: "async function loadDashboard() {\n  // Runs both network requests in parallel\n  const [errors, tools] = await Promise.all([\n    fetch('/api/errors').then(r => r.json()),\n    fetch('/api/tools').then(r => r.json())\n  ]);\n  return { errors, tools };\n}",
        language: "javascript"
      }
    ],
    bestPractices: [
      "Always wrap await calls in try/catch or handle rejections explicitly.",
      "Use Promise.allSettled() when individual failures should not cancel other requests."
    ],
    commonMistakes: [
      "Using await inside a standard forEach loop (forEach does not wait for promises; use for...of instead)."
    ],
    faq: [
      {
        question: "Does async/await block the main thread?",
        answer: "No, await pauses execution of that specific function and yields the thread back to the event loop."
      }
    ],
    relatedErrors: ["react-map-is-not-a-function"],
    relatedTutorials: ["javascript-promises", "react-api-integration"]
  },
  {
    title: "JavaScript Promises from Scratch",
    description: "Deep dive into Promise states (pending, fulfilled, rejected), chaining, and combinators (all, race, any, allSettled).",
    slug: "javascript-promises",
    category: "JavaScript",
    tags: ["javascript", "promises", "concurrency", "frontend"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "8 min",
    difficulty: "Intermediate",
    prerequisites: ["JavaScript fundamentals"],
    sections: [
      {
        title: "1. Creating a Custom Promise",
        content: "Understand how the resolve and reject executor functions control Promise state transitions.",
        code: "function delay(ms) {\n  return new Promise((resolve, reject) => {\n    if (ms < 0) {\n      reject(new Error(\"Delay cannot be negative\"));\n    } else {\n      setTimeout(resolve, ms);\n    }\n  });\n}\n\ndelay(1000).then(() => console.log(\"1 second passed!\"));",
        language: "javascript"
      }
    ],
    bestPractices: [
      "Always return values inside .then() handlers to keep the promise chain active."
    ],
    commonMistakes: [
      "The 'Promise constructor anti-pattern': wrapping an existing promise in another new Promise."
    ],
    faq: [
      {
        question: "What happens if a promise rejection is not caught?",
        answer: "The browser or Node.js runtime triggers an unhandledrejection event, which can terminate Node.js processes."
      }
    ],
    relatedErrors: ["react-map-is-not-a-function"],
    relatedTutorials: ["javascript-async-await"]
  },
  {
    title: "TypeScript Beginner Guide: Type Safety for Modern Web Apps",
    description: "Learn TypeScript fundamentals: interfaces, type aliases, generics, union types, and tsconfig settings.",
    slug: "typescript-beginner-guide",
    category: "JavaScript",
    tags: ["typescript", "javascript", "types", "tooling"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "10 min",
    difficulty: "Beginner",
    prerequisites: ["Familiarity with modern JavaScript"],
    sections: [
      {
        title: "1. Interfaces vs Type Aliases",
        content: "Define unambiguous contracts for domain models and component props.",
        code: "export interface UserProfile {\n  id: string;\n  username: string;\n  email?: string; // Optional field\n  role: 'admin' | 'editor' | 'viewer'; // Union type\n}\n\nfunction printRole(user: UserProfile): void {\n  console.log(`${user.username} is an ${user.role}`);\n}",
        language: "typescript"
      },
      {
        title: "2. Reusable Generic Functions",
        content: "Write type-safe functions that adapt to various input and output shapes.",
        code: "function firstElement<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\n\nconst firstNumber = firstElement([10, 20, 30]); // Type is number\nconst firstString = firstElement(['a', 'b', 'c']); // Type is string",
        language: "typescript"
      }
    ],
    bestPractices: [
      "Always enable strict: true in tsconfig.json.",
      "Avoid using 'any'; use 'unknown' when the incoming type is truly indeterminate."
    ],
    commonMistakes: [
      "Overusing type assertions (as unknown as SpecificType) to silence compiler warnings."
    ],
    faq: [
      {
        question: "Does TypeScript add overhead to runtime performance?",
        answer: "Zero. TypeScript is strictly compile-time; all types and interfaces are stripped during compilation into plain JavaScript."
      }
    ],
    relatedErrors: ["react-module-not-found"],
    relatedTutorials: ["react-typescript"]
  },
  {
    title: "React Hooks Comprehensive Guide",
    description: "Master useState, useEffect, useRef, useMemo, useCallback, and building custom hooks with clean patterns.",
    slug: "react-hooks",
    category: "React",
    tags: ["react", "hooks", "frontend", "javascript"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "11 min",
    difficulty: "Beginner",
    prerequisites: ["Basic React component understanding"],
    sections: [
      {
        title: "1. State and Lifecycle with useState and useEffect",
        content: "Manage reactive component state and side effects cleanly.",
        code: "import { useState, useEffect } from 'react';\n\nexport default function WindowSize() {\n  const [size, setSize] = useState({ width: 0, height: 0 });\n\n  useEffect(() => {\n    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });\n    handleResize(); // Initial call\n    window.addEventListener('resize', handleResize);\n    \n    // Clean-up function prevents memory leaks\n    return () => window.removeEventListener('resize', handleResize);\n  }, []); // Empty array = mount once\n\n  return <div>{size.width} x {size.height}</div>;\n}",
        language: "tsx"
      }
    ],
    bestPractices: [
      "Always return cleanup functions from useEffect when subscribing to event listeners or timers.",
      "Follow the Rules of Hooks: only call hooks at the top level of function components."
    ],
    commonMistakes: [
      "Mutating state directly (e.g. state.push(item)) instead of providing a new array ([...state, item])."
    ],
    faq: [
      {
        question: "When should I use useMemo vs useCallback?",
        answer: "useMemo caches the calculated return value of a function. useCallback caches the function definition itself."
      }
    ],
    relatedErrors: ["react-useeffect-infinite-loop", "react-hydration-error"],
    relatedTutorials: ["react-api-integration", "react-typescript"]
  },
  {
    title: "React API Integration Best Practices",
    description: "Fetch and synchronize REST APIs in React using fetch, TanStack React Query, loading skeletons, and error boundaries.",
    slug: "react-api-integration",
    category: "React",
    tags: ["react", "api", "fetch", "state-management"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "9 min",
    difficulty: "Intermediate",
    prerequisites: ["React basics", "Promises & async/await"],
    sections: [
      {
        title: "1. Fetching with Loading and Error States",
        content: "Manage the complete data fetching lifecycle with loading indicators and error recovery.",
        code: "export function ArticleList() {\n  const [articles, setArticles] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    let isMounted = true;\n    fetch('/api/articles')\n      .then(res => {\n        if (!res.ok) throw new Error('Network error');\n        return res.json();\n      })\n      .then(data => {\n        if (isMounted) {\n          setArticles(data);\n          setLoading(false);\n        }\n      })\n      .catch(err => {\n        if (isMounted) {\n          setError(err.message);\n          setLoading(false);\n        }\n      });\n\n    return () => { isMounted = false; };\n  }, []);\n\n  if (loading) return <p>Loading articles...</p>;\n  if (error) return <p className=\"text-red-500\">Error: {error}</p>;\n  return <ul>{articles.map(a => <li key={a.id}>{a.title}</li>)}</ul>;\n}",
        language: "tsx"
      }
    ],
    bestPractices: [
      "Use AbortController or an isMounted flag to prevent state updates on unmounted components."
    ],
    commonMistakes: [
      "Forgetting to check response.ok, assuming HTTP 404 or 500 will reject the fetch promise automatically."
    ],
    faq: [
      {
        question: "Does fetch() throw an error on 404 Not Found?",
        answer: "No! fetch() only rejects on network disconnection or DNS failure. You must manually check if (!response.ok)."
      }
    ],
    relatedErrors: ["react-map-is-not-a-function"],
    relatedTutorials: ["react-hooks"]
  },
  {
    title: "React with TypeScript: Complete Component Architecture",
    description: "Type React components, custom hooks, event handlers, and context providers with TypeScript.",
    slug: "react-typescript",
    category: "React",
    tags: ["react", "typescript", "frontend", "architecture"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "9 min",
    difficulty: "Intermediate",
    prerequisites: ["Basic React", "Basic TypeScript"],
    sections: [
      {
        title: "1. Typing Component Props and Children",
        content: "Use PropsWithChildren and specific event types.",
        code: "import React, { FC, PropsWithChildren } from 'react';\n\ninterface ButtonProps {\n  variant?: 'primary' | 'secondary';\n  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;\n}\n\nexport const Button: FC<PropsWithChildren<ButtonProps>> = ({\n  variant = 'primary',\n  onClick,\n  children\n}) => {\n  return (\n    <button\n      onClick={onClick}\n      className={`btn ${variant === 'primary' ? 'bg-teal-600' : 'bg-slate-800'}`}\n    >\n      {children}\n    </button>\n  );\n};",
        language: "tsx"
      }
    ],
    bestPractices: [
      "Avoid using any for event handlers; use specific types like React.ChangeEvent<HTMLInputElement>."
    ],
    commonMistakes: [
      "Declaring types inline inside component arguments rather than creating exportable interfaces."
    ],
    faq: [
      {
        question: "How do I type ref elements in React?",
        answer: "Use useRef<HTMLInputElement>(null) with the corresponding DOM element type."
      }
    ],
    relatedErrors: ["react-module-not-found"],
    relatedTutorials: ["typescript-beginner-guide", "react-hooks"]
  }
];
