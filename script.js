/**
 * CampusConnect Dev — Developer Onboarding Assistant
 * script.js  |  v1.0
 *
 * All data is mock/sample. No external API calls are made.
 */

// ── Mock data keyed by project type ─────────────────────────────────
const MOCK_DATA = {
  react: {
    typeLabel: "React / Frontend SPA",
    overview: [
      "This is a React single-page application (SPA). The UI is built with reusable components and typically relies on a state-management library such as Redux or React Context.",
      "The build pipeline is powered by Vite or Create React App. The output is a static bundle of HTML, CSS, and JS that can be deployed to any static host.",
    ],
    importantFiles: [
      { file: "src/App.jsx", desc: "Root application component — routing and global layout live here." },
      { file: "src/index.jsx", desc: "Entry point — mounts the React tree into the DOM." },
      { file: "package.json", desc: "Dependency manifest and npm scripts (start, build, test)." },
      { file: "vite.config.js / craco.config.js", desc: "Build-tool configuration and environment aliases." },
      { file: "src/components/", desc: "Reusable UI components directory." },
      { file: ".env.example", desc: "Template for environment variables — copy to .env before running." },
    ],
    setupSteps: [
      "Ensure Node.js ≥ 18 is installed: <code>node -v</code>",
      "Install dependencies: <code>npm install</code>",
      "Copy env template: <code>cp .env.example .env</code> and fill in values.",
      "Start the dev server: <code>npm run dev</code> (usually at http://localhost:5173)",
      "Run the test suite: <code>npm test</code>",
    ],
    beginnerTasks: [
      "Fix a typo or update copy in an existing component inside <code>src/components/</code>.",
      "Add a new CSS class to <code>src/styles/</code> and apply it to an element.",
      "Create a simple stateless component that displays a greeting message.",
      "Add a new route in <code>src/App.jsx</code> that renders a placeholder page.",
      "Write a unit test for a utility function in <code>src/utils/</code>.",
    ],
    investigate: [
      "How is global state managed? Look for Redux store files or a Context provider.",
      "Check <code>src/api/</code> or <code>src/services/</code> to understand how HTTP requests are made.",
      "Review the routing strategy — React Router v5 vs v6 have different APIs.",
      "Understand how environment variables are injected at build time (<code>VITE_*</code> vs <code>REACT_APP_*</code>).",
      "Inspect the CI/CD pipeline (GitHub Actions, GitLab CI) for automated deployment steps.",
    ],
  },

  node: {
    typeLabel: "Node.js / Express Backend",
    overview: [
      "This is a Node.js backend application using the Express framework. It exposes a REST (or GraphQL) API consumed by a frontend or third-party clients.",
      "The application typically connects to a database (PostgreSQL, MongoDB, or MySQL) and uses middleware for authentication, validation, and error handling.",
    ],
    importantFiles: [
      { file: "src/server.js / app.js", desc: "Application entry point — creates the Express instance and starts the HTTP server." },
      { file: "src/routes/", desc: "Route definitions, grouping endpoints by resource (e.g. /users, /products)." },
      { file: "src/controllers/", desc: "Business logic handlers invoked by the routes." },
      { file: "src/models/", desc: "Database schema definitions (Mongoose, Sequelize, Prisma)." },
      { file: "package.json", desc: "Dependency manifest and scripts (start, dev, test)." },
      { file: ".env.example", desc: "Template for secrets — DB credentials, JWT secret, port, etc." },
    ],
    setupSteps: [
      "Ensure Node.js ≥ 18 and npm are installed: <code>node -v</code>",
      "Install dependencies: <code>npm install</code>",
      "Copy env template: <code>cp .env.example .env</code> and fill in DB credentials.",
      "Start the database (Docker is common): <code>docker-compose up -d</code>",
      "Run database migrations (if applicable): <code>npm run migrate</code>",
      "Start the dev server with hot-reload: <code>npm run dev</code>",
    ],
    beginnerTasks: [
      "Add a new field to an existing model and update the corresponding controller.",
      "Write a new GET endpoint that returns a hardcoded JSON response.",
      "Add input validation to an existing route using a validation library.",
      "Write a unit test for a helper/utility function in <code>src/utils/</code>.",
      "Improve error messages returned by the error-handling middleware.",
    ],
    investigate: [
      "Understand the authentication strategy — JWT, sessions, or OAuth?",
      "Check middleware order in <code>app.js</code> — middleware order matters in Express.",
      "Review the database connection logic and how connection pooling is configured.",
      "Look for a rate-limiting or security middleware like Helmet or express-rate-limit.",
      "Understand how environment config is loaded — dotenv, config package, or custom.",
    ],
  },

  python: {
    typeLabel: "Python / Django or Flask",
    overview: [
      "This is a Python web application. Django projects follow the batteries-included MVT pattern with ORM, admin panel, and templating built in. Flask projects are more minimal and rely on extensions.",
      "The application uses virtual environments to isolate dependencies. A requirements.txt or pyproject.toml defines all packages needed.",
    ],
    importantFiles: [
      { file: "manage.py", desc: "Django management script — run server, migrations, shell, etc." },
      { file: "app.py / wsgi.py", desc: "Flask or WSGI entry point." },
      { file: "requirements.txt / pyproject.toml", desc: "Python package dependencies." },
      { file: "settings.py / config.py", desc: "Application configuration — database, installed apps, secret key." },
      { file: "models.py", desc: "Database models defined with Django ORM or SQLAlchemy." },
      { file: ".env.example", desc: "Template for environment variables — SECRET_KEY, DATABASE_URL, etc." },
    ],
    setupSteps: [
      "Ensure Python ≥ 3.10 is installed: <code>python --version</code>",
      "Create a virtual environment: <code>python -m venv venv</code>",
      "Activate it: <code>source venv/bin/activate</code> (Linux/Mac) or <code>venv\\Scripts\\activate</code> (Windows)",
      "Install dependencies: <code>pip install -r requirements.txt</code>",
      "Copy env template: <code>cp .env.example .env</code> and set SECRET_KEY and DATABASE_URL.",
      "Run migrations: <code>python manage.py migrate</code>",
      "Start the dev server: <code>python manage.py runserver</code>",
    ],
    beginnerTasks: [
      "Add a new field to an existing model and run <code>makemigrations</code> + <code>migrate</code>.",
      "Register a model in <code>admin.py</code> so it appears in the Django admin panel.",
      "Write a new URL pattern and a view that returns a simple HTTP response.",
      "Add a template for an existing view that is currently returning raw JSON.",
      "Write a unit test for a utility function using Python's built-in <code>unittest</code>.",
    ],
    investigate: [
      "Review <code>INSTALLED_APPS</code> in settings.py to understand the app structure.",
      "Understand the database being used — SQLite for dev, PostgreSQL/MySQL for production?",
      "Check if Celery or another task queue is configured for background jobs.",
      "Look at middleware in settings.py — security, CORS, session middleware.",
      "Understand the authentication backend — Django auth, JWT (djangorestframework-simplejwt), or OAuth.",
    ],
  },

  java: {
    typeLabel: "Java / Spring Boot",
    overview: [
      "This is a Java application built with Spring Boot. Spring Boot provides auto-configuration for web servers, databases, and security, reducing boilerplate significantly.",
      "The project likely uses Maven or Gradle as a build tool and follows a layered architecture: Controller → Service → Repository → Entity.",
    ],
    importantFiles: [
      { file: "src/main/java/.../Application.java", desc: "Spring Boot entry point — contains the main method and @SpringBootApplication." },
      { file: "pom.xml / build.gradle", desc: "Build configuration and dependency declarations." },
      { file: "src/main/resources/application.properties", desc: "Application configuration — DB URL, server port, logging levels." },
      { file: "src/main/java/.../controller/", desc: "REST controllers annotated with @RestController." },
      { file: "src/main/java/.../service/", desc: "Business logic layer — @Service classes." },
      { file: "src/main/java/.../repository/", desc: "Data access layer using Spring Data JPA repositories." },
    ],
    setupSteps: [
      "Ensure Java 17+ (LTS) and Maven/Gradle are installed: <code>java -version</code>",
      "Import the project into IntelliJ IDEA or VS Code with the Java Extension Pack.",
      "Copy <code>application.properties.example</code> to <code>application.properties</code> and set DB credentials.",
      "Start your database (e.g. PostgreSQL) and ensure it's accessible.",
      "Build the project: <code>./mvnw clean install</code> (or <code>./gradlew build</code>)",
      "Run the application: <code>./mvnw spring-boot:run</code>",
    ],
    beginnerTasks: [
      "Add a new field to an existing @Entity and regenerate the DB schema.",
      "Create a new GET endpoint in an existing @RestController.",
      "Add a validation annotation (<code>@NotNull</code>, <code>@Size</code>) to a DTO class.",
      "Write a unit test for a service method using JUnit 5 and Mockito.",
      "Add a log statement in a service method using SLF4J.",
    ],
    investigate: [
      "Understand the Spring Security configuration — which endpoints are protected?",
      "Review the database schema migrations — Flyway or Liquibase?",
      "Check for application profiles (dev, staging, prod) in application-{profile}.properties.",
      "Look for a Dockerfile or docker-compose.yml for containerized deployment.",
      "Understand how DTOs (Data Transfer Objects) are mapped to entities — MapStruct?",
    ],
  },

  generic: {
    typeLabel: "Generic / Other",
    overview: [
      "This project is a software application or service. Before diving into code, the first step is to understand the high-level architecture and the primary programming language(s) used.",
      "Start by reading the README.md — it usually contains setup instructions, a description of the project's purpose, and links to further documentation.",
    ],
    importantFiles: [
      { file: "README.md", desc: "Starting point for any project — setup instructions and overview." },
      { file: "Makefile / package.json / build.gradle", desc: "Entrypoint for running common commands." },
      { file: "Dockerfile / docker-compose.yml", desc: "Container configuration for running the app consistently." },
      { file: "src/ or lib/", desc: "Primary source code directory." },
      { file: ".env.example", desc: "Template for required environment variables." },
      { file: "CONTRIBUTING.md", desc: "Guidelines for making contributions to the project." },
    ],
    setupSteps: [
      "Read the <code>README.md</code> fully before touching anything.",
      "Identify the runtime/language and install the appropriate version.",
      "Copy <code>.env.example</code> to <code>.env</code> and fill in required values.",
      "Install dependencies using the project's package manager.",
      "Run the project locally and confirm it starts without errors.",
      "Run the existing test suite to establish a baseline.",
    ],
    beginnerTasks: [
      "Fix a documentation typo in README.md or a code comment.",
      "Improve an error message to make it more descriptive.",
      "Add a missing test case for an existing function.",
      "Refactor a function that is flagged with a TODO comment.",
      "Review open issues labelled 'good first issue' and pick one.",
    ],
    investigate: [
      "What is the overall architecture? Monolith, microservices, or serverless?",
      "How are secrets and configuration managed across environments?",
      "What is the deployment process? CI/CD pipeline, manual steps?",
      "Are there coding standards enforced by a linter or formatter?",
      "How are database schema changes managed?",
    ],
  },
};

