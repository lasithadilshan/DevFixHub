import { ErrorArticle } from "../types";

export const ERRORS_BATCH_1: ErrorArticle[] = [
  {
    title: "Spring Boot Port 8080 Already in Use",
    description: "Fix WebServerException: Port 8080 was already in use by killing the conflicting process or assigning a custom port.",
    slug: "spring-boot-port-8080-already-in-use",
    category: "Spring Boot",
    tags: ["spring-boot", "port-conflict", "networking", "tomcat"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "org.springframework.boot.web.server.PortInUseException: Port 8080 was already in use",
    problem: "When launching a Spring Boot application, Embedded Tomcat fails to start because port 8080 is already bound by another background application, a previously unclosed JVM instance, or Docker container.",
    causes: [
      "A previous instance of the Spring Boot application is still running in the background.",
      "Another local server (Jenkins, Tomcat, Oracle XE, or Docker) is bound to port 8080.",
      "The IDE crashed without terminating the spawned Java child process."
    ],
    solutionSteps: [
      {
        title: "Step 1: Identify the process listening on port 8080",
        description: "Run the terminal command to find the Process Identifier (PID) using port 8080.",
        command: "lsof -i :8080\n# On Windows: netstat -ano | findstr :8080",
        language: "bash"
      },
      {
        title: "Step 2: Terminate the blocking process",
        description: "Kill the process using its PID (replace 12345 with the actual PID from step 1).",
        command: "kill -9 12345\n# On Windows: taskkill /PID 12345 /F",
        language: "bash"
      },
      {
        title: "Step 3: Change the server port in application properties",
        description: "If port 8080 is reserved by a permanent system service, configure Spring Boot to use another port.",
        code: "# application.properties\nserver.port=8081\n\n# Or application.yml\nserver:\n  port: 8081",
        language: "properties"
      }
    ],
    alternatives: [
      {
        title: "Assign a random available port (ideal for automated tests)",
        description: "Set server.port to 0 to let the OS allocate any free ephemeral port.",
        code: "server.port=0"
      },
      {
        title: "Override port via command line argument",
        description: "Pass the port override flag at runtime without modifying code.",
        code: "java -jar target/app.jar --server.port=9090"
      }
    ],
    commonMistakes: [
      "Restarting the IDE without checking if the orphaned background Java process is still active.",
      "Changing the port in application.properties but forgetting that environment variable SERVER_PORT overrides it.",
      "Forgetting that Docker host port mapping (-p 8080:8080) reserves the host port."
    ],
    preventionTips: [
      "Always configure graceful shutdown hooks in Spring Boot.",
      "Use docker-compose port variables rather than hardcoding port 8080 across multiple microservices."
    ],
    faq: [
      {
        question: "Why does Spring Boot default to port 8080?",
        answer: "Port 8080 is the standard alternate HTTP port established by Apache Tomcat and the Java Servlet Specification."
      },
      {
        question: "How do I check what port Spring Boot picked when server.port=0?",
        answer: "Inject ServletWebServerApplicationContext and call getWebServer().getPort(), or watch the console logs for 'Tomcat started on port(s): XXXXX'."
      }
    ],
    relatedErrors: ["nodejs-port-already-in-use", "docker-port-already-allocated"],
    relatedTutorials: ["spring-boot-rest-api-tutorial"],
    relatedTools: ["url-encoder"]
  },
  {
    title: "Spring Boot Ambiguous Handler Methods",
    description: "Resolve IllegalStateException: Ambiguous mapping caused by duplicate @GetMapping or @PostMapping path signatures.",
    slug: "spring-boot-ambiguous-handler-methods",
    category: "Spring Boot",
    tags: ["spring-boot", "spring-mvc", "rest-controller", "routing"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "java.lang.IllegalStateException: Ambiguous mapping. Cannot map 'userController' method",
    problem: "Spring DispatcherServlet fails to initialize during startup because two controller methods share the identical HTTP method and URL path pattern.",
    causes: [
      "Two controller classes define the exact same @GetMapping('/api/users') endpoint.",
      "A base controller is scanned twice with generic request mappings.",
      "Copy-pasting an endpoint method and forgetting to change the HTTP method or path."
    ],
    solutionSteps: [
      {
        title: "Step 1: Check the conflicting controller paths in stack trace",
        description: "Look at the exception log. Spring explicitly prints both conflicting class names and method signatures.",
        command: "Ambiguous mapping. Cannot map 'orderController.getOrder(Long)' to {GET [/api/orders/{id}]}: There is already 'invoiceController.getInvoice(Long)' mapped.",
        language: "text"
      },
      {
        title: "Step 2: Differentiate URL paths or HTTP methods",
        description: "Refactor one of the conflicting endpoints to have a unique path or parameter constraint.",
        code: "@RestController\n@RequestMapping(\"/api/orders\")\npublic class OrderController {\n\n    @GetMapping(\"/{id}\")\n    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {\n        return ResponseEntity.ok(orderService.findById(id));\n    }\n\n    @GetMapping(value = \"/{id}\", params = \"detailed=true\")\n    public ResponseEntity<OrderDetail> getOrderDetailed(@PathVariable Long id) {\n        return ResponseEntity.ok(orderService.findDetailed(id));\n    }\n}",
        language: "java"
      }
    ],
    commonMistakes: [
      "Attempting to disambiguate purely by method argument types without altering the URL or parameters constraint.",
      "Using @RequestMapping without specifying the method attribute (which defaults to matching all HTTP verbs)."
    ],
    preventionTips: [
      "Always prefix controller classes with specific domain routes (e.g. @RequestMapping('/api/v1/orders')).",
      "Write Spring MockMvc tests verifying route resolution."
    ],
    faq: [
      {
        question: "Can I disambiguate endpoints by query parameters?",
        answer: "Yes, use params attribute: @GetMapping(value = '/search', params = 'type=active')."
      }
    ],
    relatedErrors: ["spring-boot-bean-creation-exception"],
    relatedTutorials: ["spring-boot-rest-api-tutorial"]
  },
  {
    title: "Spring Boot Failed to Configure DataSource",
    description: "Fix 'Failed to configure a DataSource: url attribute is not specified and no embedded datasource could be configured'.",
    slug: "spring-boot-failed-to-configure-datasource",
    category: "Spring Boot",
    tags: ["spring-boot", "database", "jpa", "hibernate"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "Action: Consider the following: If you want an embedded database (H2, HSQL or Derby), please put it on the classpath.",
    problem: "Spring Boot added Spring Data JPA to the classpath but cannot find JDBC connection properties or an in-memory database driver.",
    causes: [
      "spring-boot-starter-data-jpa is in pom.xml, but spring.datasource.* properties are missing.",
      "No in-memory database dependency like H2 is added for local testing.",
      "The application properties file is misspelled (e.g., application.prop instead of application.properties)."
    ],
    solutionSteps: [
      {
        title: "Step 1: Add JDBC properties to application.properties",
        description: "Specify the database URL, username, password, and driver class name.",
        code: "spring.datasource.url=jdbc:postgresql://localhost:5432/mydb\nspring.datasource.username=postgres\nspring.datasource.password=secret\nspring.datasource.driver-class-name=org.postgresql.Driver\nspring.jpa.hibernate.ddl-auto=update",
        language: "properties"
      },
      {
        title: "Step 2: Or disable DataSource autoconfiguration if DB is not needed yet",
        description: "If you don't need a database connection yet, exclude DataSourceAutoConfiguration.",
        code: "@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}",
        language: "java"
      }
    ],
    commonMistakes: [
      "Adding spring-boot-starter-data-jpa before provisioning or deciding on a database.",
      "Using environment variable names with hyphens that Spring Boot cannot bind to properties."
    ],
    preventionTips: [
      "Use test profiles (application-test.properties) with H2 in-memory DB for automated builds."
    ],
    faq: [
      {
        question: "How do I use H2 for local testing without full PostgreSQL?",
        answer: "Add com.h2database:h2 dependency to your pom.xml/build.gradle and Spring Boot will auto-wire an in-memory database."
      }
    ],
    relatedErrors: ["spring-boot-bean-creation-exception"],
    relatedTutorials: ["spring-boot-postgresql"]
  },
  {
    title: "Spring Boot Bean Creation Exception",
    description: "Troubleshoot BeanCreationException: Error creating bean with name and UnsatisfiedDependencyException in Spring context.",
    slug: "spring-boot-bean-creation-exception",
    category: "Spring Boot",
    tags: ["spring-boot", "dependency-injection", "beans", "ioc"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "5 min",
    errorCode: "org.springframework.beans.factory.BeanCreationException: Error creating bean with name",
    problem: "The Spring ApplicationContext fails during initialization because a requested @Autowired or constructor-injected bean cannot be instantiated, has missing dependencies, or circular references.",
    causes: [
      "Missing @Service, @Component, or @Repository annotation on an implementation class.",
      "Circular dependency where Bean A requires Bean B and Bean B requires Bean A.",
      "Constructor throws an unhandled exception during instantiation."
    ],
    solutionSteps: [
      {
        title: "Step 1: Check root cause in the stack trace",
        description: "Scroll to the bottom of the stack trace to the 'Caused by:' line. It reveals the exact missing bean or circular dependency.",
        command: "Caused by: org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'com.example.service.UserService' available",
        language: "text"
      },
      {
        title: "Step 2: Add missing component annotation",
        description: "Ensure the dependency class is annotated with @Service or @Component and located in the scanned package hierarchy.",
        code: "@Service\npublic class UserServiceImpl implements UserService {\n    // Implementation\n}",
        language: "java"
      },
      {
        title: "Step 3: Resolve circular references with @Lazy",
        description: "If two services depend on each other, refactor them or inject with @Lazy.",
        code: "@Service\npublic class OrderService {\n    private final PaymentService paymentService;\n\n    public OrderService(@Lazy PaymentService paymentService) {\n        this.paymentService = paymentService;\n    }\n}",
        language: "java"
      }
    ],
    commonMistakes: [
      "Placing service classes outside the root package where @SpringBootApplication is located.",
      "Relying on field injection (@Autowired) rather than constructor injection, making testing difficult."
    ],
    preventionTips: [
      "Always use constructor injection; modern IDEs and Spring will detect missing beans at compile or context test time."
    ],
    faq: [
      {
        question: "Why did Spring Boot 2.6+ start failing on circular dependencies by default?",
        answer: "Spring Boot prohibited circular dependencies by default to encourage clean domain boundaries and prevent initialization race conditions."
      }
    ],
    relatedErrors: ["spring-boot-failed-to-configure-datasource"],
    relatedTutorials: ["spring-boot-rest-api-tutorial"]
  },
  {
    title: "Java NullPointerException (NPE)",
    description: "Identify the root cause of java.lang.NullPointerException and prevent it using Optional, Objects, and modern Java patterns.",
    slug: "java-nullpointerexception",
    category: "Java",
    tags: ["java", "npe", "exceptions", "clean-code"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "5 min",
    errorCode: "java.lang.NullPointerException: Cannot invoke 'String.length()' because 'str' is null",
    problem: "An application attempts to invoke a method, access a field, or measure the length of an object reference that points to null in memory.",
    causes: [
      "Invoking an instance method on a variable that was never initialized.",
      "Accessing elements from an uninitialized collection or map.",
      "Auto-unboxing a null wrapper type (e.g. Integer i = null; int x = i;)."
    ],
    solutionSteps: [
      {
        title: "Step 1: Check Helpful NullPointerExceptions (Java 14+)",
        description: "Modern Java prints the exact variable that evaluated to null in the exception message.",
        command: "Exception in thread 'main' java.lang.NullPointerException: Cannot invoke 'User.getAddress()' because 'user' is null",
        language: "text"
      },
      {
        title: "Step 2: Guard with null checks or Objects.requireNonNull",
        description: "Validate inputs at the boundaries of public APIs.",
        code: "public void processOrder(Order order) {\n    Objects.requireNonNull(order, \"Order must not be null\");\n    // safe execution\n}",
        language: "java"
      },
      {
        title: "Step 3: Use Java Optional for nullable return values",
        description: "Return Optional<T> instead of returning null from methods that might not find a result.",
        code: "public Optional<User> findById(Long id) {\n    return Optional.ofNullable(userMap.get(id));\n}\n\n// Usage:\nString email = findById(42L)\n    .map(User::getEmail)\n    .orElse(\"no-email@domain.com\");",
        language: "java"
      }
    ],
    commonMistakes: [
      "Calling .get() on an Optional without checking .isPresent() first (which throws NoSuchElementException).",
      "Calling .equals() on a nullable variable instead of 'CONSTANT'.equals(variable)."
    ],
    preventionTips: [
      "Prefer returning empty collections (Collections.emptyList()) rather than null.",
      "Use static analysis tools like SpotBugs or NullAway."
    ],
    faq: [
      {
        question: "Should I use Optional for class fields or method arguments?",
        answer: "No, Optional is intended strictly as a method return type. Using it in fields wastes memory and breaks serialization."
      }
    ],
    relatedErrors: ["react-cannot-read-properties-of-undefined"],
    relatedTutorials: ["spring-boot-rest-api-tutorial"]
  },
  {
    title: "Java ClassNotFoundException",
    description: "Diagnose java.lang.ClassNotFoundException and NoClassDefFoundError across classpaths, Maven, and runtime loaders.",
    slug: "java-classnotfoundexception",
    category: "Java",
    tags: ["java", "jvm", "classpath", "maven"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "java.lang.ClassNotFoundException: org.postgresql.Driver",
    problem: "The Java Virtual Machine attempts to dynamically load a class (via Class.forName or ClassLoader) but the compiled .class bytecode does not exist on the classpath.",
    causes: [
      "A required third-party JAR is missing from the runtime classpath.",
      "Maven dependency scope was set to 'provided' or 'test' instead of 'runtime' or 'compile'.",
      "Typo in the fully qualified class name string."
    ],
    solutionSteps: [
      {
        title: "Step 1: Check Maven dependency declaration",
        description: "Ensure the artifact is properly declared in pom.xml without restrictive scopes.",
        code: "<dependency>\n    <groupId>org.postgresql</groupId>\n    <artifactId>postgresql</artifactId>\n    <version>42.7.2</version>\n    <scope>runtime</scope>\n</dependency>",
        language: "xml"
      },
      {
        title: "Step 2: Refresh and package dependencies",
        description: "Re-download dependencies and verify package inclusion.",
        command: "mvn clean package -DskipTests",
        language: "bash"
      }
    ],
    commonMistakes: [
      "Assuming a class available during compile time in your IDE is automatically bundled into the production fat JAR.",
      "Confusing ClassNotFoundException (dynamic load failure) with NoClassDefFoundError (class was present during compilation but missing at runtime)."
    ],
    preventionTips: [
      "Use the maven-dependency-plugin (mvn dependency:tree) to inspect resolved jars."
    ],
    faq: [
      {
        question: "What is the difference between ClassNotFoundException and NoClassDefFoundError?",
        answer: "ClassNotFoundException is an Exception thrown when dynamically loading a class with reflection. NoClassDefFoundError is a fatal LinkageError when a statically compiled dependency is missing at runtime."
      }
    ],
    relatedErrors: ["java-maven-dependency-error"],
    relatedTutorials: ["spring-boot-postgresql"]
  },
  {
    title: "Java OutOfMemoryError: Java Heap Space",
    description: "Diagnose java.lang.OutOfMemoryError: Java heap space, configure JVM -Xmx limits, and identify memory leaks.",
    slug: "java-outofmemoryerror",
    category: "Java",
    tags: ["java", "jvm", "memory", "performance"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "5 min",
    errorCode: "java.lang.OutOfMemoryError: Java heap space",
    problem: "The Garbage Collector cannot allocate memory for new objects because the JVM allocated maximum heap size (-Xmx) has been fully consumed.",
    causes: [
      "Loading massive datasets (like querying 1,000,000 rows from a database) entirely into memory.",
      "Unbounded static collections (e.g. Map caches) that retain object references forever.",
      "Default JVM heap limit is too low for the container or workload."
    ],
    solutionSteps: [
      {
        title: "Step 1: Increase JVM Max Heap Size (-Xmx)",
        description: "Specify appropriate minimum (-Xms) and maximum (-Xmx) heap size parameters.",
        command: "java -Xms2g -Xmx4g -jar app.jar",
        language: "bash"
      },
      {
        title: "Step 2: Stream large database queries instead of List<T>",
        description: "Use Spring Data JPA Stream or batch pagination to avoid loading all records at once.",
        code: "@Transactional(readOnly = true)\npublic void exportUsers() {\n    try (Stream<User> userStream = userRepository.streamAll()) {\n        userStream.forEach(this::writeToCsv);\n    }\n}",
        language: "java"
      }
    ],
    commonMistakes: [
      "Blindly increasing -Xmx when there is an actual memory leak, merely delaying the eventual crash.",
      "Ignoring container cgroup memory limits in Kubernetes, causing the Linux kernel OOMKiller to kill the pod."
    ],
    preventionTips: [
      "Configure -XX:+HeapDumpOnOutOfMemoryError to capture memory dumps for Eclipse Memory Analyzer (MAT)."
    ],
    faq: [
      {
        question: "Does doubling -Xmx slow down garbage collection?",
        answer: "Yes, larger heaps can increase GC pause times unless using modern low-pause collectors like G1GC or ZGC (-XX:+UseZGC)."
      }
    ],
    relatedErrors: ["kubernetes-crashloopbackoff"],
    relatedTutorials: ["docker-beginner-guide"]
  },
  {
    title: "Java Maven Dependency Error: Could Not Resolve Dependencies",
    description: "Fix Maven artifact resolution failures, corrupted local repository caches, and repository authentication errors.",
    slug: "java-maven-dependency-error",
    category: "Java",
    tags: ["java", "maven", "build", "dependencies"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "[ERROR] Failed to execute goal on project: Could not resolve dependencies for project",
    problem: "Maven fails during compile or package because a required artifact could not be downloaded from Maven Central or private Nexus/Artifactory repository.",
    causes: [
      "A corrupted or interrupted download in the local ~/.m2/repository cache.",
      "The artifact coordinates (groupId, artifactId, or version) have a typo.",
      "Network proxy, firewall, or missing credentials in settings.xml."
    ],
    solutionSteps: [
      {
        title: "Step 1: Force dependency update check",
        description: "Run Maven with the -U flag to force re-checking remote repositories.",
        command: "mvn clean install -U",
        language: "bash"
      },
      {
        title: "Step 2: Purge corrupted local repository cache",
        description: "Delete the specific broken artifact directory from your ~/.m2/repository folder.",
        command: "mvn dependency:purge-local-repository -DactTransitively=false -DreResolve=true",
        language: "bash"
      }
    ],
    commonMistakes: [
      "Deleting the entire ~/.m2 directory when only one specific library cache was corrupted.",
      "Missing <repositories> definition for snapshot or custom company libraries."
    ],
    preventionTips: [
      "Pin exact dependency versions using Maven <dependencyManagement> bill-of-materials (BOM)."
    ],
    faq: [
      {
        question: "Where is the Maven settings file located?",
        answer: "Global settings are in $M2_HOME/conf/settings.xml and user settings are in ~/.m2/settings.xml."
      }
    ],
    relatedErrors: ["java-classnotfoundexception"],
    relatedTutorials: ["spring-boot-rest-api-tutorial"]
  },
  {
    title: "React map is not a function",
    description: "Fix TypeError: data.map is not a function in React when rendering lists from API responses.",
    slug: "react-map-is-not-a-function",
    category: "React",
    tags: ["react", "javascript", "typeerror", "frontend"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "TypeError: items.map is not a function",
    problem: "A React component calls the .map() method on a state variable or prop that is currently undefined, null, or an object instead of an Array.",
    causes: [
      "Initial state is undefined or null before the asynchronous API fetch completes.",
      "The API response returned an object (e.g. { data: [...] }) rather than a direct array.",
      "An error occurred on the backend, returning an error object { error: 'Not Found' }."
    ],
    solutionSteps: [
      {
        title: "Step 1: Initialize array state with empty array []",
        description: "Never initialize an array state to undefined or null.",
        code: "// BAD:\nconst [users, setUsers] = useState();\n\n// GOOD:\nconst [users, setUsers] = useState<User[]>([]);",
        language: "tsx"
      },
      {
        title: "Step 2: Guard with Array.isArray() or optional chaining",
        description: "Verify that the data is an array before attempting to iterate.",
        code: "return (\n  <ul>\n    {Array.isArray(users) && users.map((user) => (\n      <li key={user.id}>{user.name}</li>\n    ))}\n  </ul>\n);",
        language: "tsx"
      },
      {
        title: "Step 3: Extract nested array from API payload",
        description: "Ensure you are setting the array property rather than the parent wrapper object.",
        code: "useEffect(() => {\n  fetch('/api/users')\n    .then((res) => res.json())\n    .then((json) => {\n      // Check if data is nested inside json.users or json.data\n      setUsers(Array.isArray(json) ? json : json.data || []);\n    })\n    .catch(() => setUsers([]));\n}, []);",
        language: "tsx"
      }
    ],
    commonMistakes: [
      "Assuming fetch() automatically unwraps response bodies without calling res.json().",
      "Forgetting to check the Network tab in DevTools to inspect the exact structure of the API payload."
    ],
    preventionTips: [
      "Use TypeScript interfaces to enforce contract expectations between API responses and component state."
    ],
    faq: [
      {
        question: "Can I use .map() on JavaScript Objects?",
        answer: "No, .map() is exclusively an Array prototype method. For objects, use Object.keys(obj).map() or Object.entries(obj).map()."
      }
    ],
    relatedErrors: ["react-cannot-read-properties-of-undefined"],
    relatedTutorials: ["react-api-integration", "react-hooks"],
    relatedTools: ["json-validator", "json-formatter"]
  },
  {
    title: "React Cannot Read Properties of Undefined",
    description: "Fix TypeError: Cannot read properties of undefined (reading 'xyz') using optional chaining, nullish coalescing, and defensive checks.",
    slug: "react-cannot-read-properties-of-undefined",
    category: "React",
    tags: ["react", "javascript", "typeerror", "debugging"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "TypeError: Cannot read properties of undefined (reading 'address')",
    problem: "React attempts to access a nested property (e.g. user.address.city) on a parent object that has not yet loaded or is undefined.",
    causes: [
      "Asynchronous data has not finished fetching during the component's initial render pass.",
      "Accessing optional properties without verifying their existence.",
      "Incorrect object destructuring from props."
    ],
    solutionSteps: [
      {
        title: "Step 1: Use Optional Chaining (?.)",
        description: "Safely navigate nested properties without throwing if a parent is undefined.",
        code: "// BAD:\n<span>{user.address.street}</span>\n\n// GOOD:\n<span>{user?.address?.street ?? 'No address provided'}</span>",
        language: "tsx"
      },
      {
        title: "Step 2: Add early loading state return",
        description: "Do not render child content until the data is populated.",
        code: "if (!user) {\n  return <div className=\"animate-pulse\">Loading user details...</div>;\n}\n\nreturn <div>{user.address.street}</div>;",
        language: "tsx"
      }
    ],
    commonMistakes: [
      "Assuming state set inside useEffect is available on the very first render pass."
    ],
    preventionTips: [
      "Use TypeScript strictNullChecks in tsconfig.json to catch potential undefined properties at compile time."
    ],
    faq: [
      {
        question: "What is the difference between ?. and && in React JSX?",
        answer: "Optional chaining (?.) returns undefined if nullish. Logical AND (&&) in JSX can accidentally render '0' or 'false' onto the screen if the left side evaluates to 0."
      }
    ],
    relatedErrors: ["react-map-is-not-a-function"],
    relatedTutorials: ["react-hooks"]
  },
  {
    title: "React Module Not Found Error",
    description: "Fix 'Module not found: Can't resolve...' caused by incorrect relative file paths, missing extensions, or case-sensitivity.",
    slug: "react-module-not-found",
    category: "React",
    tags: ["react", "bundler", "webpack", "npm"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "3 min",
    errorCode: "Module not found: Error: Can't resolve './components/header' in '/src/app'",
    problem: "The bundler (Webpack, Vite, or Turbopack) cannot locate the imported file or npm package at the specified path.",
    causes: [
      "Case-sensitivity mismatch (e.g., Header.tsx vs header.tsx works on macOS but fails on Linux/Vercel).",
      "Incorrect relative directory traversal (e.g., ../components vs ./components).",
      "Missing npm package installation."
    ],
    solutionSteps: [
      {
        title: "Step 1: Check exact file name casing",
        description: "Linux build servers (like Vercel and GitHub Actions) are case-sensitive.",
        command: "git mv src/components/header.tsx src/components/Header.tsx",
        language: "bash"
      },
      {
        title: "Step 2: Use path aliases (@/*)",
        description: "Configure paths in tsconfig.json to avoid messy relative paths like ../../../.",
        code: "import Header from '@/components/Header';",
        language: "tsx"
      }
    ],
    commonMistakes: [
      "Renaming a file with case change only on macOS without using git mv, causing git to ignore the case change."
    ],
    preventionTips: [
      "Enable 'forceConsistentCasingInFileNames': true in tsconfig.json."
    ],
    faq: [
      {
        question: "Why did my build work locally on Mac but fail on Vercel?",
        answer: "macOS file systems are case-insensitive by default, while Linux systems are strictly case-sensitive."
      }
    ],
    relatedErrors: ["nextjs-module-not-found", "angular-cannot-find-module"],
    relatedTutorials: ["react-typescript"]
  },
  {
    title: "React Hydration Error: Text Content Does Not Match",
    description: "Fix 'Hydration failed because the initial UI does not match what was rendered on the server' in SSR React.",
    slug: "react-hydration-error",
    category: "React",
    tags: ["react", "ssr", "hydration", "nextjs"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "5 min",
    errorCode: "Error: Hydration failed because the server-rendered HTML didn't match the client.",
    problem: "In Server-Side Rendered (SSR) React, the HTML generated on the server differs from the virtual DOM tree generated during client hydration.",
    causes: [
      "Rendering browser-only APIs like window.innerWidth, localStorage, or Date.now() directly in JSX.",
      "Invalid HTML nesting (e.g., putting a <p> inside another <p>, or a <div> inside a <p>).",
      "Browser extensions (like password managers or translators) modifying DOM before React hydrates."
    ],
    solutionSteps: [
      {
        title: "Step 1: Defer client-specific values until mounted",
        description: "Use a useEffect mounted state pattern to ensure client-only data is rendered after hydration completes.",
        code: "\"use client\";\nimport { useState, useEffect } from \"react\";\n\nexport default function ClientClock() {\n  const [mounted, setMounted] = useState(false);\n\n  useEffect(() => {\n    setMounted(true);\n  }, []);\n\n  if (!mounted) return null;\n\n  return <div>{new Date().toLocaleTimeString()}</div>;\n}",
        language: "tsx"
      },
      {
        title: "Step 2: Suppress hydration warning for inevitable dynamic timestamps",
        description: "Use suppressHydrationWarning on elements where minor text variations are acceptable.",
        code: "<span suppressHydrationWarning>{new Date().getFullYear()}</span>",
        language: "tsx"
      }
    ],
    commonMistakes: [
      "Placing interactive buttons or block elements inside <p> tags, which browser HTML parsers automatically split."
    ],
    preventionTips: [
      "Always validate your HTML structure using semantic HTML standards."
    ],
    faq: [
      {
        question: "Does a hydration error crash the entire React application?",
        answer: "In development React displays a clear overlay. In production, React discards the server HTML and performs a complete client-side re-render, degrading performance."
      }
    ],
    relatedErrors: ["nextjs-hydration-error"],
    relatedTutorials: ["react-hooks"]
  },
  {
    title: "React useEffect Infinite Loop",
    description: "Diagnose and prevent infinite re-render loops caused by missing or mutating dependencies in useEffect.",
    slug: "react-useeffect-infinite-loop",
    category: "React",
    tags: ["react", "hooks", "infinite-loop", "state"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "5 min",
    errorCode: "Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.",
    problem: "A React component triggers a state update inside useEffect, which re-renders the component, which in turn triggers useEffect again in an endless cycle.",
    causes: [
      "Updating a state variable inside useEffect that is also listed in its dependency array.",
      "Passing objects, functions, or arrays created inside the component body into the dependency array without useCallback/useMemo.",
      "Omitting the dependency array entirely (which causes the effect to run on every single render)."
    ],
    solutionSteps: [
      {
        title: "Step 1: Use functional state updates",
        description: "Avoid listing the updated state variable as a dependency by using the functional updater form.",
        code: "// BAD (causes loop):\nuseEffect(() => {\n  setCount(count + 1);\n}, [count]);\n\n// GOOD (no count dependency needed):\nuseEffect(() => {\n  setCount((prev) => prev + 1);\n}, []);",
        language: "tsx"
      },
      {
        title: "Step 2: Memoize object and function dependencies",
        description: "Wrap callback functions in useCallback so their object reference remains stable across renders.",
        code: "const fetchUser = useCallback(async () => {\n  const res = await fetch(`/api/users/${userId}`);\n  const data = await res.json();\n  setUser(data);\n}, [userId]);\n\nuseEffect(() => {\n  fetchUser();\n}, [fetchUser]);",
        language: "tsx"
      }
    ],
    commonMistakes: [
      "Disabling the react-hooks/exhaustive-deps eslint rule instead of fixing the unstable object reference."
    ],
    preventionTips: [
      "Keep state primitive where possible and extract static functions outside the component function."
    ],
    faq: [
      {
        question: "Why do object dependencies trigger useEffect every time?",
        answer: "JavaScript compares objects by reference (===). In React, an object literal {} created inside a component has a new memory address on every render."
      }
    ],
    relatedErrors: ["react-hydration-error"],
    relatedTutorials: ["react-hooks"]
  },
  {
    title: "Next.js Hydration Error in App Router",
    description: "Fix hydration failed and server/client mismatch errors specific to Next.js Server Components and Client Components.",
    slug: "nextjs-hydration-error",
    category: "React",
    tags: ["nextjs", "react", "app-router", "ssr"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "Unhandled Runtime Error: Hydration failed because the initial UI does not match what was rendered on the server.",
    problem: "Next.js App Router renders HTML on the server, but client-side JavaScript produces different DOM nodes during initial load.",
    causes: [
      "Accessing window, document, or localStorage inside Client Components without a mounted check.",
      "Mismatch in date/time formatting between server locale and client user locale.",
      "HTML syntax violations such as nesting <div> inside <p> or <table> without <tbody>."
    ],
    solutionSteps: [
      {
        title: "Step 1: Use dynamic imports with ssr: false for client-only widgets",
        description: "For widgets that strictly rely on client browser state (e.g. geolocation, canvas), disable server rendering.",
        code: "import dynamic from 'next/dynamic';\n\nconst ClientMap = dynamic(() => import('@/components/Map'), {\n  ssr: false,\n  loading: () => <p>Loading map...</p>,\n});",
        language: "tsx"
      }
    ],
    commonMistakes: [
      "Using 'use client' and assuming it completely disables server rendering. Client components in Next.js are still pre-rendered on the server!"
    ],
    preventionTips: [
      "Format dates to a standardized UTC format or use suppressHydrationWarning."
    ],
    faq: [
      {
        question: "Does 'use client' make a component run exclusively on the client?",
        answer: "No, 'use client' merely marks the boundary where client interactivity is enabled; Next.js still pre-renders its initial HTML on the server."
      }
    ],
    relatedErrors: ["react-hydration-error"],
    relatedTutorials: ["react-hooks"]
  },
  {
    title: "Next.js Module Not Found: Can't resolve in app directory",
    description: "Resolve Next.js module resolution issues, broken tsconfig paths, and relative import failures in App Router.",
    slug: "nextjs-module-not-found",
    category: "React",
    tags: ["nextjs", "app-router", "typescript", "imports"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "3 min",
    errorCode: "Module not found: Can't resolve '@/components/Navbar'",
    problem: "Next.js compiler fails during next dev or next build because an imported path cannot be resolved.",
    causes: [
      "Missing or misconfigured 'paths' alias in tsconfig.json.",
      "Deleted or moved file still referenced in an old import statement.",
      "Stale .next build cache directory."
    ],
    solutionSteps: [
      {
        title: "Step 1: Check tsconfig.json path mappings",
        description: "Ensure the '@/*' alias is mapped to the project root.",
        code: "{\n  \"compilerOptions\": {\n    \"baseUrl\": \".\",\n    \"paths\": {\n      \"@/*\": [\"./*\"]\n    }\n  }\n}",
        language: "json"
      },
      {
        title: "Step 2: Clear .next cache and restart",
        description: "Remove corrupted build artifacts.",
        command: "rm -rf .next && npm run dev",
        language: "bash"
      }
    ],
    commonMistakes: [
      "Adding paths to tsconfig.json without setting baseUrl to '.'."
    ],
    preventionTips: [
      "Always rely on consistent path aliases rather than long chains of ../."
    ],
    faq: [
      {
        question: "Can I use multiple path aliases in Next.js?",
        answer: "Yes, you can define aliases like '@components/*': ['components/*'] in tsconfig.json."
      }
    ],
    relatedErrors: ["react-module-not-found"],
    relatedTutorials: ["react-typescript"]
  },
  {
    title: "Next.js Environment Variable Not Working",
    description: "Fix undefined process.env variables in client-side Next.js components by properly prefixing with NEXT_PUBLIC_.",
    slug: "nextjs-environment-variable-not-working",
    category: "React",
    tags: ["nextjs", "environment-variables", "security", "config"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "process.env.API_URL is undefined on the client",
    problem: "An environment variable defined in .env.local works in server components or API routes, but evaluates to undefined in browser client components.",
    causes: [
      "Client-side variables must be prefixed with NEXT_PUBLIC_ for security reasons.",
      "Dynamic variable lookups like process.env[dynamicKey] cannot be inlined by the Next.js compiler.",
      "The Next.js dev server was not restarted after updating the .env file."
    ],
    solutionSteps: [
      {
        title: "Step 1: Add NEXT_PUBLIC_ prefix for client access",
        description: "Prefix any variable meant for browser usage with NEXT_PUBLIC_.",
        code: "# .env.local\nNEXT_PUBLIC_SITE_URL=https://devfixhub.com\nAPI_SECRET_KEY=my-super-secret-key # Keep without prefix (Server only)",
        language: "properties"
      },
      {
        title: "Step 2: Access statically without destructuring",
        description: "Always reference variables explicitly as process.env.NEXT_PUBLIC_VARIABLE.",
        code: "// GOOD:\nconst siteUrl = process.env.NEXT_PUBLIC_SITE_URL;\n\n// BAD (Compiler cannot inline this):\nconst { NEXT_PUBLIC_SITE_URL } = process.env;",
        language: "tsx"
      }
    ],
    commonMistakes: [
      "Exposing database passwords or private API keys with NEXT_PUBLIC_, which leaks them into the public browser bundle."
    ],
    preventionTips: [
      "Use .env.example with dummy values committed to Git, and keep .env.local in .gitignore."
    ],
    faq: [
      {
        question: "Do I need to rebuild Next.js when changing .env?",
        answer: "Yes, environment variables are embedded at build time for client bundles. You must restart next dev or re-run next build."
      }
    ],
    relatedErrors: ["nextjs-module-not-found"],
    relatedTutorials: ["react-typescript"]
  }
];
