import { ErrorArticle } from "../types";

export const ERRORS_BATCH_3: ErrorArticle[] = [
  {
    title: "Docker Container Exited (Code 0 or 137)",
    description: "Diagnose why Docker containers exit immediately after starting, covering foreground commands and OOM kills.",
    slug: "docker-container-exited",
    category: "Docker",
    tags: ["docker", "containers", "debugging", "devops"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "5 min",
    errorCode: "Exited (0) 2 seconds ago / Exited (137) Out Of Memory",
    problem: "A Docker container starts and immediately terminates instead of running continuously as a background daemon.",
    causes: [
      "PID 1 process terminated because the command executed in the background or completed immediately.",
      "Exit code 137: The Linux kernel Out-Of-Memory (OOM) Killer terminated the container for exceeding memory limits.",
      "Fatal application crash during initialization (bad database connection, missing config)."
    ],
    solutionSteps: [
      {
        title: "Step 1: Check container logs",
        description: "View the standard output and error stream before termination.",
        command: "docker logs <container_id_or_name>",
        language: "bash"
      },
      {
        title: "Step 2: Keep container alive with foreground process",
        description: "Docker requires PID 1 to stay in the foreground. Never use daemonize flags inside Dockerfiles.",
        code: "# In Dockerfile - BAD:\nCMD service nginx start\n\n# GOOD:\nCMD [\"nginx\", \"-g\", \"daemon off;\"]",
        language: "dockerfile"
      },
      {
        title: "Step 3: Increase container memory limit for Exit 137",
        description: "If exit code is 137, allocate more RAM to the container.",
        command: "docker run -m 2g --memory-swap 2g my-image",
        language: "bash"
      }
    ],
    commonMistakes: [
      "Running 'docker run -d my-image bash' without '-it', which exits immediately because stdin is closed."
    ],
    preventionTips: [
      "Always configure healthchecks in your Dockerfiles and docker-compose files."
    ],
    faq: [
      {
        question: "What does Exit Code 137 mean?",
        answer: "137 indicates the container received signal 9 (SIGKILL) from the operating system (128 + 9 = 137), typically due to an Out of Memory (OOM) event."
      }
    ],
    relatedErrors: ["docker-port-already-allocated", "kubernetes-crashloopbackoff"],
    relatedTutorials: ["docker-beginner-guide", "docker-compose"]
  },
  {
    title: "Docker Image Not Found Error",
    description: "Fix 'Error response from daemon: pull access denied for xyz, repository does not exist or may require docker login'.",
    slug: "docker-image-not-found",
    category: "Docker",
    tags: ["docker", "docker-hub", "registry", "images"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "3 min",
    errorCode: "Error response from daemon: pull access denied for my-private-repo/app, repository does not exist or may require 'docker login'",
    problem: "Docker client cannot pull the requested image from Docker Hub or a private registry.",
    causes: [
      "Typo in image name, namespace, or tag.",
      "The image resides in a private registry and you are not authenticated.",
      "The tag has been deprecated or deleted."
    ],
    solutionSteps: [
      {
        title: "Step 1: Authenticate with docker login",
        description: "Log into the registry before pulling private images.",
        command: "docker login",
        language: "bash"
      },
      {
        title: "Step 2: Verify exact tag on Docker Hub",
        description: "Ensure the tag exists rather than relying on default ':latest'.",
        command: "docker pull node:20-alpine",
        language: "bash"
      }
    ],
    commonMistakes: [
      "Assuming ':latest' always exists for every image on Docker Hub."
    ],
    preventionTips: [
      "Pin explicit image digest or semantic version tags in production."
    ],
    faq: [
      {
        question: "How do I pull from a custom container registry like GitHub (GHCR)?",
        answer: "Prefix the image with the registry host: docker pull ghcr.io/username/image:tag after running docker login ghcr.io."
      }
    ],
    relatedErrors: ["kubernetes-imagepullbackoff"],
    relatedTutorials: ["docker-beginner-guide"]
  },
  {
    title: "Docker Permission Denied: connect to docker daemon socket",
    description: "Fix 'Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock'.",
    slug: "docker-permission-denied",
    category: "Docker",
    tags: ["docker", "linux", "permissions", "security"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "3 min",
    errorCode: "Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock",
    problem: "Non-root Linux users cannot execute docker commands because /var/run/docker.sock is owned by root and the docker group.",
    causes: [
      "The active Linux user account has not been added to the 'docker' user group.",
      "The user group membership has not been reloaded in the current terminal session."
    ],
    solutionSteps: [
      {
        title: "Step 1: Add current user to the docker group",
        description: "Grant your non-root user permission to communicate with the Docker daemon.",
        command: "sudo usermod -aG docker $USER",
        language: "bash"
      },
      {
        title: "Step 2: Apply the new group membership",
        description: "Reload your shell group session without rebooting.",
        command: "newgrp docker\n# Verify with:\ndocker ps",
        language: "bash"
      }
    ],
    commonMistakes: [
      "Prefixing all docker commands with 'sudo', which creates root-owned container bind mount files."
    ],
    preventionTips: [
      "Consider Docker Rootless mode for enterprise multi-user environments."
    ],
    faq: [
      {
        question: "Do I need to log out of Linux after running usermod?",
        answer: "Yes, group memberships update upon logging out and back in, or immediately within a subshell via 'newgrp docker'."
      }
    ],
    relatedErrors: ["npm-eacces-permission-error"],
    relatedTutorials: ["docker-beginner-guide"]
  },
  {
    title: "Docker Build Failed: Exit Code 1",
    description: "Troubleshoot failed docker build steps, caching mistakes, and package manager failures inside Dockerfiles.",
    slug: "docker-build-failed",
    category: "Docker",
    tags: ["docker", "dockerfile", "build", "ci-cd"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "ERROR: executor failed running [/bin/sh -c npm run build]: exit code: 1",
    problem: "A RUN instruction in the Dockerfile returned a non-zero exit code during image compilation.",
    causes: [
      "Compilation error (TypeScript or Babel) during 'npm run build' inside the container.",
      "Missing dependencies or build tools (e.g. python, make, g++) needed for native node-gyp modules.",
      "Cache invalidation issues pulling outdated dependencies."
    ],
    solutionSteps: [
      {
        title: "Step 1: Build with --progress=plain to see full error output",
        description: "Disable BuildKit compressed progress to read the raw compiler stack trace.",
        command: "docker build --no-cache --progress=plain -t my-app .",
        language: "bash"
      },
      {
        title: "Step 2: Use multi-stage builds with proper build tooling",
        description: "Separate build tools from the final slim production runtime image.",
        code: "FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nCOPY --from=builder /app/.next ./.next\nCOPY --from=builder /app/package*.json ./\nRUN npm ci --only=production\nCMD [\"npm\", \"start\"]",
        language: "dockerfile"
      }
    ],
    commonMistakes: [
      "Copying the entire local node_modules directory into the container instead of letting 'npm ci' install fresh inside Linux."
    ],
    preventionTips: [
      "Always create a .dockerignore file excluding node_modules, .git, and build artifacts."
    ],
    faq: [
      {
        question: "Why should I use 'npm ci' instead of 'npm install' in Dockerfiles?",
        answer: "'npm ci' strictly respects package-lock.json and installs dependencies much faster in automated CI/Docker environments."
      }
    ],
    relatedErrors: ["docker-container-exited"],
    relatedTutorials: ["docker-beginner-guide"]
  },
  {
    title: "Docker Compose Service Not Starting",
    description: "Fix container restart loops, dependency order race conditions, and network isolation in docker-compose.",
    slug: "docker-compose-service-not-starting",
    category: "Docker",
    tags: ["docker", "docker-compose", "microservices", "networking"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "ERROR: for service_name Container exited with code 1",
    problem: "A service in docker-compose fails during 'docker compose up' because a dependent service (like PostgreSQL or Redis) is not ready yet.",
    causes: [
      "Application container starts before database container is ready to accept socket connections.",
      "depends_on only waits for container start, not service readiness.",
      "Volume permission conflicts on host-mounted directories."
    ],
    solutionSteps: [
      {
        title: "Step 1: Use depends_on with condition: service_healthy",
        description: "Configure healthchecks so dependent containers wait until the database is truly ready.",
        code: "version: '3.8'\nservices:\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_PASSWORD: secret\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]\n      interval: 5s\n      timeout: 5s\n      retries: 5\n\n  app:\n    build: .\n    depends_on:\n      db:\n        condition: service_healthy",
        language: "yaml"
      }
    ],
    commonMistakes: [
      "Relying on standard depends_on: ['db'] and assuming PostgreSQL is immediately listening for queries."
    ],
    preventionTips: [
      "Implement retry loops in application database connection startup logic."
    ],
    faq: [
      {
        question: "What command lets me view logs across all compose services together?",
        answer: "Run 'docker compose logs -f' to stream interleaved logs from all services in real time."
      }
    ],
    relatedErrors: ["docker-port-already-allocated"],
    relatedTutorials: ["docker-compose"]
  },
  {
    title: "Kubernetes CrashLoopBackOff",
    description: "Fix Pod CrashLoopBackOff errors caused by application exceptions, failed liveness probes, or OOMKilled events.",
    slug: "kubernetes-crashloopbackoff",
    category: "Kubernetes",
    tags: ["kubernetes", "pods", "debugging", "devops"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "5 min",
    errorCode: "NAME READY STATUS RESTARTS AGE\napi-pod 0/1 CrashLoopBackOff 5 3m",
    problem: "Kubernetes continuously attempts to restart a pod container that repeatedly crashes after launching.",
    causes: [
      "Application throws an unhandled exception or missing environment variable on startup.",
      "Liveness or readiness probe points to an incorrect endpoint or has too short a timeout.",
      "Container exceeded memory limit and was terminated with OOMKilled."
    ],
    solutionSteps: [
      {
        title: "Step 1: Inspect pod events with kubectl describe",
        description: "Check the Last State, Exit Code, and Recent Events section.",
        command: "kubectl describe pod <pod-name>",
        language: "bash"
      },
      {
        title: "Step 2: Read logs from the previously crashed container",
        description: "Use the --previous flag to inspect the log output right before the crash.",
        command: "kubectl logs <pod-name> --previous",
        language: "bash"
      },
      {
        title: "Step 3: Tune liveness probe initialDelaySeconds",
        description: "Give slower JVM or Node apps adequate warm-up time before probes begin.",
        code: "livenessProbe:\n  httpGet:\n    path: /actuator/health/liveness\n    port: 8080\n  initialDelaySeconds: 30\n  periodSeconds: 10",
        language: "yaml"
      }
    ],
    commonMistakes: [
      "Running 'kubectl logs <pod-name>' without '--previous', which only shows logs of the currently restarting empty container."
    ],
    preventionTips: [
      "Always set realistic resources.requests and resources.limits in pod specifications."
    ],
    faq: [
      {
        question: "What is the backoff exponential timing in CrashLoopBackOff?",
        answer: "Kubernetes delays restarts exponentially: 10s, 20s, 40s, up to a maximum delay of 300 seconds (5 minutes)."
      }
    ],
    relatedErrors: ["kubernetes-pod-pending", "docker-container-exited"],
    relatedTutorials: ["kubernetes-beginner-guide", "kubernetes-deployment"]
  },
  {
    title: "Kubernetes ImagePullBackOff and ErrImagePull",
    description: "Troubleshoot ImagePullBackOff caused by invalid image tags, authentication secrets, or network timeouts.",
    slug: "kubernetes-imagepullbackoff",
    category: "Kubernetes",
    tags: ["kubernetes", "docker-registry", "devops", "pods"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "NAME READY STATUS RESTARTS AGE\nweb-pod 0/1 ImagePullBackOff 0 2m",
    problem: "The Kubelet agent on the cluster worker node cannot download the specified container image.",
    causes: [
      "The container image tag does not exist in the registry.",
      "Private registry authentication secret (imagePullSecrets) is missing or has expired credentials.",
      "Node networking or firewall blocks communication with the container registry."
    ],
    solutionSteps: [
      {
        title: "Step 1: Describe the pod to see the exact pull failure reason",
        description: "Check the Events list at the bottom of the output.",
        command: "kubectl describe pod <pod-name>",
        language: "bash"
      },
      {
        title: "Step 2: Create and attach an imagePullSecret",
        description: "Generate a docker-registry secret for private registry access.",
        command: "kubectl create secret docker-registry regcred \\\n  --docker-server=https://index.docker.io/v1/ \\\n  --docker-username=<user> \\\n  --docker-password=<token> \\\n  --docker-email=<email>",
        language: "bash"
      },
      {
        title: "Step 3: Reference imagePullSecrets in pod deployment",
        description: "Link the secret in the Deployment spec.",
        code: "spec:\n  imagePullSecrets:\n    - name: regcred\n  containers:\n    - name: web\n      image: myprivate/app:v1.0.0",
        language: "yaml"
      }
    ],
    commonMistakes: [
      "Creating the imagePullSecret in the default namespace while the pod is running in a custom namespace."
    ],
    preventionTips: [
      "Ensure service accounts have default imagePullSecrets pre-configured in multi-tenant clusters."
    ],
    faq: [
      {
        question: "Are secrets namespace-scoped in Kubernetes?",
        answer: "Yes, secrets are strictly scoped to the namespace where they are created."
      }
    ],
    relatedErrors: ["docker-image-not-found"],
    relatedTutorials: ["kubernetes-deployment"]
  },
  {
    title: "Kubernetes Pod Pending: 0/N nodes available",
    description: "Resolve Pods stuck in Pending state due to insufficient CPU/memory, taints, or persistent volume binds.",
    slug: "kubernetes-pod-pending",
    category: "Kubernetes",
    tags: ["kubernetes", "scheduler", "resources", "devops"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "0/3 nodes are available: 3 Insufficient cpu, 3 Insufficient memory.",
    problem: "The Kubernetes Scheduler (kube-scheduler) cannot assign the pod to any node in the cluster.",
    causes: [
      "Cluster nodes lack sufficient unreserved CPU or memory requests to accommodate the pod.",
      "Unmatched NodeSelector, Affinity, or Node Taints.",
      "Unbound PersistentVolumeClaim (PVC) waiting for a storage volume."
    ],
    solutionSteps: [
      {
        title: "Step 1: Check scheduler failure reasons",
        description: "Inspect the scheduling events in describe output.",
        command: "kubectl describe pod <pod-name> | grep -A 10 Events",
        language: "bash"
      },
      {
        title: "Step 2: Lower resource requests if over-allocated",
        description: "Ensure requests reflect realistic baseline requirements, not peak burst limits.",
        code: "resources:\n  requests:\n    memory: \"256Mi\" # Lower from excessive allocation\n    cpu: \"100m\"\n  limits:\n    memory: \"1Gi\"\n    cpu: \"500m\"",
        language: "yaml"
      }
    ],
    commonMistakes: [
      "Setting resources.requests equal to maximum burst limits, exhausting cluster capacity."
    ],
    preventionTips: [
      "Enable cluster autoscaling (Karpenter or Cluster Autoscaler) to automatically provision nodes on demand."
    ],
    faq: [
      {
        question: "What is the difference between resource requests and limits in K8s?",
        answer: "Requests guarantee allocation and determine scheduling. Limits define the ceiling above which containers are throttled (CPU) or killed (Memory)."
      }
    ],
    relatedErrors: ["kubernetes-crashloopbackoff"],
    relatedTutorials: ["kubernetes-beginner-guide"]
  },
  {
    title: "Kubernetes Service Not Accessible (Connection Refused or Timeout)",
    description: "Debug Kubernetes Service routing issues, mismatched selector labels, and targetPort configurations.",
    slug: "kubernetes-service-not-accessible",
    category: "Kubernetes",
    tags: ["kubernetes", "networking", "services", "clusterip"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "5 min",
    errorCode: "curl: (7) Failed to connect to my-service port 80: Connection refused",
    problem: "Client cannot reach the application via its ClusterIP or NodePort Service endpoint.",
    causes: [
      "Mismatched selector labels between the Service and Pod template.",
      "targetPort does not match the actual port the container application is listening on.",
      "Pods are failing readiness probes and have been removed from the service endpoints."
    ],
    solutionSteps: [
      {
        title: "Step 1: Check if Service has registered endpoints",
        description: "Verify that the service is actually routing to live pod IP addresses.",
        command: "kubectl get endpoints <service-name>",
        language: "bash"
      },
      {
        title: "Step 2: Match Service selector with Pod labels",
        description: "Ensure labels in service.spec.selector match pod metadata.labels exactly.",
        code: "# Deployment metadata:\nspec:\n  template:\n    metadata:\n      labels:\n        app: backend # MUST MATCH\n\n# Service definition:\nspec:\n  selector:\n    app: backend # MUST MATCH\n  ports:\n    - port: 80\n      targetPort: 8080 # Container listening port",
        language: "yaml"
      }
    ],
    commonMistakes: [
      "Confusing port (the port the service exposes internally) with targetPort (the port your container listens on)."
    ],
    preventionTips: [
      "Always inspect 'kubectl get endpoints' first whenever a service refuses connections."
    ],
    faq: [
      {
        question: "What does an empty '<none>' in endpoints mean?",
        answer: "It means no pods currently match the Service selector labels or all matching pods are failing readiness probes."
      }
    ],
    relatedErrors: ["kubernetes-ingress"],
    relatedTutorials: ["kubernetes-service"]
  },
  {
    title: "Kubernetes ConfigMap Not Found",
    description: "Fix CreateContainerConfigError and Pod pending caused by missing or misspelled ConfigMaps.",
    slug: "kubernetes-configmap-not-found",
    category: "Kubernetes",
    tags: ["kubernetes", "configmaps", "configuration", "devops"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "3 min",
    errorCode: "Warning FailedMount: configmap 'app-config' not found\nStatus: CreateContainerConfigError",
    problem: "The pod cannot start because a referenced ConfigMap does not exist in the pod's namespace.",
    causes: [
      "The ConfigMap was created in a different namespace.",
      "Typo in the ConfigMap name inside deployment.yaml.",
      "Deployment created before the ConfigMap manifest was applied."
    ],
    solutionSteps: [
      {
        title: "Step 1: Check existing ConfigMaps in namespace",
        description: "List all ConfigMaps in the target namespace.",
        command: "kubectl get configmaps -n <namespace>",
        language: "bash"
      },
      {
        title: "Step 2: Mark configMapRef as optional if appropriate",
        description: "Allow the pod to start even if the ConfigMap is absent.",
        code: "envFrom:\n  - configMapRef:\n      name: app-config\n      optional: true",
        language: "yaml"
      }
    ],
    commonMistakes: [
      "Assuming kubectl apply applies files in dependency order; always ensure ConfigMaps are applied before Deployments."
    ],
    preventionTips: [
      "Use Kustomize or Helm to manage configuration and deployment manifests as single atomic units."
    ],
    faq: [
      {
        question: "Does updating a ConfigMap automatically restart pods?",
        answer: "No. Environment variables from ConfigMaps are only injected at container creation. To reload, trigger a rollout: kubectl rollout restart deployment <name>."
      }
    ],
    relatedErrors: ["kubernetes-crashloopbackoff"],
    relatedTutorials: ["kubernetes-deployment"]
  },
  {
    title: "Git Merge Conflict: Automatic merge failed; fix conflicts and then commit",
    description: "Understand, resolve, and prevent Git merge conflicts using visual markers, merge tools, and clean branch workflows.",
    slug: "git-merge-conflict",
    category: "Git",
    tags: ["git", "version-control", "collaboration", "branching"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "CONFLICT (content): Merge conflict in src/index.ts\nAutomatic merge failed; fix conflicts and then commit the result.",
    problem: "Git cannot automatically combine two commits because competing changes were made to the exact same lines of code in a file.",
    causes: [
      "Two developers edited the same lines of code on different branches.",
      "A file was deleted on one branch but modified on another.",
      "Rebasing a long-lived feature branch against an updated main branch."
    ],
    solutionSteps: [
      {
        title: "Step 1: Inspect conflict markers in the file",
        description: "Look for <<<<<<< HEAD (your current branch), =======, and >>>>>>> branch_name (incoming branch).",
        code: "<<<<<<< HEAD\nconst API_BASE = 'https://api.v1.devfixhub.com';\n=======\nconst API_BASE = 'https://api.v2.devfixhub.com';\n>>>>>>> feature-branch",
        language: "typescript"
      },
      {
        title: "Step 2: Edit the file to keep the desired code and delete markers",
        description: "Manually reconcile the code and remove all conflict marker lines.",
        code: "const API_BASE = 'https://api.v2.devfixhub.com';",
        language: "typescript"
      },
      {
        title: "Step 3: Stage the resolved files and finish merge",
        description: "Stage files with git add and complete the merge commit.",
        command: "git add src/index.ts\ngit commit -m \"Merge branch 'feature-branch' and resolve API_BASE conflict\"",
        language: "bash"
      }
    ],
    commonMistakes: [
      "Committing files with <<<<<<< or >>>>>>> markers still inside them, causing syntax errors in production."
    ],
    preventionTips: [
      "Keep feature branches small and rebase frequently against main (git pull --rebase origin main)."
    ],
    faq: [
      {
        question: "How do I abort a broken merge attempt?",
        answer: "Run 'git merge --abort' to restore your working tree to the state before the merge started."
      }
    ],
    relatedErrors: ["git-push-rejected", "git-detached-head"],
    relatedTutorials: ["git-beginner-guide", "git-branching"]
  },
  {
    title: "Git Push Rejected (non-fast-forward)",
    description: "Fix 'error: failed to push some refs to... Updates were rejected because the tip of your current branch is behind'.",
    slug: "git-push-rejected",
    category: "Git",
    tags: ["git", "github", "push", "rebase"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "3 min",
    errorCode: "! [rejected] main -> main (non-fast-forward)\nerror: failed to push some refs to 'github.com/repo.git'",
    problem: "Git rejects your git push because the remote repository contains commits that your local branch does not have.",
    causes: [
      "A teammate pushed commits to the remote branch while you were working locally.",
      "You merged a pull request directly on GitHub/GitLab and your local clone is out of sync."
    ],
    solutionSteps: [
      {
        title: "Step 1: Pull remote commits with rebase",
        description: "Fetch remote commits and replay your local commits cleanly on top.",
        command: "git pull --rebase origin main",
        language: "bash"
      },
      {
        title: "Step 2: Push your branch safely",
        description: "Now that your local branch has fast-forward history, push normally.",
        command: "git push origin main",
        language: "bash"
      }
    ],
    commonMistakes: [
      "Blindly using 'git push --force' on shared branches like main, which overwrites colleagues' commits."
    ],
    preventionTips: [
      "If force-pushing on a personal feature branch is necessary, always use 'git push --force-with-lease'."
    ],
    faq: [
      {
        question: "Why is --force-with-lease safer than --force?",
        answer: "--force-with-lease refuses to overwrite remote commits if someone else pushed changes you have not seen yet."
      }
    ],
    relatedErrors: ["git-merge-conflict"],
    relatedTutorials: ["git-branching"]
  },
  {
    title: "Git Detached HEAD State: You are in 'detached HEAD' state",
    description: "Understand what detached HEAD means in Git, how to save your work, and how to safely return to a branch.",
    slug: "git-detached-head",
    category: "Git",
    tags: ["git", "version-control", "branches", "head"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "You are in 'detached HEAD' state. You can look around, make experimental changes and commit them...",
    problem: "Git HEAD points directly to a specific commit hash rather than to a named branch pointer.",
    causes: [
      "Checking out a specific commit hash (git checkout a1b2c3d) or a remote branch directly.",
      "Checking out a Git tag."
    ],
    solutionSteps: [
      {
        title: "Step 1: If you made commits in detached HEAD, save them to a new branch",
        description: "Create a named branch pointing to your current detached commit so work is not lost.",
        command: "git switch -c my-saved-feature-branch",
        language: "bash"
      },
      {
        title: "Step 2: If you just want to discard changes and go back to main",
        description: "Switch back to your primary branch cleanly.",
        command: "git checkout main\n# Or with modern Git:\ngit switch main",
        language: "bash"
      }
    ],
    commonMistakes: [
      "Switching branches without saving commits created in detached HEAD, causing them to become unreachable dangling commits."
    ],
    preventionTips: [
      "When inspecting old commits, use 'git switch -c temp-branch <commit>' instead of checking out the commit hash directly."
    ],
    faq: [
      {
        question: "Can I recover commits lost in detached HEAD?",
        answer: "Yes! Use 'git reflog' to find the commit SHA and check it out onto a new branch."
      }
    ],
    relatedErrors: ["git-merge-conflict"],
    relatedTutorials: ["git-beginner-guide"]
  },
  {
    title: "SQL Unknown Column Error: Unknown column 'xyz' in 'field list'",
    description: "Fix Unknown column in field list or column does not exist errors in MySQL, PostgreSQL, and ORMs.",
    slug: "sql-unknown-column-error",
    category: "SQL",
    tags: ["sql", "database", "mysql", "postgresql"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "3 min",
    errorCode: "ERROR 1054 (42S22): Unknown column 'is_active' in 'field list'",
    problem: "The database query references a column name that does not exist in the specified table schema.",
    causes: [
      "Typo in column name or casing mismatch (PostgreSQL converts unquoted column names to lowercase).",
      "Missing database migration that adds the new column.",
      "Using double quotes instead of single quotes for string literals in MySQL."
    ],
    solutionSteps: [
      {
        title: "Step 1: Check table column schema",
        description: "Inspect actual table column names directly in the database.",
        command: "-- In MySQL:\nDESCRIBE users;\n\n-- In PostgreSQL:\n\\d users",
        language: "sql"
      },
      {
        title: "Step 2: Use single quotes for string values",
        description: "In SQL, single quotes denote values; double quotes denote column/table identifiers.",
        code: "-- BAD (interprets 'active' as a column):\nSELECT * FROM users WHERE status = \"active\";\n\n-- GOOD:\nSELECT * FROM users WHERE status = 'active';",
        language: "sql"
      }
    ],
    commonMistakes: [
      "Creating camelCase columns in PostgreSQL without double quotes, which auto-converts them to lowercase."
    ],
    preventionTips: [
      "Use schema migration tools like Liquibase, Flyway, or Prisma."
    ],
    faq: [
      {
        question: "Why does PostgreSQL say 'column does not exist' for my camelCase column?",
        answer: "In Postgres, unquoted names are folded to lowercase. If created as \"userId\", you must query it as \"userId\" with double quotes."
      }
    ],
    relatedErrors: ["sql-syntax-error"],
    relatedTutorials: ["spring-boot-postgresql"]
  },
  {
    title: "SQL Syntax Error: You have an error in your SQL syntax",
    description: "Diagnose and fix SQL syntax errors, reserved keyword clashes, unescaped strings, and misplaced commas.",
    slug: "sql-syntax-error",
    category: "SQL",
    tags: ["sql", "database", "queries", "mysql"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version",
    problem: "The SQL parser fails to execute a query due to invalid syntax, missing clauses, or unescaped characters.",
    causes: [
      "Using reserved SQL keywords as column names (e.g. `order`, `user`, `group`, `select`).",
      "Trailing comma before the FROM clause or closing parenthesis in CREATE TABLE.",
      "Unescaped single quotes inside text strings (e.g. 'O'Reilly')."
    ],
    solutionSteps: [
      {
        title: "Step 1: Escape reserved keywords with backticks or double quotes",
        description: "Wrap reserved words in database-specific identifier quotes.",
        code: "-- MySQL uses backticks:\nSELECT `order`, `group` FROM `user_orders`;\n\n-- PostgreSQL and ANSI SQL use double quotes:\nSELECT \"order\", \"group\" FROM user_orders;",
        language: "sql"
      },
      {
        title: "Step 2: Use parameterized queries to handle apostrophes",
        description: "Never concatenate strings; use parameter placeholders (? or $1) to prevent syntax errors and SQL injection.",
        code: "-- Prepared statement:\nSELECT * FROM authors WHERE name = ?;",
        language: "sql"
      }
    ],
    commonMistakes: [
      "Concatenating user input into raw SQL queries, creating both syntax errors and severe SQL injection vulnerabilities."
    ],
    preventionTips: [
      "Always use prepared statements and ORMs with parameterized binding."
    ],
    faq: [
      {
        question: "How do I escape a single quote in raw SQL?",
        answer: "Double the single quote: 'O''Reilly'."
      }
    ],
    relatedErrors: ["sql-unknown-column-error"],
    relatedTutorials: ["spring-boot-postgresql"]
  },
  {
    title: "CORS Policy Error: Cross-Origin Resource Sharing",
    description: "Understand the mechanics of CORS, preflight OPTIONS requests, and how to fix CORS headers across all backend servers.",
    slug: "cors-policy-error",
    category: "Web & Network",
    tags: ["cors", "http", "security", "browsers"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "5 min",
    errorCode: "Access to fetch at 'https://api.example.com' from origin 'https://app.example.com' has been blocked by CORS policy: Response to preflight request doesn't pass access control check",
    problem: "A browser security mechanism prevents a web application running at one origin from reading resources from another origin without explicit server permission.",
    causes: [
      "The server does not send Access-Control-Allow-Origin header matching the requesting frontend origin.",
      "Custom HTTP headers (Authorization, X-Custom-Header) trigger a preflight OPTIONS request that the server rejects with 404 or 403.",
      "Cookie credentials enabled on client without Access-Control-Allow-Credentials: true on the server."
    ],
    solutionSteps: [
      {
        title: "Step 1: Return the required CORS headers on the server",
        description: "Configure your API server to respond with appropriate headers.",
        code: "Access-Control-Allow-Origin: https://app.example.com\nAccess-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS\nAccess-Control-Allow-Headers: Content-Type, Authorization\nAccess-Control-Allow-Credentials: true",
        language: "http"
      },
      {
        title: "Step 2: Return HTTP 204 or 200 on OPTIONS preflight calls",
        description: "Ensure HTTP OPTIONS requests receive an immediate success status with no body.",
        code: "// Express example:\napp.options('*', cors());",
        language: "javascript"
      }
    ],
    commonMistakes: [
      "Trying to 'disable CORS' inside frontend JavaScript. CORS is enforced by the browser; the fix MUST be configured on the server!"
    ],
    preventionTips: [
      "Use reverse proxies (like Nginx, Cloudflare, or dev proxies) to serve frontend and backend from the same domain."
    ],
    faq: [
      {
        question: "Why do curl and Postman work when the browser fails with CORS?",
        answer: "CORS is strictly a web browser security feature. Non-browser HTTP clients like curl and Postman do not enforce the Same-Origin Policy."
      }
    ],
    relatedErrors: ["express-cors-error", "angular-cors-error"],
    relatedTutorials: ["nodejs-rest-api", "rest-api-vs-graphql"]
  },
  {
    title: "REST API 401 Unauthorized Error",
    description: "Fix HTTP 401 Unauthorized errors in JWT, Bearer token authentication, and expired session headers.",
    slug: "rest-api-401-unauthorized-error",
    category: "Web & Network",
    tags: ["rest-api", "jwt", "auth", "http"],
    date: "2026-03-01",
    author: "DevFixHub Core Team",
    readingTime: "4 min",
    errorCode: "HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Bearer error=\"invalid_token\", error_description=\"The token expired\"",
    problem: "The server rejects the HTTP request because it lacks valid authentication credentials.",
    causes: [
      "Missing or misspelled 'Authorization: Bearer <token>' header.",
      "The JWT access token has expired.",
      "The token was signed with an incorrect secret or corrupted in transit."
    ],
    solutionSteps: [
      {
        title: "Step 1: Ensure Authorization header is formatted correctly",
        description: "Check the exact header casing and 'Bearer ' space prefix.",
        code: "fetch('/api/profile', {\n  headers: {\n    'Authorization': `Bearer ${token}`,\n    'Content-Type': 'application/json'\n  }\n});",
        language: "javascript"
      },
      {
        title: "Step 2: Implement automatic token refresh on 401",
        description: "Intercept 401 responses to request a new access token using a refresh token.",
        code: "axios.interceptors.response.use(\n  (response) => response,\n  async (error) => {\n    if (error.response?.status === 401) {\n      const newToken = await refreshAccessToken();\n      error.config.headers['Authorization'] = `Bearer ${newToken}`;\n      return axios(error.config);\n    }\n    return Promise.reject(error);\n  }\n);",
        language: "javascript"
      }
    ],
    commonMistakes: [
      "Confusing 401 Unauthorized (unauthenticated: who are you?) with 403 Forbidden (authenticated, but lacking permissions)."
    ],
    preventionTips: [
      "Store refresh tokens in secure HttpOnly cookies rather than localStorage to prevent XSS theft."
    ],
    faq: [
      {
        question: "What is the difference between 401 and 403?",
        answer: "401 Unauthorized means the request lacks valid credentials. 403 Forbidden means the identity is verified, but the user lacks permissions for that resource."
      }
    ],
    relatedErrors: ["cors-policy-error"],
    relatedTutorials: ["jwt-authentication-explained", "spring-boot-jwt-authentication"],
    relatedTools: ["base64-decoder"]
  }
];