// ── Health check mock data keyed by project type ─────────────────────
// Statuses: "good" | "attention" | "review"
const HEALTH_DATA = {
  react: [
    {
      category: "Project Structure",
      status: "good",
      explanation: "Standard src/ layout with components, hooks, and pages directories detected. Folder naming follows React community conventions.",
    },
    {
      category: "Documentation",
      status: "attention",
      explanation: "README.md is present but lacks setup instructions for new contributors. Consider adding a CONTRIBUTING.md and JSDoc comments to exported components.",
    },
    {
      category: "Configuration",
      status: "good",
      explanation: "Vite/CRA config is present and .env.example covers all required environment variables. Build scripts are defined in package.json.",
    },
    {
      category: "Security",
      status: "review",
      explanation: "No Content Security Policy header is configured. Dependency audit recommended — run npm audit to check for known vulnerabilities in third-party packages.",
    },
    {
      category: "Code Quality",
      status: "good",
      explanation: "ESLint and Prettier configurations are present. Test coverage exists for utility functions. PropTypes or TypeScript types are used for component props.",
    },
    {
      category: "Deployment Readiness",
      status: "attention",
      explanation: "No CI/CD pipeline configuration found. A GitHub Actions workflow for automated build and deploy to a static host (Netlify, Vercel) is recommended.",
    },
  ],
  node: [
    {
      category: "Project Structure",
      status: "good",
      explanation: "MVC-style layout with routes/, controllers/, models/, and middleware/ directories. Entry point is clearly defined in package.json main field.",
    },
    {
      category: "Documentation",
      status: "review",
      explanation: "API endpoints lack JSDoc or OpenAPI/Swagger documentation. New developers cannot discover available routes without reading source code.",
    },
    {
      category: "Configuration",
      status: "good",
      explanation: ".env.example is present with all required keys. Database connection and port are configurable via environment variables.",
    },
    {
      category: "Security",
      status: "attention",
      explanation: "Helmet.js middleware is missing — HTTP security headers are not set. Rate limiting on authentication routes is not configured. Review input validation coverage.",
    },
    {
      category: "Code Quality",
      status: "good",
      explanation: "ESLint is configured. Unit tests are present for service layer functions. Async error handling uses a consistent pattern throughout route handlers.",
    },
    {
      category: "Deployment Readiness",
      status: "good",
      explanation: "Dockerfile is present and docker-compose.yml covers the full local stack. A health check endpoint (/healthz) is implemented for load-balancer probes.",
    },
  ],
  python: [
    {
      category: "Project Structure",
      status: "good",
      explanation: "Django app layout follows the official project structure. Apps are logically separated by domain. manage.py is at the project root.",
    },
    {
      category: "Documentation",
      status: "attention",
      explanation: "Docstrings are missing from most view functions and models. A top-level README and an API reference (e.g. drf-spectacular) would benefit new contributors.",
    },
    {
      category: "Configuration",
      status: "review",
      explanation: "settings.py contains hardcoded SECRET_KEY and DEBUG=True. These must be moved to environment variables before any production deployment.",
    },
    {
      category: "Security",
      status: "attention",
      explanation: "ALLOWED_HOSTS is set to ['*'] which is insecure in production. CSRF protection is enabled by default but verify it has not been disabled for any view.",
    },
    {
      category: "Code Quality",
      status: "good",
      explanation: "flake8 and black configuration files are present. Django ORM queries avoid N+1 issues via select_related/prefetch_related in key views.",
    },
    {
      category: "Deployment Readiness",
      status: "good",
      explanation: "requirements.txt is pinned to specific versions. Gunicorn is listed as a production server. Procfile for Heroku/Railway deployment is present.",
    },
  ],
  java: [
    {
      category: "Project Structure",
      status: "good",
      explanation: "Standard Maven/Gradle multi-layer structure: controller, service, repository, entity, dto. Package naming follows reverse-domain convention.",
    },
    {
      category: "Documentation",
      status: "attention",
      explanation: "Swagger/OpenAPI annotations are missing from most REST controllers. Javadoc is absent on public service methods. A developer guide in the README is recommended.",
    },
    {
      category: "Configuration",
      status: "review",
      explanation: "application.properties contains plaintext database credentials. Migrate to environment variables or Spring Vault before deploying to any shared environment.",
    },
    {
      category: "Security",
      status: "good",
      explanation: "Spring Security is configured. JWT token validation is implemented. CORS is restricted to known origins. Passwords are hashed with BCrypt.",
    },
    {
      category: "Code Quality",
      status: "good",
      explanation: "Checkstyle is enforced in the build. Unit tests cover the service layer with Mockito. Integration tests use an in-memory H2 database.",
    },
    {
      category: "Deployment Readiness",
      status: "attention",
      explanation: "Dockerfile is present but no docker-compose.yml for local dev. Flyway migrations exist but the CI pipeline does not run them as part of the build verification.",
    },
  ],
  generic: [
    {
      category: "Project Structure",
      status: "review",
      explanation: "Top-level directory layout is non-standard. Source, test, and configuration files are mixed together. Consider adopting a recognised structure for the language/framework in use.",
    },
    {
      category: "Documentation",
      status: "attention",
      explanation: "README.md is minimal — it lacks setup instructions, architecture overview, and contribution guidelines. New developers will struggle to get started.",
    },
    {
      category: "Configuration",
      status: "good",
      explanation: "A .env.example file is present. Configuration is separated from code, which is a good baseline practice.",
    },
    {
      category: "Security",
      status: "review",
      explanation: "No dependency vulnerability scan is configured. Secrets management strategy is unclear. A security review is recommended before the project handles real user data.",
    },
    {
      category: "Code Quality",
      status: "attention",
      explanation: "No linter or formatter configuration is found. Test coverage is unknown. Adopting a linting tool and a minimum coverage threshold will improve long-term maintainability.",
    },
    {
      category: "Deployment Readiness",
      status: "attention",
      explanation: "No CI/CD configuration detected. Deployment steps are undocumented. Containerising the application and adding a pipeline would significantly reduce deployment risk.",
    },
  ],
};

// ── Setup Guide data keyed by project type ──────────────────────────
// Each step: { title, explanation, command? }
// Steps are always: Install Tools → Clone → Dependencies → Env Vars → Run

