import { CategoryInfo } from "./types";

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "java",
    slug: "java",
    name: "Java",
    description: "Troubleshooting common Java exceptions, JVM errors, Maven dependency locks, and classloader issues.",
    icon: "Coffee",
    color: "from-amber-500/20 to-orange-500/20 text-amber-500 border-amber-500/30"
  },
  {
    id: "spring-boot",
    slug: "spring-boot",
    name: "Spring Boot",
    description: "Solutions for Spring context failures, port conflicts, DataSource configuration, and REST annotations.",
    icon: "Leaf",
    color: "from-emerald-500/20 to-green-500/20 text-emerald-500 border-emerald-500/30"
  },
  {
    id: "javascript",
    slug: "javascript",
    name: "JavaScript",
    description: "Async/await gotchas, promise rejections, type coercion errors, and modern ES syntax deep dives.",
    icon: "FileCode",
    color: "from-yellow-500/20 to-amber-500/20 text-yellow-500 border-yellow-500/30"
  },
  {
    id: "react",
    slug: "react",
    name: "React",
    description: "Fixing hydration mismatches, infinite useEffect loops, state mutation bugs, and component re-render traps.",
    icon: "Atom",
    color: "from-cyan-500/20 to-blue-500/20 text-cyan-500 border-cyan-500/30"
  },
  {
    id: "angular",
    slug: "angular",
    name: "Angular",
    description: "Resolving ExpressionChangedAfterItHasBeenCheckedError, NullInjectorError, module imports, and RxJS pipelines.",
    icon: "ShieldAlert",
    color: "from-red-500/20 to-rose-500/20 text-red-500 border-red-500/30"
  },
  {
    id: "python",
    slug: "python",
    name: "Python",
    description: "Diagnosing ModuleNotFoundError, KeyError, IndentationError, typing discrepancies, and virtual environments.",
    icon: "Terminal",
    color: "from-blue-500/20 to-indigo-500/20 text-blue-500 border-blue-500/30"
  },
  {
    id: "nodejs",
    slug: "nodejs",
    name: "Node.js",
    description: "Fixing EADDRINUSE port errors, npm permission crashes, circular dependencies, and event loop delays.",
    icon: "Server",
    color: "from-lime-500/20 to-emerald-500/20 text-lime-500 border-lime-500/30"
  },
  {
    id: "docker",
    slug: "docker",
    name: "Docker",
    description: "Remedies for container exit code 137, port binding conflicts, image cache issues, and daemon permissions.",
    icon: "Box",
    color: "from-sky-500/20 to-cyan-500/20 text-sky-500 border-sky-500/30"
  },
  {
    id: "kubernetes",
    slug: "kubernetes",
    name: "Kubernetes",
    description: "Troubleshooting CrashLoopBackOff, ImagePullBackOff, Pending pods, Service endpoints, and Ingress routing.",
    icon: "Boxes",
    color: "from-indigo-500/20 to-blue-500/20 text-indigo-500 border-indigo-500/30"
  },
  {
    id: "git",
    slug: "git",
    name: "Git",
    description: "Resolving merge conflicts, detached HEAD states, non-fast-forward push rejections, and rebasing safely.",
    icon: "GitBranch",
    color: "from-orange-500/20 to-red-500/20 text-orange-500 border-orange-500/30"
  },
  {
    id: "ai",
    slug: "ai",
    name: "AI",
    description: "Building AI agents, OpenAI and Anthropic API integrations, prompt management, and streaming responses.",
    icon: "Sparkles",
    color: "from-purple-500/20 to-pink-500/20 text-purple-500 border-purple-500/30"
  },
  {
    id: "sql",
    slug: "sql",
    name: "SQL",
    description: "Debugging SQL syntax mistakes, unknown column errors, table locking, migration conflicts, and index tuning.",
    icon: "Database",
    color: "from-teal-500/20 to-emerald-500/20 text-teal-500 border-teal-500/30"
  }
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
