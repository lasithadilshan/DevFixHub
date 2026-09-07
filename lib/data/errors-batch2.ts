import { ErrorArticle } from "../types";

export const ERRORS_BATCH_2: ErrorArticle[] = [
  {
    title: "Angular Cannot Find Module",
    description: "Fix error TS2307: Cannot find module '...' or its corresponding type declarations in Angular.",
    slug: "angular-cannot-find-module",
    category: "Angular",
    tags: ["angular", "typescript", "modules", "build"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "error TS2307: Cannot find module './user.service' or its corresponding type declarations.",
    problem: "The Angular TypeScript compiler (ng build or ng serve) cannot locate the referenced service, component, or external npm module.",
    causes: [
      "File path typo or incorrect relative import (e.g. missing ../ traversal).",
      "Missing .ts extension or file renamed without updating imports.",
      "The npm package is not installed or missing from package.json."
    ],
    solutionSteps: [
      {
        title: "Step 1: Check relative file path and casing",
        description: "Verify that the service or component path matches the directory layout exactly.",
        code: "// Check relative directory:\nimport { UserService } from '../services/user.service';",
        language: "typescript"
      },
      {
        title: "Step 2: Install missing package",
        description: "If importing from a library, ensure it is installed in node_modules.",
        command: "npm install @angular/forms --save",
        language: "bash"
      }
    ],
    commonMistakes: [
      "Importing a component file before declaring it in a module or declaring standalone: true."
    ],
    preventionTips: [
      "Use modern Angular Standalone Components (Angular 14+) to simplify imports."
    ],
    faq: [
      {
        question: "Should I include .ts in import statements in Angular?",
        answer: "No, TypeScript expects extensionless imports for .ts and .tsx files."
      }
    ],
    relatedErrors: ["react-module-not-found", "angular-nullinjectorerror"],
    relatedTutorials: ["angular-services"]
  },
  {
    title: "Angular ExpressionChangedAfterItHasBeenCheckedError",
    description: "Resolve NG0100: Expression has changed after it was checked in Angular change detection lifecycle.",
    slug: "angular-expressionchangedafterithasbeencheckederror",
    category: "Angular",
    tags: ["angular", "change-detection", "lifecycle", "rxjs"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "5 min",
    errorCode: "NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'false'. Current value: 'true'.",
    problem: "Angular's development mode performs a second change detection pass to ensure data stability, and detected that a component property mutated after the template was rendered.",
    causes: [
      "Mutating bound component properties inside ngAfterViewInit() or ngAfterViewChecked().",
      "Synchronous EventEmitter emit within child component lifecycle hooks.",
      "Modifying shared service state during view rendering."
    ],
    solutionSteps: [
      {
        title: "Step 1: Move mutations to ngOnInit()",
        description: "Initialize state earlier in the component lifecycle before view rendering begins.",
        code: "// BAD:\nngAfterViewInit() {\n  this.isLoading = false;\n}\n\n// GOOD:\nngOnInit() {\n  this.isLoading = false;\n}",
        language: "typescript"
      },
      {
        title: "Step 2: Use ChangeDetectorRef.detectChanges()",
        description: "Manually inform Angular to re-evaluate the view if an update is unavoidably deferred.",
        code: "constructor(private cdr: ChangeDetectorRef) {}\n\nngAfterViewInit() {\n  this.title = 'Updated Title';\n  this.cdr.detectChanges();\n}",
        language: "typescript"
      },
      {
        title: "Step 3: Defer update with Promise.resolve() or setTimeout",
        description: "Queue the state mutation to the next JavaScript event loop macrotask.",
        code: "ngAfterViewInit() {\n  Promise.resolve().then(() => {\n    this.isLoading = false;\n  });\n}",
        language: "typescript"
      }
    ],
    commonMistakes: [
      "Relying on setTimeout everywhere instead of structuring component data flow with RxJS signals or OnPush change detection."
    ],
    preventionTips: [
      "Use ChangeDetectionStrategy.OnPush and Angular Signals (Angular 16+) for predictable unidirectional data flow."
    ],
    faq: [
      {
        question: "Why does this error only appear in development mode?",
        answer: "Angular runs change detection twice in dev mode specifically to catch unintended side effects. In production, the second check is disabled."
      }
    ],
    relatedErrors: ["angular-nullinjectorerror"],
    relatedTutorials: ["angular-services"]
  },
  {
    title: "Angular NullInjectorError: No provider for Service",
    description: "Fix NullInjectorError: R3InjectorError(AppModule)[MyService -> MyService] by providing services properly.",
    slug: "angular-nullinjectorerror",
    category: "Angular",
    tags: ["angular", "dependency-injection", "injector", "services"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "NullInjectorError: No provider for HttpClient! (UserService -> HttpClient)",
    problem: "An injected service or token cannot be resolved because it was not provided in the root injector or module providers array.",
    causes: [
      "Using HttpClient without importing provideHttpClient() or HttpClientModule.",
      "The service class is missing the @Injectable({ providedIn: 'root' }) decorator.",
      "In standalone components, forgetting to add the service to the providers array."
    ],
    solutionSteps: [
      {
        title: "Step 1: Add providedIn: 'root' to your service",
        description: "Ensure the service registers itself in the application root injector.",
        code: "@Injectable({\n  providedIn: 'root'\n})\nexport class UserService {\n  // Service code\n}",
        language: "typescript"
      },
      {
        title: "Step 2: Provide HttpClient in app.config.ts",
        description: "For modern Angular apps, provide the HTTP client in ApplicationConfig.",
        code: "// app.config.ts\nimport { ApplicationConfig } from '@angular/core';\nimport { provideHttpClient } from '@angular/common/http';\n\nexport const appConfig: ApplicationConfig = {\n  providers: [\n    provideHttpClient()\n  ]\n};",
        language: "typescript"
      }
    ],
    commonMistakes: [
      "Providing a service in both a child component and root, causing duplicate instances with disconnected state."
    ],
    preventionTips: [
      "Default to providedIn: 'root' for all singleton data services."
    ],
    faq: [
      {
        question: "What is the difference between provideHttpClient() and HttpClientModule?",
        answer: "HttpClientModule is the legacy NgModule approach. provideHttpClient() is the modern standalone function recommended in Angular 15+."
      }
    ],
    relatedErrors: ["angular-cannot-find-module"],
    relatedTutorials: ["angular-http-client", "angular-services"]
  },
  {
    title: "Angular CORS Error on API Requests",
    description: "Solve 'Access to XMLHttpRequest has been blocked by CORS policy' in Angular using proxy.conf.json.",
    slug: "angular-cors-error",
    category: "Angular",
    tags: ["angular", "cors", "http-client", "proxy"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "Access to XMLHttpRequest at 'http://localhost:8080/api' from origin 'http://localhost:4200' has been blocked by CORS policy",
    problem: "The browser blocks Angular HTTP requests because the frontend dev server (port 4200) and backend API (port 8080) have different origins.",
    causes: [
      "Backend server has not enabled CORS headers for http://localhost:4200.",
      "Browser enforces the Same-Origin Policy (SOP).",
      "Directly calling backend port from frontend without a dev proxy."
    ],
    solutionSteps: [
      {
        title: "Step 1: Create proxy.conf.json in Angular project root",
        description: "Configure the Angular CLI development server to proxy /api requests to the backend.",
        code: "{\n  \"/api\": {\n    \"target\": \"http://localhost:8080\",\n    \"secure\": false,\n    \"changeOrigin\": true,\n    \"logLevel\": \"debug\"\n  }\n}",
        language: "json"
      },
      {
        title: "Step 2: Tell Angular CLI to use the proxy",
        description: "Add the proxyConfig option to angular.json under serve -> options.",
        code: "\"serve\": {\n  \"builder\": \"@angular-devkit/build-angular:dev-server\",\n  \"options\": {\n    \"proxyConfig\": \"proxy.conf.json\"\n  }\n}",
        language: "json"
      },
      {
        title: "Step 3: Call relative paths in Angular services",
        description: "Do not hardcode http://localhost:8080; use relative paths like /api/users.",
        code: "this.http.get<User[]>('/api/users');",
        language: "typescript"
      }
    ],
    commonMistakes: [
      "Hardcoding full localhost:8080 URLs in HttpClient, which bypasses the Angular dev proxy entirely."
    ],
    preventionTips: [
      "Use environment.ts for environment-specific base URLs."
    ],
    faq: [
      {
        question: "Does proxy.conf.json work in production?",
        answer: "No, proxy.conf.json is strictly for the local Angular development server. In production, configure Nginx, Caddy, or your backend to handle CORS."
      }
    ],
    relatedErrors: ["cors-policy-error", "express-cors-error"],
    relatedTutorials: ["angular-http-client"]
  },
  {
    title: "Angular npm install Error: ERESOLVE unable to resolve dependency tree",
    description: "Fix peer dependency version mismatches when installing Angular packages with npm.",
    slug: "angular-npm-install-error",
    category: "Angular",
    tags: ["angular", "npm", "dependencies", "build"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "3 min",
    errorCode: "npm ERR! ERESOLVE unable to resolve dependency tree",
    problem: "npm install fails because an external Angular library expects an older major version of @angular/core than what is currently installed.",
    causes: [
      "The third-party library has not yet published updates for the latest Angular major version.",
      "Strict peer dependency enforcement introduced in npm v7+."
    ],
    solutionSteps: [
      {
        title: "Step 1: Install with --legacy-peer-deps",
        description: "Bypass strict peer dependency resolution if the library is known to work.",
        command: "npm install --legacy-peer-deps",
        language: "bash"
      },
      {
        title: "Step 2: Update Angular dependencies using ng update",
        description: "Use Angular CLI's official migration tool to upgrade packages together.",
        command: "ng update @angular/core @angular/cli",
        language: "bash"
      }
    ],
    commonMistakes: [
      "Using --force instead of --legacy-peer-deps, which can introduce corrupted dependency trees."
    ],
    preventionTips: [
      "Check Angular compatibility matrices on npm before installing community UI packages."
    ],
    faq: [
      {
        question: "What does --legacy-peer-deps actually do?",
        answer: "It restores npm v4-v6 behavior, ignoring peer dependencies when installing packages."
      }
    ],
    relatedErrors: ["npm-dependency-conflict"],
    relatedTutorials: ["angular-services"]
  },
  {
    title: "Node.js Port Already in Use (Error: listen EADDRINUSE)",
    description: "Fix Error: listen EADDRINUSE: address already in use :::3000 in Node.js and Express servers.",
    slug: "nodejs-port-already-in-use",
    category: "Node.js",
    tags: ["nodejs", "express", "networking", "ports"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "3 min",
    errorCode: "Error: listen EADDRINUSE: address already in use :::3000",
    problem: "A Node.js or Express HTTP server fails to bind to the requested port because another process is already listening on that port.",
    causes: [
      "A previous node server crashed or was stopped in the background without freeing the socket.",
      "Another dev server (Next.js, React, or Docker) is running on port 3000.",
      "nodemon spawned multiple orphan worker processes."
    ],
    solutionSteps: [
      {
        title: "Step 1: Find process running on port 3000",
        description: "Locate the PID listening on the port.",
        command: "lsof -i :3000\n# On Windows: netstat -ano | findstr :3000",
        language: "bash"
      },
      {
        title: "Step 2: Kill the orphan process",
        description: "Terminate the process by PID.",
        command: "kill -9 <PID>\n# Or kill all node processes:\nkillall node\n# Windows: taskkill /F /IM node.exe",
        language: "bash"
      },
      {
        title: "Step 3: Make port configurable in code",
        description: "Allow dynamic fallback port selection in Express.",
        code: "const PORT = process.env.PORT || 3001;\napp.listen(PORT, () => console.log(`Server running on port ${PORT}`));",
        language: "javascript"
      }
    ],
    commonMistakes: [
      "Hardcoding port 3000 instead of checking process.env.PORT."
    ],
    preventionTips: [
      "Add graceful SIGINT / SIGTERM shutdown handlers to close server sockets cleanly."
    ],
    faq: [
      {
        question: "How can I automatically find an open port in Node.js?",
        answer: "Listen on port 0 (server.listen(0)), which instructs the OS to assign an unused ephemeral port."
      }
    ],
    relatedErrors: ["spring-boot-port-8080-already-in-use", "docker-port-already-allocated"],
    relatedTutorials: ["nodejs-rest-api"]
  },
  {
    title: "Node.js Cannot Find Module (Error: MODULE_NOT_FOUND)",
    description: "Troubleshoot Error: Cannot find module '...' in Node.js applications and ES modules.",
    slug: "nodejs-cannot-find-module",
    category: "Node.js",
    tags: ["nodejs", "npm", "commonjs", "esm"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "Error: Cannot find module 'express'\nRequire stack:\n- /app/server.js",
    problem: "Node.js runtime cannot find the requested package in node_modules or cannot resolve the specified file path.",
    causes: [
      "Forgot to run npm install after cloning or switching git branches.",
      "CommonJS vs ES Module extension mismatch (missing .js extension in ESM import).",
      "File name casing mismatch between local dev and production server."
    ],
    solutionSteps: [
      {
        title: "Step 1: Run clean npm install",
        description: "Ensure all dependencies in package.json are downloaded.",
        command: "npm install",
        language: "bash"
      },
      {
        title: "Step 2: Add .js extension for native ES Modules",
        description: "If your package.json has 'type': 'module', native Node.js requires explicit file extensions.",
        code: "// BAD in Node ESM:\nimport { helper } from './utils';\n\n// GOOD:\nimport { helper } from './utils.js';",
        language: "javascript"
      }
    ],
    commonMistakes: [
      "Assuming node_modules resolves globally when dependencies were installed locally."
    ],
    preventionTips: [
      "Always commit package-lock.json to ensure deterministic installs."
    ],
    faq: [
      {
        question: "Why does Node.js ESM require file extensions while Webpack doesn't?",
        answer: "Node.js follows the Web/URL spec for ESM resolution to avoid costly filesystem probing on every import."
      }
    ],
    relatedErrors: ["react-module-not-found"],
    relatedTutorials: ["nodejs-rest-api"]
  },
  {
    title: "npm EACCES Permission Error",
    description: "Fix npm ERR! code EACCES: permission denied when installing packages globally or modifying directories.",
    slug: "npm-eacces-permission-error",
    category: "Node.js",
    tags: ["npm", "permissions", "linux", "macos"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "3 min",
    errorCode: "npm ERR! code EACCES\nnpm ERR! syscall access\nnpm ERR! path /usr/local/lib/node_modules",
    problem: "npm cannot write to the global directory or project directory because the current user lacks write permissions.",
    causes: [
      "Installing global packages (npm install -g) into root-owned /usr/local without write access.",
      "Running npm with sudo previously, creating root-owned files in ~/.npm.",
      "Corrupted folder permissions in local node_modules."
    ],
    solutionSteps: [
      {
        title: "Step 1: Configure npm to use a directory in your user home",
        description: "Recommended by npm: redirect global installs to a directory owned by your user account.",
        command: "mkdir ~/.npm-global\nnpm config set prefix '~/.npm-global'\nexport PATH=~/.npm-global/bin:$PATH",
        language: "bash"
      },
      {
        title: "Step 2: Fix ownership of ~/.npm cache directory",
        description: "Reclaim ownership of your npm cache from root.",
        command: "sudo chown -R $(whoami) ~/.npm",
        language: "bash"
      }
    ],
    commonMistakes: [
      "Using 'sudo npm install' as a workaround, which creates security risks and perpetuates permission errors."
    ],
    preventionTips: [
      "Use Node Version Manager (nvm) or fnm; they automatically install Node and npm into user space."
    ],
    faq: [
      {
        question: "Should I ever run npm with sudo?",
        answer: "Never. Running npm with sudo can allow malicious package install scripts to execute with root system privileges."
      }
    ],
    relatedErrors: ["npm-dependency-conflict"],
    relatedTutorials: ["nodejs-rest-api"]
  },
  {
    title: "npm Dependency Conflict: ERESOLVE unable to resolve dependency tree",
    description: "Troubleshoot npm peer dependency conflicts, conflicting version constraints, and package-lock issues.",
    slug: "npm-dependency-conflict",
    category: "Node.js",
    tags: ["npm", "dependencies", "build", "javascript"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "npm ERR! code ERESOLVE\nnpm ERR! ERESOLVE unable to resolve dependency tree",
    problem: "Two packages in your dependency tree require incompatible peer dependency versions of the same library (e.g. React 18 vs React 19).",
    causes: [
      "Upgraded a root package while third-party plugins still specify an older peerDependency range.",
      "npm v7+ strict peer dependency enforcement algorithm."
    ],
    solutionSteps: [
      {
        title: "Step 1: Run with --legacy-peer-deps",
        description: "Bypass strict peer dependency locking if the package functions properly.",
        command: "npm install --legacy-peer-deps",
        language: "bash"
      },
      {
        title: "Step 2: Use npm overrides in package.json",
        description: "Force all child dependencies to accept a specific unified version of the conflicting package.",
        code: "{\n  \"dependencies\": {\n    \"react\": \"^19.0.0\"\n  },\n  \"overrides\": {\n    \"react\": \"^19.0.0\"\n  }\n}",
        language: "json"
      }
    ],
    commonMistakes: [
      "Deleting package-lock.json and running npm install, which can pull breaking minor/patch updates across all dependencies."
    ],
    preventionTips: [
      "Audit outdated packages regularly using 'npm outdated'."
    ],
    faq: [
      {
        question: "What is the difference between dependencies and peerDependencies?",
        answer: "dependencies are installed privately inside a library. peerDependencies require the consumer application to provide the shared dependency instance."
      }
    ],
    relatedErrors: ["angular-npm-install-error"],
    relatedTutorials: ["nodejs-rest-api"]
  },
  {
    title: "Express CORS Error: No Access-Control-Allow-Origin",
    description: "Fix 'No 'Access-Control-Allow-Origin' header is present on the requested resource' in Express.js backends.",
    slug: "express-cors-error",
    category: "Node.js",
    tags: ["express", "cors", "api", "nodejs"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "Access to fetch at 'http://localhost:5000/api' from origin 'http://localhost:3000' has been blocked by CORS policy",
    problem: "The client browser refuses to share the response from the Express server because the server did not include CORS headers.",
    causes: [
      "The cors npm package is not installed or not registered as Express middleware.",
      "CORS middleware placed after route handlers instead of before them.",
      "Missing options for credentials (cookies/auth headers)."
    ],
    solutionSteps: [
      {
        title: "Step 1: Install and configure cors middleware",
        description: "Register the cors middleware at the top of your Express app.",
        command: "npm install cors",
        language: "bash"
      },
      {
        title: "Step 2: Enable CORS for your specific frontend origin",
        description: "Configure allowed origins, HTTP methods, and credentials.",
        code: "const express = require('express');\nconst cors = require('cors');\nconst app = express();\n\nconst corsOptions = {\n  origin: ['http://localhost:3000', 'https://devfixhub.com'],\n  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],\n  allowedHeaders: ['Content-Type', 'Authorization'],\n  credentials: true\n};\n\n// MUST be declared BEFORE routes\napp.use(cors(corsOptions));\n\napp.get('/api/data', (req, res) => {\n  res.json({ message: 'Success' });\n});",
        language: "javascript"
      }
    ],
    commonMistakes: [
      "Placing app.use(cors()) after app.use('/api', routes), rendering the middleware completely ineffective.",
      "Using origin: '*' while setting credentials: true, which is forbidden by browser security specifications."
    ],
    preventionTips: [
      "Always handle HTTP OPTIONS preflight requests."
    ],
    faq: [
      {
        question: "Can I use wildcard origin '*' with authentication cookies?",
        answer: "No. The Fetch specification strictly forbids Access-Control-Allow-Origin: * when Access-Control-Allow-Credentials is true."
      }
    ],
    relatedErrors: ["cors-policy-error", "angular-cors-error"],
    relatedTutorials: ["expressjs-authentication", "nodejs-rest-api"]
  },
  {
    title: "Python ModuleNotFoundError: No module named 'xyz'",
    description: "Fix ModuleNotFoundError: No module named in Python virtual environments and scripts.",
    slug: "python-modulenotfounderror",
    category: "Python",
    tags: ["python", "venv", "pip", "modules"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "ModuleNotFoundError: No module named 'requests'",
    problem: "Python interpreter cannot find the imported library in the active sys.path or site-packages directory.",
    causes: [
      "The package was installed in a different Python version or virtual environment than the one executing the script.",
      "The virtual environment is not activated in the terminal.",
      "The script filename collides with the module name (e.g. naming your file requests.py)."
    ],
    solutionSteps: [
      {
        title: "Step 1: Check active Python interpreter and install package",
        description: "Ensure pip is executing for the exact Python binary running your script.",
        command: "python3 -m pip install requests",
        language: "bash"
      },
      {
        title: "Step 2: Verify virtual environment activation",
        description: "Activate your project virtual environment before running code.",
        command: "source venv/bin/activate\n# On Windows: venv\\Scripts\\activate\npython app.py",
        language: "bash"
      }
    ],
    commonMistakes: [
      "Running 'pip install' without realizing pip points to system Python 3.9 while the IDE is running Python 3.12.",
      "Naming a local script email.py, math.py, or requests.py, shadowing the standard library."
    ],
    preventionTips: [
      "Always run 'python -m pip install' to guarantee packages are installed to the active interpreter."
    ],
    faq: [
      {
        question: "How do I check which Python environment is active?",
        answer: "Run 'which python' (macOS/Linux) or 'where python' (Windows), or print sys.executable inside Python."
      }
    ],
    relatedErrors: ["python-importerror"],
    relatedTutorials: ["python-virtual-environments"]
  },
  {
    title: "Python ImportError: cannot import name 'xyz' from partially initialized module",
    description: "Solve circular imports and circular dependencies in Python packages and modules.",
    slug: "python-importerror",
    category: "Python",
    tags: ["python", "circular-import", "architecture", "debugging"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "ImportError: cannot import name 'User' from partially initialized module 'models' (most likely due to a circular import)",
    problem: "Python encounters a circular import where module A imports from module B while module B is simultaneously attempting to import from module A before module A has finished initializing.",
    causes: [
      "Two files import each other at the top level of the module.",
      "A local file shares the same name as a third-party library or built-in module."
    ],
    solutionSteps: [
      {
        title: "Step 1: Move import inside the function (local import)",
        description: "Defer the import until runtime when both modules have completed initialization.",
        code: "# In models.py:\ndef get_user_orders(user_id):\n    # Defer import to function execution time\n    from orders import Order\n    return Order.query.filter_by(user_id=user_id).all()",
        language: "python"
      },
      {
        title: "Step 2: Refactor shared dependencies into a third module",
        description: "Extract common models or types into a base common.py or types.py file.",
        code: "# shared_types.py\nclass User:\n    pass\n\nclass Order:\n    pass",
        language: "python"
      }
    ],
    commonMistakes: [
      "Using 'from module import *', which obscures circular dependencies and pollutes the namespace."
    ],
    preventionTips: [
      "Use TYPE_CHECKING from typing module for type hints without runtime import overhead."
    ],
    faq: [
      {
        question: "How does TYPE_CHECKING avoid circular imports?",
        answer: "Imports inside 'if TYPE_CHECKING:' are only analyzed by static type checkers (like Mypy) and are never executed at runtime."
      }
    ],
    relatedErrors: ["python-modulenotfounderror"],
    relatedTutorials: ["python-virtual-environments"]
  },
  {
    title: "Python IndentationError: unexpected indent",
    description: "Fix IndentationError and TabError: inconsistent use of tabs and spaces in Python scripts.",
    slug: "python-indentationerror",
    category: "Python",
    tags: ["python", "syntax", "formatting", "pep8"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "3 min",
    errorCode: "IndentationError: unexpected indent / TabError: inconsistent use of tabs and spaces in indentation",
    problem: "Python code execution halts because the indentation level does not match the preceding block or mixes physical tabs and spaces.",
    causes: [
      "Mixing tabs and spaces in the same source file.",
      "Copying code from a website or chat with unexpected whitespace characters.",
      "Forgetting to indent the block following an if, for, while, def, or class statement."
    ],
    solutionSteps: [
      {
        title: "Step 1: Convert all indentation to 4 spaces",
        description: "Configure your editor to insert 4 spaces when pressing Tab.",
        command: "# Automatically reformat files using Black\npip install black\nblack script.py",
        language: "bash"
      },
      {
        title: "Step 2: Inspect whitespace characters",
        description: "Run Python with the -tt flag to report mixed tabs and spaces.",
        command: "python3 -m tabnanny script.py",
        language: "bash"
      }
    ],
    commonMistakes: [
      "Using single space or uneven indentation inside the same function block."
    ],
    preventionTips: [
      "Enable 'Render Whitespace' in VS Code to see dots for spaces and arrows for tabs."
    ],
    faq: [
      {
        question: "Does Python PEP 8 mandate spaces over tabs?",
        answer: "Yes, PEP 8 strictly specifies 4 spaces per indentation level and forbids mixing tabs and spaces."
      }
    ],
    relatedErrors: ["python-typeerror"],
    relatedTutorials: ["python-virtual-environments"]
  },
  {
    title: "Python KeyError in Dictionary Access",
    description: "Handle KeyError exceptions safely using dict.get(), setdefault(), or collections.defaultdict.",
    slug: "python-keyerror",
    category: "Python",
    tags: ["python", "dictionaries", "data-structures", "exceptions"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "3 min",
    errorCode: "KeyError: 'email'",
    problem: "The program attempts to access a dictionary key using square brackets (data['email']) that does not exist in the dictionary.",
    causes: [
      "Accessing optional fields from API JSON payloads without verifying key existence.",
      "Typo in key string name or casing mismatch."
    ],
    solutionSteps: [
      {
        title: "Step 1: Use dict.get() with default fallback",
        description: "get() returns None or your custom default rather than raising KeyError.",
        code: "# BAD:\nemail = user['email'] # Raises KeyError if missing\n\n# GOOD:\nemail = user.get('email', 'not-provided@domain.com')",
        language: "python"
      },
      {
        title: "Step 2: Use collections.defaultdict",
        description: "Automatically initialize missing keys with a default factory.",
        code: "from collections import defaultdict\n\ncounts = defaultdict(int)\nfor word in words:\n    counts[word] += 1 # Never raises KeyError",
        language: "python"
      }
    ],
    commonMistakes: [
      "Using try/except KeyError for routine control flow instead of using .get()."
    ],
    preventionTips: [
      "Use Pydantic models for incoming JSON payloads to ensure schema validation."
    ],
    faq: [
      {
        question: "What is the difference between dict[key] and dict.get(key)?",
        answer: "dict[key] throws a KeyError if the key is absent. dict.get(key) returns None (or an optional fallback value) safely."
      }
    ],
    relatedErrors: ["fastapi-422-unprocessable-entity"],
    relatedTutorials: ["python-json-processing"],
    relatedTools: ["json-validator"]
  },
  {
    title: "Python TypeError: object is not subscriptable",
    description: "Fix 'TypeError: 'NoneType' object is not subscriptable' and argument type errors in Python.",
    slug: "python-typeerror",
    category: "Python",
    tags: ["python", "types", "typeerror", "debugging"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "TypeError: 'NoneType' object is not subscriptable",
    problem: "The program uses indexing or key access (obj[0] or obj['key']) on an object that does not support indexing, most commonly None.",
    causes: [
      "A function that returns None by default (e.g. missing return statement) was assigned to a variable.",
      "A database query returned None because no matching record was found."
    ],
    solutionSteps: [
      {
        title: "Step 1: Verify object is not None before subscripting",
        description: "Add an explicit check before accessing indices.",
        code: "result = find_user(42)\nif result is not None:\n    print(result['username'])\nelse:\n    print('User not found')",
        language: "python"
      }
    ],
    commonMistakes: [
      "Calling list.sort() and expecting it to return a new list. list.sort() sorts in-place and returns None!"
    ],
    preventionTips: [
      "Run Mypy static type checking across your Python project."
    ],
    faq: [
      {
        question: "Why did list.append() make my variable None?",
        answer: "list.append() modifies the list in-place and returns None. If you do x = my_list.append(1), x will be None."
      }
    ],
    relatedErrors: ["python-keyerror", "react-cannot-read-properties-of-undefined"],
    relatedTutorials: ["python-json-processing"]
  },
  {
    title: "FastAPI 422 Unprocessable Entity",
    description: "Understand and fix HTTP 422 validation errors generated by Pydantic request body validations in FastAPI.",
    slug: "fastapi-422-unprocessable-entity",
    category: "Python",
    tags: ["fastapi", "pydantic", "rest-api", "validation"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "HTTP/1.1 422 Unprocessable Entity\n{\"detail\": [{\"loc\": [\"body\", \"email\"], \"msg\": \"field required\", \"type\": \"value_error.missing\"}]}",
    problem: "FastAPI automatically rejects the client HTTP request because the JSON body, query parameter, or path variable failed Pydantic schema validation.",
    causes: [
      "Missing a required field in the JSON payload sent by the frontend.",
      "Data type mismatch (e.g. sending a string 'hello' for an integer id field).",
      "Forgetting to set the 'Content-Type: application/json' header in the client request."
    ],
    solutionSteps: [
      {
        title: "Step 1: Inspect the exact detail array in the 422 response",
        description: "FastAPI tells you the exact field and error in the 'detail' JSON array.",
        command: "curl -X POST http://localhost:8000/items -H 'Content-Type: application/json' -d '{\"title\": \"Item 1\", \"price\": 19.99}'",
        language: "bash"
      },
      {
        title: "Step 2: Make fields optional in Pydantic schema if not required",
        description: "Use Optional[T] = None in Pydantic models for non-mandatory fields.",
        code: "from pydantic import BaseModel\nfrom typing import Optional\n\nclass ItemCreate(BaseModel):\n    name: str\n    description: Optional[str] = None # Optional field\n    price: float",
        language: "python"
      }
    ],
    commonMistakes: [
      "Sending payload as form-data instead of JSON when the endpoint expects a Pydantic model body."
    ],
    preventionTips: [
      "Use FastAPI's interactive Swagger UI at /docs to test request schemas directly."
    ],
    faq: [
      {
        question: "What is the difference between 400 Bad Request and 422 Unprocessable Entity?",
        answer: "400 indicates malformed syntax (e.g. invalid JSON). 422 indicates the syntax is valid JSON, but the data violates semantic validation rules."
      }
    ],
    relatedErrors: ["python-keyerror"],
    relatedTutorials: ["build-rest-api-with-fastapi"]
  },
  {
    title: "Docker Port Already Allocated",
    description: "Fix 'Error response from daemon: driver failed programming external connectivity on endpoint: Bind for 0.0.0.0:xxxx failed: port is already allocated'.",
    slug: "docker-port-already-allocated",
    category: "Docker",
    tags: ["docker", "networking", "containers", "ports"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "docker: Error response from daemon: driver failed programming external connectivity on endpoint: Bind for 0.0.0.0:8080 failed: port is already allocated.",
    problem: "Docker daemon cannot bind the container port to the host port because the host port is currently in use by another container or local application.",
    causes: [
      "Another Docker container is already running with the same host port mapping.",
      "A native host service (Apache, Nginx, PostgreSQL, or local Node/Java app) is listening on that port.",
      "Docker Desktop virtual network interface hung."
    ],
    solutionSteps: [
      {
        title: "Step 1: Check running Docker containers",
        description: "List all active containers to locate the port conflict.",
        command: "docker ps --filter \"publish=8080\"",
        language: "bash"
      },
      {
        title: "Step 2: Stop the conflicting container",
        description: "Stop the container using its container ID or name.",
        command: "docker stop <container_id_or_name>",
        language: "bash"
      },
      {
        title: "Step 3: Map to a different host port",
        description: "Change the host side of the -p host_port:container_port mapping.",
        command: "docker run -p 8081:8080 my-image",
        language: "bash"
      }
    ],
    commonMistakes: [
      "Stopping a container without realizing docker-compose restart policy restarts it automatically."
    ],
    preventionTips: [
      "Use environment variables in docker-compose.yml for configurable host ports (e.g. ${APP_PORT:-8080}:8080)."
    ],
    faq: [
      {
        question: "Does -p 8081:8080 change the port inside the container?",
        answer: "No. The application inside the container still listens on 8080. Only the external host entrypoint is routed through 8081."
      }
    ],
    relatedErrors: ["spring-boot-port-8080-already-in-use", "nodejs-port-already-in-use"],
    relatedTutorials: ["docker-beginner-guide", "docker-compose"]
  }
];