const SETUP_DATA = {
  react: [
    {
      title: "Install the required tools",
      explanation: "You need Node.js (which includes npm) installed on your computer before anything else. Node.js lets you run JavaScript outside the browser and powers the build tools React uses.",
      command: "node -v && npm -v",
    },
    {
      title: "Clone or download the project",
      explanation: "Use Git to download a copy of the project onto your machine. If you do not have Git installed, you can also download a ZIP from the repository page and extract it.",
      command: "git clone https://github.com/your-org/your-repo.git",
    },
    {
      title: "Install project dependencies",
      explanation: "This reads package.json and downloads all the libraries the project needs into a local node_modules/ folder. This step only needs to be repeated when dependencies change.",
      command: "npm install",
    },
    {
      title: "Configure environment variables",
      explanation: "Copy the .env.example file to a new file called .env and fill in any required values (API keys, URLs). The app reads these at startup. Never commit .env to version control.",
      command: "cp .env.example .env",
    },
    {
      title: "Run the project",
      explanation: "Start the development server. It will open the app in your browser at http://localhost:5173 (Vite) or http://localhost:3000 (CRA) and automatically reload when you save a file.",
      command: "npm run dev",
    },
  ],

  node: [
    {
      title: "Install the required tools",
      explanation: "Install Node.js (≥ 18) and npm. If the project uses Docker for its database, install Docker Desktop as well. These are the only global tools you need.",
      command: "node -v && npm -v",
    },
    {
      title: "Clone or download the project",
      explanation: "Clone the repository to get a local copy. The project folder contains all source code, configuration, and documentation you need to get started.",
      command: "git clone https://github.com/your-org/your-repo.git",
    },
    {
      title: "Install project dependencies",
      explanation: "npm install reads package.json and downloads all required packages into node_modules/. This includes Express, database drivers, and testing libraries.",
      command: "npm install",
    },
    {
      title: "Configure environment variables",
      explanation: "Copy .env.example to .env and fill in the database connection string, JWT secret, and port. The server will fail to start if required variables are missing.",
      command: "cp .env.example .env",
    },
    {
      title: "Run the project",
      explanation: "npm run dev starts the server with nodemon, which automatically restarts it whenever you save a file. The API will be available at http://localhost:3000 by default.",
      command: "npm run dev",
    },
  ],

  python: [
    {
      title: "Install the required tools",
      explanation: "Install Python 3.10 or newer. Python includes pip (the package manager) by default. Confirm both are available before proceeding.",
      command: "python --version && pip --version",
    },
    {
      title: "Clone or download the project",
      explanation: "Clone the repository with Git. If the project uses a monorepo layout, make sure you are working in the correct subdirectory after cloning.",
      command: "git clone https://github.com/your-org/your-repo.git",
    },
    {
      title: "Install project dependencies",
      explanation: "Create a virtual environment first — it keeps this project's packages isolated from your global Python installation. Then install everything listed in requirements.txt.",
      command: "python -m venv venv && source venv/bin/activate && pip install -r requirements.txt",
    },
    {
      title: "Configure environment variables",
      explanation: "Copy .env.example to .env and set SECRET_KEY, DATABASE_URL, and DEBUG. Django and Flask both read these at startup via python-dotenv or django-environ.",
      command: "cp .env.example .env",
    },
    {
      title: "Run the project",
      explanation: "Apply any pending database migrations first, then start the development server. Django serves at http://127.0.0.1:8000 by default.",
      command: "python manage.py migrate && python manage.py runserver",
    },
  ],

  java: [
    {
      title: "Install the required tools",
      explanation: "Install Java 17 (LTS) and Maven or Gradle. Most Spring Boot projects ship with a Maven or Gradle wrapper script (mvnw / gradlew) so you may not need a global install.",
      command: "java -version && ./mvnw -v",
    },
    {
      title: "Clone or download the project",
      explanation: "Clone the repository. Spring Boot projects tend to be larger — the initial clone may take a moment if the repository includes generated sources or binary assets.",
      command: "git clone https://github.com/your-org/your-repo.git",
    },
    {
      title: "Install project dependencies",
      explanation: "Maven downloads all declared dependencies from Maven Central and compiles the project. This may take a few minutes on the first run as it populates the local cache.",
      command: "./mvnw clean install -DskipTests",
    },
    {
      title: "Configure environment variables",
      explanation: "Copy application.properties.example to application.properties (or set environment variables) and fill in your database URL and credentials. Spring Boot reads these at startup.",
      command: "cp src/main/resources/application.properties.example src/main/resources/application.properties",
    },
    {
      title: "Run the project",
      explanation: "The Maven wrapper compiles and starts the embedded Tomcat server. The app will be available at http://localhost:8080 once you see 'Started Application' in the console.",
      command: "./mvnw spring-boot:run",
    },
  ],

  generic: [
    {
      title: "Install the required tools",
      explanation: "Read the README.md to find out which runtime (Node, Python, Java, Ruby, etc.) this project uses, then install the correct version. Check for a .tool-versions or .nvmrc file for exact version requirements.",
      command: "cat README.md",
    },
    {
      title: "Clone or download the project",
      explanation: "Clone the repository using Git, or download a ZIP archive from the repository host. Always work on a feature branch — never commit directly to the main branch.",
      command: "git clone https://github.com/your-org/your-repo.git",
    },
    {
      title: "Install project dependencies",
      explanation: "Use the package manager appropriate for this project (npm, pip, Maven, Bundler, etc.) to install all declared dependencies. Check the README for the exact command.",
      command: "# See README.md for the correct install command",
    },
    {
      title: "Configure environment variables",
      explanation: "Copy .env.example to .env and fill in all required values. If no .env.example exists, check the README or ask a team member which variables are needed.",
      command: "cp .env.example .env",
    },
    {
      title: "Run the project",
      explanation: "Start the application using the command documented in the README or in the scripts section of package.json / Makefile. Confirm it starts without errors before making changes.",
      command: "# See README.md for the correct run command",
    },
  ],
};

// ── Project Structure Tree data ──────────────────────────────────────
// Each node: { name, type: "folder"|"file", info, children? }
// `info` is the beginner-friendly explanation shown on click.

const TREE_DATA = {
  react: {
    name: "my-react-app/",
    type: "folder",
    info: "The root directory of your React project. Everything lives inside here.",
    children: [
      {
        name: "src/",
        type: "folder",
        info: "The main source folder. All your React components, styles, hooks, and logic go here. This is where you will spend most of your time as a developer.",
        children: [
          {
            name: "components/",
            type: "folder",
            info: "Reusable UI building blocks live here. Each component is a self-contained piece of the interface — like a Button, Navbar, or Card.",
            children: [
              { name: "App.jsx",   type: "file", info: "The root React component. It defines the top-level layout and sets up the router. Think of it as the 'main page' that holds everything else together." },
              { name: "Navbar.jsx",type: "file", info: "A reusable navigation bar component. It is imported into App.jsx and displayed at the top of every page." },
            ],
          },
          {
            name: "assets/",
            type: "folder",
            info: "Static files that your app needs — images, fonts, icons, and SVG graphics. Files here are imported directly into components.",
            children: [
              { name: "logo.svg",  type: "file", info: "The application logo in SVG format. SVG files are scalable and look sharp on all screen sizes." },
              { name: "styles/",   type: "folder", info: "Global CSS or style files that apply across the whole app, such as reset styles, theme variables, and typography rules.",
                children: [
                  { name: "index.css", type: "file", info: "The main global stylesheet. It is imported once in index.jsx and its styles affect the entire application." },
                ],
              },
            ],
          },
          {
            name: "hooks/",
            type: "folder",
            info: "Custom React hooks live here. A hook is a reusable function that encapsulates stateful logic — for example, useFetch() for loading data from an API.",
            children: [
              { name: "useAuth.js", type: "file", info: "A custom hook that manages authentication state — checking whether a user is logged in and providing login/logout functions to any component that needs them." },
            ],
          },
          { name: "index.jsx", type: "file", info: "The true entry point of the React application. It mounts the <App /> component into the HTML page. You rarely need to edit this file." },
        ],
      },
      {
        name: "tests/",
        type: "folder",
        info: "Automated tests for your components and utility functions. Well-tested code is easier to change safely. Test files typically end in .test.jsx or .spec.js.",
        children: [
          { name: "App.test.jsx", type: "file", info: "Unit tests for the App component. Run them with `npm test` to make sure your changes have not broken existing behaviour." },
        ],
      },
      { name: "index.html",    type: "file", info: "The single HTML page that the browser loads. React injects your entire app into the <div id=\"root\"> element inside this file. You rarely edit it directly." },
      { name: "package.json",  type: "file", info: "The project manifest. It lists all npm dependencies, defines scripts like `npm start` and `npm build`, and records the project name and version. Always check this first when joining a project." },
      { name: ".env.example",  type: "file", info: "A template showing which environment variables the project needs. Copy this to `.env` and fill in real values. Never commit `.env` to version control — it may contain secrets." },
      { name: "README.md",     type: "file", info: "The project documentation file. It usually contains setup instructions, a project overview, and contribution guidelines. Read this before doing anything else in a new project." },
    ],
  },

  node: {
    name: "my-node-api/",
    type: "folder",
    info: "The root directory of your Node.js/Express backend project.",
    children: [
      {
        name: "src/",
        type: "folder",
        info: "All application source code lives here, organised by concern: routes, controllers, models, and middleware.",
        children: [
          {
            name: "routes/",
            type: "folder",
            info: "Express route definitions. Each file groups related API endpoints together — for example, userRoutes.js handles all /users/* paths.",
            children: [
              { name: "userRoutes.js",    type: "file", info: "Defines API endpoints related to users: GET /users, POST /users, DELETE /users/:id, etc. Routes call controller functions to handle the actual logic." },
              { name: "productRoutes.js", type: "file", info: "Defines API endpoints for product resources. Separating routes by resource keeps the codebase organised as it grows." },
            ],
          },
          {
            name: "controllers/",
            type: "folder",
            info: "Controller functions contain the business logic for each route. They receive the HTTP request, call services or models, and send back a response.",
            children: [
              { name: "userController.js", type: "file", info: "Contains functions like getUser(), createUser(), and deleteUser(). Routes call these functions — keeping route files clean and controllers focused on logic." },
            ],
          },
          {
            name: "models/",
            type: "folder",
            info: "Database schema definitions. Each model represents a table or collection and defines the shape of your data using an ORM like Mongoose or Sequelize.",
            children: [
              { name: "User.js",    type: "file", info: "Defines the User schema — fields like name, email, password, and createdAt. The model is used by controllers to read and write user data to the database." },
              { name: "Product.js", type: "file", info: "Defines the Product schema. Models are the bridge between your application code and the database." },
            ],
          },
          {
            name: "assets/",
            type: "folder",
            info: "Static assets served by the backend — uploaded files, generated PDFs, images, or other binary resources that the API delivers to clients.",
            children: [
              { name: "uploads/", type: "folder", info: "Directory where user-uploaded files are stored on disk. In production this is often replaced by a cloud storage service like AWS S3." },
            ],
          },
          { name: "app.js",    type: "file", info: "Creates and configures the Express application — registers middleware (body-parser, CORS, Helmet) and mounts route files. This is the heart of the backend." },
          { name: "server.js", type: "file", info: "Starts the HTTP server by calling app.listen(). Separating this from app.js makes it easier to test the app without starting a real server." },
        ],
      },
      {
        name: "tests/",
        type: "folder",
        info: "Automated tests for routes, controllers, and utility functions. Run with `npm test`. A good test suite lets you refactor confidently.",
        children: [
          { name: "user.test.js", type: "file", info: "Integration tests for the /users endpoints. Uses a test database or mock so real data is never affected during testing." },
        ],
      },
      { name: "package.json", type: "file", info: "Lists all npm packages the project depends on and defines scripts like `npm start` and `npm run dev`. The first file to read when joining a Node.js project." },
      { name: ".env.example", type: "file", info: "Shows all environment variables needed to run the app — database URL, JWT secret, port number. Copy to `.env` and fill in real values before starting." },
      { name: "README.md",    type: "file", info: "Project documentation. Contains setup steps, API endpoint reference, and contribution guidelines. Always start here." },
    ],
  },

  python: {
    name: "my-django-app/",
    type: "folder",
    info: "The root directory of your Python/Django project. Django follows a strict project structure that separates settings, URLs, and individual apps.",
    children: [
      {
        name: "src/",
        type: "folder",
        info: "Main application code. In Django projects this typically contains one or more 'apps' — self-contained modules each responsible for a feature area.",
        children: [
          {
            name: "components/",
            type: "folder",
            info: "In a Django + frontend setup, reusable UI templates or React/Vue components are stored here. In a pure Django project, this may contain reusable template tags or form classes.",
            children: [
              { name: "forms.py",   type: "file", info: "Django Form classes that define and validate user input. Forms are used in views to process POST data safely." },
              { name: "widgets.py", type: "file", info: "Custom form widgets — reusable HTML input elements with their own rendering logic, extending Django's built-in widget system." },
            ],
          },
          {
            name: "assets/",
            type: "folder",
            info: "Static files — CSS stylesheets, JavaScript files, and images. Django collects these into a single directory during deployment using the `collectstatic` command.",
            children: [
              { name: "static/", type: "folder", info: "CSS, JS, and image files referenced by your HTML templates. Served directly by a web server (nginx/Apache) in production for performance." },
            ],
          },
          { name: "models.py",  type: "file", info: "Defines your database tables as Python classes using Django's ORM. Each class becomes a table; each attribute becomes a column. Run `makemigrations` after changing this file." },
          { name: "views.py",   type: "file", info: "Contains view functions or class-based views that handle HTTP requests and return responses. This is where your business logic lives in Django." },
          { name: "urls.py",    type: "file", info: "Maps URL paths to view functions. Think of it as a routing table — when a user visits /products/, Django checks this file to decide which view to call." },
          { name: "admin.py",   type: "file", info: "Registers your models with the Django admin panel — a built-in web interface for managing database records. Great for development and simple content management." },
        ],
      },
      {
        name: "tests/",
        type: "folder",
        info: "Django test cases using Python's unittest framework. Run with `python manage.py test`. Tests check that views return correct responses and models behave as expected.",
        children: [
          { name: "test_views.py",  type: "file", info: "Tests for your view functions — checks that the correct templates are rendered and the right status codes are returned for each URL." },
          { name: "test_models.py", type: "file", info: "Tests for your database models — verifies that model validation, default values, and relationships work correctly." },
        ],
      },
      { name: "manage.py",    type: "file", info: "Django's command-line utility. Use it to run the dev server (`runserver`), create migrations (`makemigrations`), apply them (`migrate`), and open a Django shell." },
      { name: "package.json", type: "file", info: "Present if the project has a JavaScript frontend. Lists npm dependencies for tools like Webpack or Vite that bundle the frontend assets." },
      { name: ".env.example", type: "file", info: "Lists required environment variables — SECRET_KEY, DATABASE_URL, DEBUG, ALLOWED_HOSTS. Copy to `.env` and fill in values before running the project." },
      { name: "README.md",    type: "file", info: "Project documentation — setup instructions, architecture overview, and how to contribute. Read this first." },
    ],
  },

  java: {
    name: "my-spring-app/",
    type: "folder",
    info: "The root directory of your Java/Spring Boot project. Maven or Gradle manages the build. Source code follows a strict package structure under src/main/java.",
    children: [
      {
        name: "src/",
        type: "folder",
        info: "All source code. Spring Boot projects separate main application code (src/main) from test code (src/test), each mirroring the same package structure.",
        children: [
          {
            name: "components/",
            type: "folder",
            info: "Spring @Component classes that provide cross-cutting functionality — utility beans, scheduled tasks, and event listeners that do not belong in a specific layer.",
            children: [
              { name: "EmailService.java",    type: "file", info: "A Spring-managed service for sending emails. Annotated with @Component or @Service so Spring auto-wires it wherever it is needed." },
              { name: "AuditListener.java",   type: "file", info: "An entity listener that automatically records when database records are created or updated — useful for audit trails." },
            ],
          },
          {
            name: "assets/",
            type: "folder",
            info: "Static assets served by Spring Boot's embedded web server — HTML, CSS, JS files placed under src/main/resources/static/ are served at the root URL path.",
            children: [
              { name: "templates/", type: "folder", info: "Thymeleaf (or Freemarker) HTML templates rendered server-side by Spring MVC controllers. Each template corresponds to a view returned by a controller method." },
            ],
          },
          { name: "Application.java", type: "file", info: "The main entry point. Contains the `public static void main` method and the @SpringBootApplication annotation that bootstraps the entire Spring context." },
          { name: "controller/",      type: "folder", info: "REST controllers annotated with @RestController. Each method handles an HTTP request and returns data (JSON) or delegates to a view.",
            children: [
              { name: "UserController.java", type: "file", info: "Handles HTTP requests for /users endpoints — GET, POST, PUT, DELETE. Calls the service layer and returns HTTP responses." },
            ],
          },
          { name: "service/",   type: "folder", info: "Business logic layer. @Service classes are called by controllers and call repositories. Keeping logic here makes it reusable and testable.",
            children: [
              { name: "UserService.java", type: "file", info: "Contains business logic for user operations — validating data, applying rules, and calling UserRepository to read/write the database." },
            ],
          },
          { name: "repository/", type: "folder", info: "Spring Data JPA repositories. Extending JpaRepository gives you free CRUD methods (save, findById, delete) without writing SQL.",
            children: [
              { name: "UserRepository.java", type: "file", info: "A JPA repository interface for the User entity. Spring generates the SQL queries automatically based on method names like findByEmail()." },
            ],
          },
        ],
      },
      {
        name: "tests/",
        type: "folder",
        info: "JUnit 5 test classes. Spring Boot Test provides utilities for testing controllers (MockMvc) and services (Mockito). Run with `./mvnw test`.",
        children: [
          { name: "UserControllerTest.java", type: "file", info: "Tests the UserController endpoints using MockMvc — makes HTTP requests without starting a real server and asserts the responses." },
          { name: "UserServiceTest.java",    type: "file", info: "Unit tests for UserService using Mockito to mock the repository layer, so tests run fast and don't need a database." },
        ],
      },
      { name: "index.html",   type: "file", info: "A static landing page served from src/main/resources/static/. Loaded when a user visits the root URL of the application." },
      { name: "package.json", type: "file", info: "Present when the project includes a JavaScript frontend (e.g. React or Vue). Lists npm packages needed to build the frontend assets." },
      { name: ".env.example", type: "file", info: "Lists environment-specific settings — database URL, credentials, feature flags. In Spring Boot, these map to application.properties or application.yml values." },
      { name: "README.md",    type: "file", info: "Project documentation. Contains build instructions, architecture notes, and onboarding steps for new developers." },
    ],
  },

  generic: {
    name: "my-project/",
    type: "folder",
    info: "The root directory of the project. This is the top-level folder you clone from version control. All project files live inside here.",
    children: [
      {
        name: "src/",
        type: "folder",
        info: "The main source code directory. Keeping source code in a dedicated folder separates it from configuration, documentation, and build output files.",
        children: [
          {
            name: "components/",
            type: "folder",
            info: "Reusable building blocks of the application — UI components, utility classes, or shared modules depending on the technology. Putting shared code here avoids duplication.",
            children: [
              { name: "Header.js",  type: "file", info: "A reusable header component used across multiple pages. Editing it once updates the header everywhere it appears in the application." },
              { name: "Footer.js",  type: "file", info: "A reusable footer component. Contains links, copyright text, and other content that appears at the bottom of every page." },
            ],
          },
          {
            name: "assets/",
            type: "folder",
            info: "Static files the application needs — images, fonts, icons, stylesheets. These files are not code; they are resources that code references.",
            children: [
              { name: "images/",     type: "folder", info: "Image files used by the application — logos, banners, icons, and photographs. Using a dedicated folder keeps the project organised." },
              { name: "styles.css",  type: "file",   info: "The main stylesheet defining colours, fonts, spacing, and layout rules. Changes here affect the visual appearance of the entire application." },
            ],
          },
          { name: "index.html", type: "file", info: "The main HTML file — the entry point that the browser loads first. It references stylesheets and scripts, and provides the initial page structure." },
          { name: "main.js",    type: "file", info: "The primary JavaScript file. It bootstraps the application — initialises libraries, sets up event listeners, and starts the main program logic." },
        ],
      },
      {
        name: "tests/",
        type: "folder",
        info: "Automated test files that verify the application behaves correctly. Running tests regularly catches bugs early, before they reach users.",
        children: [
          { name: "main.test.js", type: "file", info: "Unit tests for the functions in main.js. Each test checks that a specific function returns the correct result for a given input." },
          { name: "e2e.test.js",  type: "file", info: "End-to-end tests that simulate a real user interacting with the application — clicking buttons, filling forms, and checking the results." },
        ],
      },
      { name: "index.html",   type: "file", info: "The main HTML entry point served to the browser. It loads your stylesheets and scripts and provides the base page structure." },
      { name: "package.json", type: "file", info: "The project manifest. Defines the project name, version, scripts for common tasks (start, test, build), and lists all dependencies. Check this file first." },
      { name: ".env.example", type: "file", info: "A checklist of environment variables the project needs. Copy this file to `.env` and fill in real values. Never commit `.env` — it may contain passwords or API keys." },
      { name: "README.md",    type: "file", info: "The most important documentation file. It explains what the project does, how to set it up, and how to contribute. Always read this before writing any code." },
    ],
  },
};

// ── Helpers ──────────────────────────────────────────────────────────

/**
 * Safely parse inline <code>…</code> HTML within a plain text string
 * without using innerHTML on untrusted input.
 * Only <code> tags are allowed here since we control the mock data.
 */
function createListItem(htmlString) {
  const li = document.createElement("li");
  li.innerHTML = htmlString; // safe — data is internal/static only
  return li;
}

function buildList(items, ordered = false) {
  const ul = document.createElement(ordered ? "ol" : "ul");
  ul.className = ordered ? "step-list" : "report-list";
  items.forEach((item) => ul.appendChild(createListItem(item)));
  return ul;
}

/**
 * Builds an interactive checklist for beginner tasks.
 * Returns a wrapper <div> containing a progress counter and a <ul>
 * whose items each have a checkbox. Checking an item marks it done.
 */
function buildTaskList(items) {
  const total = items.length;

  // ── Wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "task-list-wrapper";

  // ── Progress bar + counter
  const progressBar = document.createElement("div");
  progressBar.className = "task-progress";

  const counter = document.createElement("span");
  counter.className = "task-progress__counter";
  counter.textContent = `0 of ${total} tasks completed`;

  const barTrack = document.createElement("div");
  barTrack.className = "task-progress__track";
  const barFill = document.createElement("div");
  barFill.className = "task-progress__fill";
  barFill.style.width = "0%";
  barTrack.appendChild(barFill);

  progressBar.appendChild(counter);
  progressBar.appendChild(barTrack);
  wrapper.appendChild(progressBar);

  // ── Task list
  const ul = document.createElement("ul");
  ul.className = "task-list";

  items.forEach((itemHtml, index) => {
    const li = document.createElement("li");
    li.className = "task-list__item";

    const id = `task-${index}-${Date.now()}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.className = "task-list__checkbox";

    const label = document.createElement("label");
    label.htmlFor = id;
    label.className = "task-list__label";
    label.innerHTML = itemHtml; // safe — internal mock data only

    li.appendChild(checkbox);
    li.appendChild(label);
    ul.appendChild(li);

    // Update counter + bar on change
    checkbox.addEventListener("change", () => {
      li.classList.toggle("task-list__item--done", checkbox.checked);
      const done = ul.querySelectorAll(".task-list__checkbox:checked").length;
      counter.textContent = `${done} of ${total} task${total !== 1 ? "s" : ""} completed`;
      barFill.style.width = `${(done / total) * 100}%`;
      counter.classList.toggle("task-progress__counter--complete", done === total);
    });
  });

  wrapper.appendChild(ul);
  return wrapper;
}

function buildFileList(files) {
  const ul = document.createElement("ul");
  ul.className = "report-list";
  files.forEach(({ file, desc }) => {
    const li = document.createElement("li");
    li.innerHTML = `<code>${file}</code> — ${desc}`;
    ul.appendChild(li);
  });
  return ul;
}

function makeCard(iconClass, iconChar, title, contentNode, full = false) {
  const card = document.createElement("div");
  card.className = "card" + (full ? " card--full" : "");

  card.innerHTML = `
    <div class="card__header">
      <span class="card__icon ${iconClass}">${iconChar}</span>
      <span class="card__title">${title}</span>
    </div>
  `;
  card.appendChild(contentNode);
  return card;
}

// ── Main render function ─────────────────────────────────────────────

function generateReport(name, typeKey, description) {
  const data = MOCK_DATA[typeKey];

  const container = document.createElement("div");

  // ── Report header
  const header = document.createElement("div");
  header.className = "report-header";
  header.innerHTML = `
    <div class="report-header__meta">
      <h2 class="report-header__title">${escapeHtml(name)}</h2>
      <span class="tag tag--type">${data.typeLabel}</span>
      <span class="tag tag--ready">&#10003; Report Ready</span>
    </div>
    <p class="report-header__desc">${escapeHtml(description)}</p>
  `;
  container.appendChild(header);

  // ── Grid
  const grid = document.createElement("div");
  grid.className = "report-grid";

  // 1. Overview (full width)
  const overviewDiv = document.createElement("div");
  overviewDiv.className = "overview-text";
  data.overview.forEach((para) => {
    const p = document.createElement("p");
    p.textContent = para;
    overviewDiv.appendChild(p);
  });
  grid.appendChild(makeCard("card__icon--blue", "&#128270;", "Project Overview", overviewDiv, true));

  // 2. Important Files
  grid.appendChild(makeCard("card__icon--yellow", "&#128193;", "Important Files", buildFileList(data.importantFiles)));

  // 3. Setup Steps
  grid.appendChild(makeCard("card__icon--green", "&#9881;", "Setup Steps", buildList(data.setupSteps, true)));

  // 4. Beginner Tasks (full width — interactive checklist)
  grid.appendChild(makeCard("card__icon--purple", "&#127919;", "Beginner-Friendly Tasks", buildTaskList(data.beginnerTasks)));

  // 5. Areas to Investigate (full width)
  grid.appendChild(makeCard("card__icon--red", "&#128269;", "Potential Areas to Investigate", buildList(data.investigate)));

  // 6. Setup Guide (full width — interactive checklist)
  const setupSteps = SETUP_DATA[typeKey];
  if (setupSteps) {
    const setupCard = makeCard("card__icon--green", "&#128295;", "Setup Guide", buildSetupGuide(setupSteps), true);
    setupCard.classList.add("card--setup");
    grid.appendChild(setupCard);
  }

  container.appendChild(grid);
  return container;
}

// ── Health report renderer ───────────────────────────────────────────

const STATUS_META = {
  good:      { label: "Good",               cssClass: "status--good",      icon: "&#10003;" },
  attention: { label: "Needs Attention",    cssClass: "status--attention", icon: "&#9888;"  },
  review:    { label: "Review Recommended", cssClass: "status--review",    icon: "&#9432;"  },
};

function generateHealthReport(name, typeKey) {
  const checks = HEALTH_DATA[typeKey];

  const container = document.createElement("div");
  container.className = "health-report";

  // ── Section divider + header
  const header = document.createElement("div");
  header.className = "health-header";
  header.innerHTML = `
    <div class="health-header__inner">
      <span class="health-header__icon">&#128203;</span>
      <div>
        <h3 class="health-header__title">Project Health Check</h3>
        <p class="health-header__sub">${escapeHtml(name)}</p>
      </div>
    </div>
  `;
  container.appendChild(header);

  // ── Summary counts
  const good      = checks.filter(c => c.status === "good").length;
  const attention = checks.filter(c => c.status === "attention").length;
  const review    = checks.filter(c => c.status === "review").length;
  const total     = checks.length;

  const summary = document.createElement("div");
  summary.className = "health-summary";
  summary.innerHTML = `
    <span class="health-summary__item health-summary__item--good">
      <strong>${good}</strong> Good
    </span>
    <span class="health-summary__item health-summary__item--attention">
      <strong>${attention}</strong> Need${attention !== 1 ? "" : "s"} Attention
    </span>
    <span class="health-summary__item health-summary__item--review">
      <strong>${review}</strong> Review Recommended
    </span>
    <span class="health-summary__total">${good} of ${total} areas passing</span>
  `;
  container.appendChild(summary);

  // ── Category rows
  const list = document.createElement("div");
  list.className = "health-list";

  checks.forEach(({ category, status, explanation }) => {
    const meta = STATUS_META[status];
    const row = document.createElement("div");
    row.className = "health-row";

    row.innerHTML = `
      <div class="health-row__top">
        <span class="health-row__category">${category}</span>
        <span class="health-status ${meta.cssClass}">${meta.icon} ${meta.label}</span>
      </div>
      <p class="health-row__explanation">${explanation}</p>
    `;
    list.appendChild(row);
  });

  container.appendChild(list);
  return container;
}

// ── Project Structure Explorer renderer ─────────────────────────────

/**
 * Recursively builds a <ul> tree for one node.
 * `infoPanel` is the shared <div> where explanations are shown.
 * `depth` controls indentation.
 */
function buildTreeNode(node, infoPanel, depth) {
  const isFolder = node.type === "folder";
  const hasChildren = isFolder && Array.isArray(node.children) && node.children.length > 0;

  const li = document.createElement("li");
  li.className = "tree-item";

  // ── Row button (click = show info; for folders also toggles children)
  const row = document.createElement("button");
  row.type = "button";
  row.className = "tree-row" + (isFolder ? " tree-row--folder" : " tree-row--file");
  row.setAttribute("aria-label", `${isFolder ? "Folder" : "File"}: ${node.name}`);
  row.style.paddingLeft = `${depth * 1.1 + 0.5}rem`;

  // Icon + name
  const icon = document.createElement("span");
  icon.className = "tree-icon";
  icon.setAttribute("aria-hidden", "true");

  const chevron = document.createElement("span");
  chevron.className = "tree-chevron";
  chevron.setAttribute("aria-hidden", "true");

  const label = document.createElement("span");
  label.className = "tree-label";
  label.textContent = node.name;

  if (isFolder) {
    icon.textContent = "📁";
    chevron.textContent = hasChildren ? "▸" : "";
    chevron.className += hasChildren ? " tree-chevron--toggle" : "";
  } else {
    icon.textContent = getFileIcon(node.name);
  }

  row.appendChild(chevron);
  row.appendChild(icon);
  row.appendChild(label);
  li.appendChild(row);

  // ── Children subtree (folders only, collapsed by default)
  let childUl = null;
  let expanded = false;

  if (hasChildren) {
    childUl = document.createElement("ul");
    childUl.className = "tree-children";
    childUl.hidden = true;
    node.children.forEach(child => {
      childUl.appendChild(buildTreeNode(child, infoPanel, depth + 1));
    });
    li.appendChild(childUl);
  }

  // ── Click handler
  row.addEventListener("click", () => {
    // Show explanation
    showTreeInfo(infoPanel, node.name, node.type, node.info);

    // Mark active row
    const allRows = infoPanel.closest(".explorer-report").querySelectorAll(".tree-row");
    allRows.forEach(r => r.classList.remove("tree-row--active"));
    row.classList.add("tree-row--active");

    // Toggle children open/closed
    if (hasChildren) {
      expanded = !expanded;
      childUl.hidden = !expanded;
      chevron.textContent = expanded ? "▾" : "▸";
    }
  });

  return li;
}

/** Returns a fitting emoji icon based on file extension or name. */
function getFileIcon(name) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".json"))                         return "📋";
  if (lower.endsWith(".md"))                           return "📖";
  if (lower.endsWith(".html") || lower.endsWith(".htm")) return "🌐";
  if (lower.endsWith(".css"))                          return "🎨";
  if (lower.endsWith(".js") || lower.endsWith(".jsx") || lower.endsWith(".ts") || lower.endsWith(".tsx")) return "⚙️";
  if (lower.endsWith(".py"))                           return "🐍";
  if (lower.endsWith(".java"))                         return "☕";
  if (lower.endsWith(".env") || lower.startsWith(".env")) return "🔑";
  if (lower.endsWith(".svg") || lower.endsWith(".png") || lower.endsWith(".jpg")) return "🖼️";
  if (lower.endsWith(".test.js") || lower.endsWith(".spec.js") || lower.endsWith(".test.jsx")) return "🧪";
  return "📄";
}

/** Updates the info panel with the clicked node's explanation. */
function showTreeInfo(panel, name, type, info) {
  panel.hidden = false;
  panel.innerHTML = `
    <div class="tree-info__header">
      <span class="tree-info__name">${escapeHtml(name)}</span>
      <span class="tree-info__badge tree-info__badge--${type}">${type}</span>
    </div>
    <p class="tree-info__text">${escapeHtml(info)}</p>
  `;
  // Subtle entrance
  panel.classList.remove("tree-info--visible");
  void panel.offsetWidth;
  panel.classList.add("tree-info--visible");
}

/** Builds the full Explorer section and returns a DOM node. */
function buildExplorer(name, typeKey) {
  const rootNode = TREE_DATA[typeKey];

  const container = document.createElement("div");
  container.className = "explorer-report";

  // ── Section header
  const header = document.createElement("div");
  header.className = "explorer-header";
  header.innerHTML = `
    <div class="explorer-header__inner">
      <span class="explorer-header__icon">🗂️</span>
      <div>
        <h3 class="explorer-header__title">Project Structure Explorer</h3>
        <p class="explorer-header__sub">${escapeHtml(name)} &mdash; click any file or folder to learn what it does</p>
      </div>
    </div>
  `;
  container.appendChild(header);

  // ── Two-column layout: tree + info panel
  const body = document.createElement("div");
  body.className = "explorer-body";

  // Info panel (initially hidden, populated on click)
  const infoPanel = document.createElement("div");
  infoPanel.className = "tree-info";
  infoPanel.hidden = true;
  infoPanel.innerHTML = `<p class="tree-info__hint">&#x2190; Click a file or folder to see what it does.</p>`;
  infoPanel.hidden = false; // show hint immediately

  // Tree
  const treeWrap = document.createElement("div");
  treeWrap.className = "tree-wrap";

  const ul = document.createElement("ul");
  ul.className = "tree-root";
  ul.appendChild(buildTreeNode(rootNode, infoPanel, 0));
  treeWrap.appendChild(ul);

  body.appendChild(treeWrap);
  body.appendChild(infoPanel);
  container.appendChild(body);

  return container;
}

// ── Scan / Code Quality data keyed by project type ───────────────────
// categories: { name, status, explanation }
// issues:     { severity, file, description, action }

const SCAN_DATA = {
  react: {
    categories: [
      {
        name: "Code Quality",
        status: "good",
        explanation: "Component files are well-structured and follow the single-responsibility principle. No overly long files detected. ESLint rules are applied consistently.",
      },
      {
        name: "Bugs",
        status: "attention",
        explanation: "Two components use state inside a useEffect without including it in the dependency array, which can cause stale-closure bugs that are hard to track down.",
      },
      {
        name: "Security",
        status: "review",
        explanation: "dangerouslySetInnerHTML is used in one component without sanitising the input first. This can allow cross-site scripting (XSS) attacks if the content comes from user input.",
      },
      {
        name: "Documentation",
        status: "attention",
        explanation: "Most components have no JSDoc comments. New contributors cannot understand props without reading the full component body. Consider adding PropTypes or TypeScript types.",
      },
      {
        name: "Maintainability",
        status: "good",
        explanation: "Dependencies are up to date. The component folder structure is logical and consistent. Utility functions are properly extracted into a shared helpers file.",
      },
    ],
    issues: [
      { severity: "high",   file: "src/components/Feed.jsx",    description: "dangerouslySetInnerHTML used without input sanitisation.", action: "Replace with a sanitisation library such as DOMPurify, or avoid rendering raw HTML entirely." },
      { severity: "medium", file: "src/hooks/useData.js",       description: "useEffect missing dependency array — runs after every render.", action: "Add the correct dependencies to the array, or use useCallback to stabilise the function reference." },
      { severity: "medium", file: "src/components/UserCard.jsx",description: "Missing PropTypes or TypeScript interface for component props.", action: "Add PropTypes validation or convert the file to TypeScript to document the expected prop shapes." },
      { severity: "low",    file: "src/utils/helpers.js",       description: "Three utility functions are exported but never imported anywhere.", action: "Remove dead code to keep the bundle size small and the codebase easy to navigate." },
      { severity: "low",    file: "src/App.jsx",                description: "Console.log statements left in production code.", action: "Remove all console.log calls before merging to the main branch." },
    ],
  },

  node: {
    categories: [
      {
        name: "Code Quality",
        status: "good",
        explanation: "Route handlers are concise and delegate business logic to service layer functions. Async/await is used consistently and error propagation follows a uniform pattern.",
      },
      {
        name: "Bugs",
        status: "attention",
        explanation: "Two async route handlers lack try/catch blocks. An unhandled promise rejection will crash the Node.js process in older versions and produce a 500 error with no useful message.",
      },
      {
        name: "Security",
        status: "attention",
        explanation: "User-supplied input is passed directly into a database query string in one endpoint without parameterisation. This is a SQL injection vulnerability.",
      },
      {
        name: "Documentation",
        status: "review",
        explanation: "No JSDoc or OpenAPI comments on route handlers. A new developer cannot discover which endpoints exist or what request/response shapes they expect without running the server.",
      },
      {
        name: "Maintainability",
        status: "good",
        explanation: "The project uses a consistent folder structure. Environment variables are loaded through dotenv and never hardcoded. The test suite covers all service-layer functions.",
      },
    ],
    issues: [
      { severity: "high",   file: "src/routes/userRoutes.js",   description: "Raw user input interpolated into SQL query string — SQL injection risk.", action: "Use parameterised queries or an ORM (Sequelize, Prisma) which escapes values automatically." },
      { severity: "high",   file: "src/controllers/auth.js",    description: "JWT secret falls back to a hardcoded string if the environment variable is missing.", action: "Throw an error at startup if required environment variables are absent, rather than falling back to a weak default." },
      { severity: "medium", file: "src/routes/productRoutes.js",description: "Async handler has no try/catch — unhandled rejection on database error.", action: "Wrap async route handlers with a utility wrapper or add explicit try/catch blocks." },
      { severity: "medium", file: "src/models/User.js",         description: "Password field has no minimum length validation at the schema level.", action: "Add a minlength validator to the Mongoose schema or a check in the service layer before saving." },
      { severity: "low",    file: "src/app.js",                 description: "CORS is configured with origin: '*' which allows requests from any domain.", action: "Restrict CORS to a list of known allowed origins appropriate for your deployment environment." },
    ],
  },

  python: {
    categories: [
      {
        name: "Code Quality",
        status: "good",
        explanation: "Views are short and readable. Business logic is extracted into service functions rather than living directly in view functions. Flake8 reports zero violations.",
      },
      {
        name: "Bugs",
        status: "review",
        explanation: "One view function catches a bare Exception instead of a specific exception class. This masks unexpected errors and makes debugging significantly harder.",
      },
      {
        name: "Security",
        status: "attention",
        explanation: "DEBUG=True is present in the committed settings file. This exposes a full stack trace and internal variable values to anyone who triggers an error in production.",
      },
      {
        name: "Documentation",
        status: "attention",
        explanation: "Docstrings are missing from all view functions and model methods. The Django admin is registered for all models but none have custom list_display or search_fields configured.",
      },
      {
        name: "Maintainability",
        status: "good",
        explanation: "requirements.txt pins exact package versions ensuring reproducible installs. The virtual environment is excluded from version control via .gitignore.",
      },
    ],
    issues: [
      { severity: "high",   file: "myapp/settings.py",    description: "DEBUG = True committed to version control. Stack traces exposed in production.", action: "Set DEBUG via an environment variable and ensure it defaults to False in production." },
      { severity: "high",   file: "myapp/settings.py",    description: "SECRET_KEY is hardcoded as a string literal, not read from an environment variable.", action: "Move SECRET_KEY to .env and load it with os.environ.get('SECRET_KEY') or django-environ." },
      { severity: "medium", file: "myapp/views.py",       description: "Bare except: clause catches all exceptions including KeyboardInterrupt and SystemExit.", action: "Replace with except SpecificException as e: and log the error with Python's logging module." },
      { severity: "medium", file: "myapp/models.py",      description: "No __str__ method on three model classes — admin panel displays 'Object (id)' instead of readable names.", action: "Add a __str__ method returning a human-readable representation such as the name or title field." },
      { severity: "low",    file: "myapp/views.py",       description: "Five view functions have no docstrings.", action: "Add a one-line docstring to each view describing its purpose, expected request method, and return value." },
    ],
  },

  java: {
    categories: [
      {
        name: "Code Quality",
        status: "good",
        explanation: "Controllers are thin and delegate to the service layer. Method names are descriptive and follow Java naming conventions. Checkstyle reports zero violations.",
      },
      {
        name: "Bugs",
        status: "attention",
        explanation: "Two service methods call Optional.get() without first checking isPresent(). If the value is absent this throws a NoSuchElementException at runtime.",
      },
      {
        name: "Security",
        status: "review",
        explanation: "Database credentials are present in application.properties which is committed to version control. Anyone with repository access can see the production password.",
      },
      {
        name: "Documentation",
        status: "attention",
        explanation: "Public service methods lack Javadoc. REST endpoints have no @Operation annotations for Swagger. A new developer cannot understand the API without running the application.",
      },
      {
        name: "Maintainability",
        status: "good",
        explanation: "The project uses Flyway for database migrations, ensuring schema changes are versioned. Unit tests cover 78% of the service layer. Dependencies are managed via Maven with pinned versions.",
      },
    ],
    issues: [
      { severity: "high",   file: "src/main/resources/application.properties", description: "DB_PASSWORD stored as plaintext in a committed config file.", action: "Externalise credentials to environment variables or use Spring Cloud Config / HashiCorp Vault." },
      { severity: "high",   file: "src/main/java/service/UserService.java",    description: "Optional.get() called without isPresent() check — throws at runtime.", action: "Use optional.orElseThrow(() -> new ResourceNotFoundException(...)) for explicit error handling." },
      { severity: "medium", file: "src/main/java/controller/UserController.java", description: "No input validation annotations on the request body DTO.", action: "Add @Valid to the @RequestBody parameter and annotate DTO fields with @NotNull, @Size, etc." },
      { severity: "medium", file: "src/main/java/service/ProductService.java", description: "N+1 query detected — loading products then fetching each category separately in a loop.", action: "Use a JOIN FETCH in the JPQL query or configure @EntityGraph to load the association eagerly." },
      { severity: "low",    file: "src/main/java/service/OrderService.java",   description: "Method is 120 lines long — exceeds the recommended 30-line maximum.", action: "Extract logical sub-steps into private helper methods with descriptive names." },
    ],
  },

  generic: {
    categories: [
      {
        name: "Code Quality",
        status: "review",
        explanation: "No linter configuration was found. Without automated style enforcement, different contributors produce inconsistent formatting, making code reviews harder and diffs noisier.",
      },
      {
        name: "Bugs",
        status: "attention",
        explanation: "Several functions have no return-value validation on external calls. If a called function returns null or undefined, dependent code will throw an unhandled error.",
      },
      {
        name: "Security",
        status: "attention",
        explanation: "No dependency vulnerability scan is configured. Out-of-date packages with known CVEs may be in use. Run a scan (npm audit, pip-audit, OWASP Dependency-Check) to assess exposure.",
      },
      {
        name: "Documentation",
        status: "attention",
        explanation: "README.md is present but lacks setup instructions, architecture overview, and API reference. New team members cannot onboard without asking colleagues for help.",
      },
      {
        name: "Maintainability",
        status: "review",
        explanation: "No test suite is configured. Changes cannot be verified automatically, making refactoring risky. Consider adding a testing framework appropriate for the language in use.",
      },
    ],
    issues: [
      { severity: "high",   file: "src/main.js",        description: "No input validation before processing user-supplied data.", action: "Validate and sanitise all external input before using it in logic, database calls, or output." },
      { severity: "high",   file: ".env (committed)",   description: "A .env file containing real credentials appears to be tracked by Git.", action: "Add .env to .gitignore immediately, rotate any exposed secrets, and use .env.example as the template." },
      { severity: "medium", file: "src/utils/api.js",   description: "Network requests have no error handling — failures silently return undefined.", action: "Wrap all fetch/axios calls in try/catch and handle error states explicitly in the UI or logging layer." },
      { severity: "medium", file: "README.md",          description: "Setup instructions are missing — new contributors cannot run the project.", action: "Add a Getting Started section with step-by-step setup commands for each supported OS." },
      { severity: "low",    file: "src/components/",    description: "Large files with multiple responsibilities detected in several modules.", action: "Apply the single-responsibility principle — each file or module should do one thing and do it well." },
    ],
  },
};

// ── Setup Guide renderer ─────────────────────────────────────────────

/**
 * Builds an interactive setup guide checklist.
 * Each step has: numbered badge, title, beginner explanation, optional
 * command snippet, and a checkbox. A progress bar updates on change.
 * Returns a wrapper <div>.
 */
function buildSetupGuide(steps) {
  const total = steps.length;

  const wrapper = document.createElement("div");
  wrapper.className = "setup-guide";

  // ── Progress row
  const progressRow = document.createElement("div");
  progressRow.className = "setup-progress";

  const counter = document.createElement("span");
  counter.className = "setup-progress__counter";
  counter.textContent = `0 of ${total} setup steps completed`;

  const track = document.createElement("div");
  track.className = "setup-progress__track";
  const fill = document.createElement("div");
  fill.className = "setup-progress__fill";
  fill.style.width = "0%";
  track.appendChild(fill);

  progressRow.appendChild(counter);
  progressRow.appendChild(track);
  wrapper.appendChild(progressRow);

  // ── Steps list
  const list = document.createElement("ol");
  list.className = "setup-list";

  const checkboxes = [];

  steps.forEach((step, index) => {
    const id = `setup-step-${index}-${Date.now()}`;

    const li = document.createElement("li");
    li.className = "setup-step";

    // Checkbox (hidden native, styled via CSS)
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.className = "setup-step__checkbox";
    checkboxes.push(checkbox);

    // Step number badge
    const badge = document.createElement("span");
    badge.className = "setup-step__badge";
    badge.setAttribute("aria-hidden", "true");
    badge.textContent = String(index + 1);

    // Content block: label wraps title + explanation
    const label = document.createElement("label");
    label.htmlFor = id;
    label.className = "setup-step__label";

    const title = document.createElement("span");
    title.className = "setup-step__title";
    title.textContent = step.title;

    const explanation = document.createElement("p");
    explanation.className = "setup-step__explanation";
    explanation.textContent = step.explanation;

    label.appendChild(title);
    label.appendChild(explanation);

    // Optional command snippet
    if (step.command) {
      const cmd = document.createElement("div");
      cmd.className = "setup-step__cmd";
      const pre = document.createElement("code");
      pre.textContent = step.command;
      cmd.appendChild(pre);
      label.appendChild(cmd);
    }

    li.appendChild(checkbox);
    li.appendChild(badge);
    li.appendChild(label);
    list.appendChild(li);

    // Update progress on change
    checkbox.addEventListener("change", () => {
      li.classList.toggle("setup-step--done", checkbox.checked);
      const done = checkboxes.filter(cb => cb.checked).length;
      counter.textContent = `${done} of ${total} setup step${total !== 1 ? "s" : ""} completed`;
      fill.style.width = `${(done / total) * 100}%`;
      counter.classList.toggle("setup-progress__counter--complete", done === total);
    });
  });

  wrapper.appendChild(list);
  return wrapper;
}

// ── Scan report renderer ─────────────────────────────────────────────

const SEVERITY_META = {
  high:   { label: "High",   cssClass: "severity--high",   icon: "&#9888;" },
  medium: { label: "Medium", cssClass: "severity--medium", icon: "&#9432;" },
  low:    { label: "Low",    cssClass: "severity--low",    icon: "&#8505;" },
};

function generateScanReport(name, typeKey) {
  const data = SCAN_DATA[typeKey];
  const { categories, issues } = data;

  // Tally summary counts
  const total      = categories.length;
  const passed     = categories.filter(c => c.status === "good").length;
  const attention  = categories.filter(c => c.status === "attention").length;
  const review     = categories.filter(c => c.status === "review").length;
  const highCount  = issues.filter(i => i.severity === "high").length;

  const container = document.createElement("div");
  container.className = "scan-report";

  // ── Header
  const header = document.createElement("div");
  header.className = "scan-header";
  header.innerHTML = `
    <div class="scan-header__inner">
      <span class="scan-header__icon">&#128269;</span>
      <div>
        <h3 class="scan-header__title">Issue &amp; Code Quality Scanner</h3>
        <p class="scan-header__sub">${escapeHtml(name)} &mdash; mock static analysis report</p>
      </div>
    </div>`;
  container.appendChild(header);

  // ── Summary bar
  const summary = document.createElement("div");
  summary.className = "scan-summary";
  summary.innerHTML = `
    <div class="scan-summary__stat">
      <span class="scan-summary__number">${total}</span>
      <span class="scan-summary__label">Total Checks</span>
    </div>
    <div class="scan-summary__divider"></div>
    <div class="scan-summary__stat scan-summary__stat--good">
      <span class="scan-summary__number">${passed}</span>
      <span class="scan-summary__label">Passed</span>
    </div>
    <div class="scan-summary__divider"></div>
    <div class="scan-summary__stat scan-summary__stat--warn">
      <span class="scan-summary__number">${attention}</span>
      <span class="scan-summary__label">Need Attention</span>
    </div>
    <div class="scan-summary__divider"></div>
    <div class="scan-summary__stat scan-summary__stat--review">
      <span class="scan-summary__number">${review}</span>
      <span class="scan-summary__label">Review Recommended</span>
    </div>
    <div class="scan-summary__divider"></div>
    <div class="scan-summary__stat scan-summary__stat--high">
      <span class="scan-summary__number">${highCount}</span>
      <span class="scan-summary__label">High-Priority Issues</span>
    </div>`;
  container.appendChild(summary);

  // ── Category checks
  const catSection = document.createElement("div");
  catSection.className = "scan-section";

  const catHeading = document.createElement("h4");
  catHeading.className = "scan-section__title";
  catHeading.textContent = "Category Results";
  catSection.appendChild(catHeading);

  const catList = document.createElement("div");
  catList.className = "scan-cat-list";

  categories.forEach(({ name: catName, status, explanation }) => {
    const meta = STATUS_META[status];
    const row = document.createElement("div");
    row.className = "scan-cat-row";
    row.innerHTML = `
      <div class="scan-cat-row__top">
        <span class="scan-cat-row__name">${catName}</span>
        <span class="health-status ${meta.cssClass}">${meta.icon} ${meta.label}</span>
      </div>
      <p class="scan-cat-row__explanation">${explanation}</p>`;
    catList.appendChild(row);
  });

  catSection.appendChild(catList);
  container.appendChild(catSection);

  // ── Issues Found list
  const issueSection = document.createElement("div");
  issueSection.className = "scan-section";

  const issueHeading = document.createElement("h4");
  issueHeading.className = "scan-section__title";
  issueHeading.textContent = "Issues Found";
  issueSection.appendChild(issueHeading);

  const issueList = document.createElement("div");
  issueList.className = "scan-issue-list";

  issues.forEach(({ severity, file, description, action }) => {
    const sev = SEVERITY_META[severity];
    const card = document.createElement("div");
    card.className = `scan-issue scan-issue--${severity}`;
    card.innerHTML = `
      <div class="scan-issue__top">
        <span class="scan-severity ${sev.cssClass}">${sev.icon} ${sev.label}</span>
        <code class="scan-issue__file">${escapeHtml(file)}</code>
      </div>
      <p class="scan-issue__desc">${escapeHtml(description)}</p>
      <div class="scan-issue__action">
        <span class="scan-issue__action-label">&#128161; Suggested fix:</span>
        <span class="scan-issue__action-text">${escapeHtml(action)}</span>
      </div>`;
    issueList.appendChild(card);
  });

  issueSection.appendChild(issueList);
  container.appendChild(issueSection);

  return container;
}

/** Escape user-supplied text before inserting into innerHTML */
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ── Event wiring ─────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  const analyzeBtn        = document.getElementById("analyzeBtn");
  const errorMsg          = document.getElementById("errorMsg");
  const reportPanel       = document.getElementById("reportPanel");
  const reportContent     = document.getElementById("reportContent");
  const reportPlaceholder = document.getElementById("reportPlaceholder");
  const healthBtn         = document.getElementById("healthBtn");
  const healthErrorMsg    = document.getElementById("healthErrorMsg");
  const healthContent     = document.getElementById("healthContent");

  // ── Analyze Project ──────────────────────────────────────────────
  analyzeBtn.addEventListener("click", () => {
    const name = document.getElementById("projectName").value.trim();
    const type = document.getElementById("projectType").value;
    const desc = document.getElementById("projectDesc").value.trim();

    // ── Validation
    if (!name || !type || !desc) {
      errorMsg.textContent = "Please fill in all fields before analyzing.";
      return;
    }
    errorMsg.textContent = "";

    // ── Build report
    const reportNode = generateReport(name, type, desc);

    // ── Inject into DOM (clear previous, then insert)
    reportContent.innerHTML = "";
    reportContent.appendChild(reportNode);

    // ── Show report, hide placeholder
    reportPlaceholder.style.display = "none";
    reportContent.hidden = false;

    // ── Restart the CSS animation by toggling the class
    reportContent.classList.remove("report-content");
    void reportContent.offsetWidth; // trigger reflow
    reportContent.classList.add("report-content");

    // ── Scroll report into view on mobile
    if (window.innerWidth <= 860) {
      reportPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // ── Run Health Check ─────────────────────────────────────────────
  healthBtn.addEventListener("click", () => {
    const name = document.getElementById("projectName").value.trim();
    const type = document.getElementById("projectType").value;

    if (!name || !type) {
      healthErrorMsg.textContent = "Please enter a project name and type first.";
      return;
    }
    healthErrorMsg.textContent = "";

    // ── Build health report
    const healthNode = generateHealthReport(name, type);

    // ── Inject (clear previous, then insert)
    healthContent.innerHTML = "";
    healthContent.appendChild(healthNode);

    // ── Hide placeholder if still showing, show health panel
    reportPlaceholder.style.display = "none";
    healthContent.hidden = false;

    // ── Animate
    healthContent.classList.remove("health-content");
    void healthContent.offsetWidth;
    healthContent.classList.add("health-content");

    // ── Scroll into view on mobile
    if (window.innerWidth <= 860) {
      healthContent.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // ── Explore Structure ────────────────────────────────────────────
  const explorerBtn      = document.getElementById("explorerBtn");
  const explorerErrorMsg = document.getElementById("explorerErrorMsg");
  const explorerContent  = document.getElementById("explorerContent");

  explorerBtn.addEventListener("click", () => {
    const name = document.getElementById("projectName").value.trim();
    const type = document.getElementById("projectType").value;

    if (!name || !type) {
      explorerErrorMsg.textContent = "Please enter a project name and type first.";
      return;
    }
    explorerErrorMsg.textContent = "";

    // ── Build explorer
    const explorerNode = buildExplorer(name, type);

    // ── Inject (clear previous, then insert)
    explorerContent.innerHTML = "";
    explorerContent.appendChild(explorerNode);

    // ── Hide placeholder if still showing, show explorer panel
    reportPlaceholder.style.display = "none";
    explorerContent.hidden = false;

    // ── Animate
    explorerContent.classList.remove("explorer-content");
    void explorerContent.offsetWidth;
    explorerContent.classList.add("explorer-content");

    // ── Scroll into view on mobile
    if (window.innerWidth <= 860) {
      explorerContent.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // ── Scan Project ─────────────────────────────────────────────────
  const scanBtn      = document.getElementById("scanBtn");
  const scanErrorMsg = document.getElementById("scanErrorMsg");
  const scanContent  = document.getElementById("scanContent");

  scanBtn.addEventListener("click", () => {
    const name = document.getElementById("projectName").value.trim();
    const type = document.getElementById("projectType").value;

    if (!name || !type) {
      scanErrorMsg.textContent = "Please enter a project name and type first.";
      return;
    }
    scanErrorMsg.textContent = "";

    // Build scan report
    const scanNode = generateScanReport(name, type);

    // Inject (clear previous, then insert)
    scanContent.innerHTML = "";
    scanContent.appendChild(scanNode);

    // Hide placeholder, show scan panel
    reportPlaceholder.style.display = "none";
    scanContent.hidden = false;

    // Animate
    scanContent.classList.remove("scan-content");
    void scanContent.offsetWidth;
    scanContent.classList.add("scan-content");

    // Scroll into view on mobile
    if (window.innerWidth <= 860) {
      scanContent.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
