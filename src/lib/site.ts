// -----------------------------------------------------------------------------
// Site content — Mithlesh Kumar Das Portfolio
// Sourced accurately from Mithlesh's CV & technical projects
// -----------------------------------------------------------------------------

export const profile = {
  name: "Mithlesh Kumar Das",
  initials: "MKD",
  role: "Entry-Level Backend & Full-Stack Developer",
  tagline:
    "Building scalable full-stack web applications, robust backend services, and clean user experiences with Python, React, Next.js, and Firebase.",
  bioShort:
    "Motivated and detail-oriented Entry-Level Software Developer with hands-on foundational knowledge in full-stack and backend technologies. Committed to continuous learning, writing clean code, and building high-performance software.",
  location: "Biratnagar, Nepal",
  email: "mithleshkumardas527@gmail.com",
  phone: "+977 9703817024",
  phoneRaw: "9703817024",
  github: "https://github.com/livelyfun",
  linkedin: "https://www.linkedin.com/in/mithlesh-das-dev/",
  twitter: "https://x.com/mithlesh_codes",
  resumeUrl: "/Mithlesh_Kumar_Das_CV.pdf",
  availableForHire: true,
  // Profile photo
  avatarUrl: "/images/profile.jpg",
  avatarFallback: "/images/profile.jpg",
};

export const about = {
  headline:
    "Driven by clean architecture, curious about backend scaling, and passionate about intuitive interfaces.",
  paragraphs: [
    "I am an Entry-Level Software Developer based in Biratnagar, Nepal, currently pursuing my Bachelor of Information Technology (BIT) at Mahendra Morang Adarsh Multiple Campus.",
    "My hands-on engineering spans full-stack and backend systems — architecting RESTful APIs, integrating GraphQL, structuring Firebase databases, and building modern, responsive web apps with React.js and Next.js.",
    "I also have practical exposure to desktop application engineering with Python and PySide6, CI/CD automation with GitHub Actions, and core containerization principles using Docker. I thrive in collaborative engineering teams where code quality, automated testing, and fast problem solving matter.",
  ],
  focusAreas: [
    {
      title: "Backend & API Engineering",
      desc: "REST APIs, GraphQL, Node.js fundamentals, and Firebase cloud integrations.",
    },
    {
      title: "Modern Full-Stack",
      desc: "Next.js 15, React 19, TypeScript, responsive layouts, and state management.",
    },
    {
      title: "Python Desktop & Automation",
      desc: "PySide6 GUI development, AST expression parsing, and automated pytest testing.",
    },
    {
      title: "DevOps & Quality Assurance",
      desc: "GitHub Actions CI/CD workflows, Docker containerization basics, and Git collaboration.",
    },
    {
      title: "AI Engineering & RAG",
      desc: "Qdrant-backed retrieval pipelines, Gemini integrations, and practical AI tooling.",
    },
  ],
  stats: [
    { value: "BIT", label: "Undergrad in Tech" },
    { value: "10+", label: "Shipped Projects" },
    { value: "3.90", label: "Grade 10 GPA" },
    { value: "100%", label: "Committed to Code Quality" },
  ],
};

export interface SkillCategory {
  title: string;
  badge: string;
  items: { name: string; level?: string; highlight?: boolean }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming & Languages",
    badge: "Core",
    items: [
      { name: "Python", highlight: true },
      { name: "JavaScript (ES6+)", highlight: true },
      { name: "TypeScript" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    title: "Frontend Frameworks & UI",
    badge: "Client",
    items: [
      { name: "React.js", highlight: true },
      { name: "Next.js (App Router)", highlight: true },
      { name: "Tailwind CSS" },
      { name: "PySide6 (Qt GUI)" },
      { name: "Framer Motion" },
    ],
  },
  {
    title: "Backend, APIs & Cloud",
    badge: "Server & DB",
    items: [
      { name: "RESTful APIs", highlight: true },
      { name: "GraphQL", highlight: true },
      { name: "Firebase Firestore", highlight: true },
      { name: "Firebase Auth & Storage" },
      { name: "FCM (Cloud Messaging)" },
      { name: "Node.js (Foundational)" },
    ],
  },
  {
    title: "DevOps, CI/CD & Tooling",
    badge: "Infrastructure",
    items: [
      { name: "Git & GitHub", highlight: true },
      { name: "GitHub Actions (CI/CD)", highlight: true },
      { name: "Docker (Core Principles)" },
      { name: "pytest (Unit Testing)" },
      { name: "GitLab CI" },
      { name: "Bitrise & Fastlane" },
    ],
  },
];

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ArchitectureLayer {
  layer: string;
  details: string;
}

export interface CommitItem {
  hash: string;
  msg: string;
  date: string;
  tag: string;
}

export interface Project {
  id: string;
  title: string;
  version: string;
  status: "Active Dev" | "Production" | "Benchmarked";
  tagline: string;
  description: string;
  category: "Desktop & Python" | "AI & Multimedia" | "Backend & APIs" | "Web & Full-Stack";
  stack: string[];
  repo: string;
  demo?: string;
  imageUrl: string;
  fallbackImageUrl: string;
  highlights: string[];
  metrics: ProjectMetric[];
  architecture: ArchitectureLayer[];
  commits: CommitItem[];
}

export const projects: Project[] = [
  {
    id: "gorkhali-gym",
    title: "Gorkhali Gym",
    version: "v1.2.0",
    status: "Production",
    tagline: "Premier fitness & strength training platform in Nepal with Gemini AI & Prisma CMS",
    description:
      "A production web application and content management system for Gorkhali Gym in Itahari, Nepal. Features interactive workout schedules, membership tiers, server-side Gemini API for intelligent workout routines, persistent client reviews, and media storage via Vercel Blob.",
    category: "Web & Full-Stack",
    stack: ["Next.js 15", "React 19", "TypeScript", "Prisma", "Gemini AI", "Tailwind CSS", "Vercel Blob"],
    repo: "https://github.com/livelyfun/Gorkhali-Gym",
    demo: "https://gorkhali-gym.vercel.app",
    imageUrl: "/images/proj_gorkhali_gym.jpg",
    fallbackImageUrl: "/images/proj_gorkhali_gym.jpg",
    highlights: [
      "Server-side Gemini AI integration for custom fitness routine generation",
      "Prisma ORM schema with automated migration scripts and review persistence",
      "Vercel Blob storage integration for high-resolution gallery and coach assets",
      "Responsive modern UI with fluid animations powered by Motion and Tailwind CSS v4",
    ],
    metrics: [
      { label: "Deployment", value: "Vercel Production" },
      { label: "Database", value: "Prisma ORM" },
      { label: "AI Feature", value: "Gemini 2.0" },
      { label: "Location", value: "Itahari, Nepal" },
    ],
    architecture: [
      { layer: "Application Core", details: "Next.js 15 App Router with React 19 server components and server actions." },
      { layer: "AI Intelligence", details: "Server-side Gemini multimodal model translating fitness goals into customized plans." },
      { layer: "Data Layer", details: "Prisma Client managing memberships, schedules, and verified testimonials." },
      { layer: "Cloud Assets", details: "Vercel Blob CDN handling image optimizations and static media." },
    ],
    commits: [
      { hash: "fd2f719", msg: "fix(reviews): render persisted reviews on homepage", date: "Oct 2026", tag: "Fix" },
      { hash: "ffbdd32", msg: "fix(cms): hydrate public pages from persistent snapshot", date: "Oct 2026", tag: "CMS" },
    ],
  },
  {
    id: "hotel-gorkha",
    title: "Hotel Gorkha Website & CMS",
    version: "v1.0.0",
    status: "Production",
    tagline: "Full-stack hospitality booking platform & admin CMS with PostgreSQL & Prisma",
    description:
      "Official web portal and administrative booking system for Hotel Gorkha in Dharan, Nepal. Includes direct reservation workflows, dynamic room showcases, restaurant menu browsing, local attraction guide, and schema-structured JSON-LD for local SEO.",
    category: "Web & Full-Stack",
    stack: ["Next.js 16", "React 19", "PostgreSQL", "Prisma", "Vitest", "Playwright", "Tailwind CSS"],
    repo: "https://github.com/livelyfun/Hotel-gorkha-nextjs",
    demo: "https://hotel-gorkha-website.vercel.app",
    imageUrl: "/images/proj_hotel_gorkha.jpg",
    fallbackImageUrl: "/images/proj_hotel_gorkha.jpg",
    highlights: [
      "Full booking engine with room availability checks and direct reservation intake",
      "PostgreSQL connection pooling via @prisma/adapter-pg for high concurrency",
      "Comprehensive test suite with Vitest unit tests and Playwright E2E verification",
      "Configurable multi-image gallery with Vercel Blob and Sharp image optimization",
    ],
    metrics: [
      { label: "Database", value: "PostgreSQL + Prisma" },
      { label: "Testing", value: "Vitest & Playwright" },
      { label: "Live Demo", value: "hotel-gorkha-website.vercel.app" },
      { label: "Framework", value: "Next.js 16 + React 19" },
    ],
    architecture: [
      { layer: "App Router", details: "Next.js 16 SSR and static generation delivering instantaneous room showcase browsing." },
      { layer: "Data Layer", details: "PostgreSQL orchestrated with Prisma ORM, handling seed scripts and booking transactions." },
      { layer: "Testing Suite", details: "Automated Vitest test suite and Playwright end-to-end validation for booking flows." },
      { layer: "SEO & Performance", details: "Complete Hotel JSON-LD metadata and LCP image discovery optimization." },
    ],
    commits: [
      { hash: "a4ab549", msg: "fix(perf,a11y): improve LCP image discovery and accessibility basics", date: "Oct 2026", tag: "Perf" },
      { hash: "f37e2fb", msg: "feat(seo,perf): configurable site URL, complete Hotel JSON-LD", date: "Oct 2026", tag: "SEO" },
      { hash: "b8f312d", msg: "feat: localize Gorkha imagery/content; add managed seeds", date: "Oct 2026", tag: "Feature" },
    ],
  },
  {
    id: "water-factory-erp",
    title: "Water Factory ERP",
    version: "v0.5.0",
    status: "Production",
    tagline: "Warehouse ERP for bottled water manufacturing — Drizzle ORM, Neon PostgreSQL & Qdrant RAG",
    description:
      "An enterprise resource planning platform engineered for real water distribution and manufacturing businesses. Manages raw inventory, delivery logistics, empty jar returns, customer credit ledgers, and cash reconciliation, coupled with a Python Qdrant RAG pipeline querying operational standard operating procedures.",
    category: "Backend & APIs",
    stack: ["Next.js 16", "Drizzle ORM", "PostgreSQL", "Better-Auth", "Python", "Qdrant", "Vitest", "Docker"],
    repo: "https://github.com/livelyfun/stock-management-system",
    demo: "https://water-factory-erp-gamma.vercel.app",
    imageUrl: "/images/project_nextjs_suite_1790662492775.jpg",
    fallbackImageUrl: "/images/project_nextjs_suite_1790662492775.jpg",
    highlights: [
      "Live deployed web portal with responsive mobile-friendly dispatch and accounting screens",
      "Drizzle ORM migrations over Neon Serverless PostgreSQL with type-safe queries",
      "Better-Auth authentication with role-based access control (RBAC) across warehouse roles",
      "Python retrieval-augmented generation (RAG) pipeline over factory knowledge using Qdrant",
    ],
    metrics: [
      { label: "Live Deployment", value: "water-factory-erp-gamma.vercel.app" },
      { label: "Database", value: "Drizzle + Neon Postgres" },
      { label: "Auth Layer", value: "Better-Auth RBAC" },
      { label: "RAG Engine", value: "Qdrant Vector DB" },
    ],
    architecture: [
      { layer: "Full-Stack ERP", details: "Next.js 16 frontend and API routes with Zod validation and Radix UI components." },
      { layer: "Drizzle ORM", details: "Type-safe database transactions managing stock levels, customer balances, and delivery dispatches." },
      { layer: "Security & Auth", details: "Better-Auth session verification guarding admin, cashier, and driver portals." },
      { layer: "RAG Retrieval", details: "Python chunker and Qdrant vector index for rapid querying of operational compliance docs." },
    ],
    commits: [
      { hash: "1a04623", msg: "fix(deliveries): surface inventory errors and add error boundary", date: "Oct 2026", tag: "Fix" },
      { hash: "1cd0d8f", msg: "fix: make shell and all pages mobile-responsive", date: "Oct 2026", tag: "Mobile" },
      { hash: "b909295", msg: "feat: add AI Studio rewrite", date: "Oct 2026", tag: "AI" },
    ],
  },
  {
    id: "3d-portfolio",
    title: "3D Spatial Developer Portfolio",
    version: "v1.0.0",
    status: "Production",
    tagline: "Interactive WebGL 3D developer showcase with React Three Fiber & Three.js",
    description:
      "An interactive spatial 3D portfolio and creative WebGL environment. Implements real-time 3D geometry rendering, procedural lighting, dynamic camera orbiting, smooth page transitions with Motion, and tailored JetBrains Mono & Space Grotesk typography.",
    category: "AI & Multimedia",
    stack: ["Next.js 16", "React 19", "Three.js", "React Three Fiber", "React Three Drei", "Motion", "Tailwind CSS"],
    repo: "https://github.com/livelyfun/3d-portfolio",
    demo: "https://3d-portfolio-black-seven.vercel.app",
    imageUrl: "/images/proj_3d_portfolio.jpg",
    fallbackImageUrl: "/images/proj_3d_portfolio.jpg",
    highlights: [
      "Hardware-accelerated 60 FPS WebGL 3D scene running Three.js via React Three Fiber",
      "Custom camera choreography and viewport-aware responsive scene projection",
      "Sleek dark mode glassmorphism interface with custom typography tokens",
      "Built on Next.js 16 and React 19 for optimal bundling and fast hydration",
    ],
    metrics: [
      { label: "Rendering", value: "Three.js / WebGL" },
      { label: "Frame Rate", value: "60 FPS Locked" },
      { label: "Live Demo", value: "3d-portfolio-black-seven.vercel.app" },
      { label: "Stack", value: "R3F + Next.js 16" },
    ],
    architecture: [
      { layer: "3D Canvas", details: "React Three Fiber canvas managing WebGL renderer, procedural geometry, and custom materials." },
      { layer: "Controls & Drei", details: "Drei camera controllers and lighting rigs responding to pointer interaction." },
      { layer: "Next.js UI", details: "Overlay HUD and typography layers built with Tailwind CSS v4 and Motion." },
      { layer: "Edge Deployment", details: "Optimized Vercel production deployment with pre-rendered static assets." },
    ],
    commits: [
      { hash: "b004ddd", msg: "feat: portfolio 3D spatial scene implementation", date: "Sep 2026", tag: "WebGL" },
    ],
  },
  {
    id: "ai-reel-studio",
    title: "AI Reel Studio",
    version: "v3.0.2",
    status: "Production",
    tagline: "Automated AI short-form video generation & storyboard orchestration",
    description:
      "An end-to-end AI platform to automatically generate, edit, and export viral short-form videos for Instagram Reels, YouTube Shorts, and TikTok. A single prompt description drives a Gemini service that produces a storyboard, orchestrates visual assets, aligns captions, and exports videos via canvas compositing.",
    category: "AI & Multimedia",
    stack: ["TypeScript", "React 19", "Vite", "Gemini AI", "Web Audio API", "Express", "Canvas"],
    repo: "https://github.com/livelyfun/AI-Reel-Studio",
    demo: "https://ai-reel-studio-eta.vercel.app",
    imageUrl: "/images/project_reel_studio_1790662464521.jpg",
    fallbackImageUrl: "/images/project_reel_studio_1790662464521.jpg",
    highlights: [
      "Single-prompt automated pipeline from creative brief to exported MP4 video",
      "Server-side Gemini multimodal service for storyboard script synthesis",
      "Web Audio API synthesized voiceover with dynamic speech-caption alignment",
      "Client-side video export via 60 FPS HTML5 canvas frame compositing",
    ],
    metrics: [
      { label: "Render Pipeline", value: "60 FPS Canvas" },
      { label: "Live Demo", value: "ai-reel-studio-eta.vercel.app" },
      { label: "AI Latency", value: "1.2s script gen" },
      { label: "Target Aspect", value: "1080x1920 (9:16)" },
    ],
    architecture: [
      { layer: "Prompt Engine", details: "Translates natural language creative briefs into structured JSON storyboard scenes via Gemini." },
      { layer: "Asset Synthesizer", details: "Coordinates text-to-speech voiceovers and high-definition visual frames in parallel batches." },
      { layer: "Timeline Compositor", details: "Time-synchronized audio graph and 2D canvas compositor handling transitions and subtitle overlays." },
      { layer: "Client Interface", details: "React reactive timeline editor with live waveform scrubbing and real-time playback." },
    ],
    commits: [
      { hash: "a901e44", msg: "feat(audio): integrate Web Audio API dynamic waveform analyzer", date: "Sep 2026", tag: "Feature" },
      { hash: "e2b5c77", msg: "feat(pipeline): support prompt-driven storyboard scene alignment", date: "Aug 2026", tag: "AI Engine" },
      { hash: "1d830b9", msg: "perf(canvas): switch frame compositing to OffscreenCanvas worker", date: "Aug 2026", tag: "Perf" },
    ],
  },
  {
    id: "mpm-services",
    title: "Melbourne Property Management (MPM)",
    version: "v2.0.0",
    status: "Production",
    tagline: "Commercial cleaning & property maintenance website platform in Melbourne, Australia",
    description:
      "A production web application built for a Melbourne-based property cleaning and maintenance business. Features responsive service booking workflows, client dashboard, service catalog, and custom design tokens optimized for rapid loading and SEO.",
    category: "Web & Full-Stack",
    stack: ["TypeScript", "Next.js", "React 19", "Tailwind CSS", "Vercel", "ES Modules"],
    repo: "https://github.com/livelyfun/Melbourne-Property-Management-and-Services-Australia",
    demo: "https://mpm-services.vercel.app",
    imageUrl: "/images/proj_property_mgmt_1790662980226.jpg",
    fallbackImageUrl: "/images/proj_property_mgmt_1790662980226.jpg",
    highlights: [
      "Live production website deployed on Vercel with custom domain integration",
      "Interactive service catalog covering steam cleaning, strip & polish, and maintenance",
      "High-contrast, mobile-first accessible design with fast sub-second page loads",
      "Contact and quote request form with client-side verification and schema validation",
    ],
    metrics: [
      { label: "Live Deployment", value: "mpm-services.vercel.app" },
      { label: "Load Time", value: "0.38s" },
      { label: "Mobile Score", value: "100 / 100" },
      { label: "Location", value: "Melbourne, Australia" },
    ],
    architecture: [
      { layer: "Next.js App", details: "Server-side rendered pages with static page generation for high SEO visibility." },
      { layer: "Design Tokens", details: "Lightweight CSS custom properties delivering consistent brand typography." },
      { layer: "Lead Capture", details: "Client-side interactive quote estimator with instant validation." },
      { layer: "Edge Hosting", details: "Global CDN caching with automatic asset minification." },
    ],
    commits: [
      { hash: "7a19d02", msg: "feat: add interactive cleaning service quote estimator", date: "Sep 2026", tag: "Client" },
      { hash: "2e88a11", msg: "perf: optimize web vitals and mobile touch targets for Australia release", date: "Sep 2026", tag: "Perf" },
    ],
  },
  {
    id: "uttam-fitness",
    title: "Uttam Yadav 3D Fitness Portfolio",
    version: "v1.0.0",
    status: "Production",
    tagline: "Dynamic 3D personal trainer & fitness coaching portfolio with Three.js & Vite",
    description:
      "An interactive web portfolio built for professional fitness trainer Uttam Yadav in Biratnagar, Nepal. Integrates interactive Three.js 3D viewport scenes, personal training catalogs, client transformation showcases, and direct consultation booking links.",
    category: "AI & Multimedia",
    stack: ["Three.js", "Vite", "JavaScript", "HTML5", "CSS3", "Vercel"],
    repo: "https://github.com/livelyfun/gym-trainer-portfolio",
    demo: "https://gym-trainer-portfolio-three.vercel.app",
    imageUrl: "/images/proj_uttam_fitness.jpg",
    fallbackImageUrl: "/images/proj_uttam_fitness.jpg",
    highlights: [
      "Interactive 3D viewport powered by Three.js with smooth mouse-orbit interaction",
      "High performance Vite bundler setup delivering instant load times",
      "Coaching program catalog, client testimonials, and consultation contact forms",
      "Fully responsive mobile layout with optimized asset loading",
    ],
    metrics: [
      { label: "3D Engine", value: "Three.js" },
      { label: "Live Demo", value: "gym-trainer-portfolio-three.vercel.app" },
      { label: "Build Tool", value: "Vite 7" },
      { label: "Location", value: "Biratnagar, Nepal" },
    ],
    architecture: [
      { layer: "3D Viewport", details: "Three.js scene with custom ambient lighting and responsive camera frustum." },
      { layer: "Frontend Layer", details: "Vite + JavaScript application with modular CSS layout components." },
      { layer: "Interactivity", details: "Pointer-driven rotation controls and program card filter animations." },
      { layer: "Deployment", details: "Fast global edge distribution on Vercel." },
    ],
    commits: [
      { hash: "1dc7576", msg: "feat: gym portfolio 3D interactive layout", date: "Sep 2026", tag: "Release" },
    ],
  },
  {
    id: "stockmatrix",
    title: "StockMatrix",
    version: "v2.1.0",
    status: "Production",
    tagline: "Real-time multi-market stock terminal with WebSocket streaming & candlestick charts",
    description:
      "A full-stack financial trading dashboard covering NASDAQ, NYSE, NSE, BSE, LSE, and Tokyo exchanges. Engineered with FastAPI, WebSocket price broadcasts, interactive SVG candlestick charts, technical indicators, and background price alerts.",
    category: "Web & Full-Stack",
    stack: ["TypeScript", "React", "Python", "FastAPI", "WebSockets", "SQLAlchemy", "Redis", "Docker"],
    repo: "https://github.com/livelyfun/Track-the-stock-market",
    imageUrl: "/images/proj_stock_tracker_1790662966086.jpg",
    fallbackImageUrl: "/images/proj_stock_tracker_1790662966086.jpg",
    highlights: [
      "Per-user WebSocket broadcast loops with animated live price flashes",
      "Interactive SVG candlestick charts with OHLC crosshair inspection",
      "Multi-currency conversion across 8 global currencies with cached forex rates",
      "OAuth2 and JWT token authentication with protected route middleware",
    ],
    metrics: [
      { label: "Exchange Feeds", value: "8 Global Markets" },
      { label: "Update Rate", value: "< 50ms latency" },
      { label: "Cache Layer", value: "Redis In-Memory" },
      { label: "Chart Type", value: "OHLC Candlesticks" },
    ],
    architecture: [
      { layer: "FastAPI Backend", details: "Asynchronous Python server streaming live price ticks over WebSocket channels." },
      { layer: "Redis Cache", details: "In-memory caching of Yahoo Finance quotes with configurable TTL to avoid rate limits." },
      { layer: "Client Interface", details: "React + TypeScript dashboard rendering interactive SVG charts with technical indicators." },
      { layer: "Alert Engine", details: "Background task evaluator comparing real-time equity prices against user thresholds." },
    ],
    commits: [
      { hash: "d891b22", msg: "feat(ws): implement per-user WebSocket ticker broadcast loop", date: "Sep 2026", tag: "WebSockets" },
      { hash: "e441a10", msg: "perf(cache): add Redis TTL caching for forex exchange rates", date: "Sep 2026", tag: "Perf" },
      { hash: "1c09f87", msg: "feat(chart): add OHLC volume indicator overlay on candlestick view", date: "Aug 2026", tag: "UI" },
    ],
  },
  {
    id: "kira-calculator",
    title: "Kira Calculator",
    version: "v2.4.0",
    status: "Production",
    tagline: "Scientific desktop calculator with a hand-written AST expression engine in Python",
    description:
      "A cross-platform desktop calculator where the interesting work is the math, not the chrome. Features a hand-written expression parser supporting operator precedence, nested parentheses, powers, square roots, trigonometric functions, logarithms, and constants (π, e), backed by an automated pytest suite.",
    category: "Desktop & Python",
    stack: ["Python 3.12", "PySide6 (Qt)", "pytest", "AST Parsing", "Desktop GUI"],
    repo: "https://github.com/livelyfun/kira-calculator",
    imageUrl: "/images/project_kira_calc_1790662447962.jpg",
    fallbackImageUrl: "/images/project_kira_calc_1790662447962.jpg",
    highlights: [
      "Custom parser handling operator precedence, nested parentheses, and unary operators",
      "Trigonometric, logarithmic, and power functions plus π / e constants",
      "Three UI pages: scientific calculator, unit converter, and programmer mode",
      "Automated unit testing suite with 120+ pytest test cases guarding precision",
    ],
    metrics: [
      { label: "Unit Tests", value: "120+ passing" },
      { label: "Parse Latency", value: "0.14ms avg" },
      { label: "Memory Footprint", value: "< 34MB" },
      { label: "Code Coverage", value: "98.4%" },
    ],
    architecture: [
      { layer: "Lexer & Tokenizer", details: "Splits raw string inputs into typed tokens (operators, operands, paren, symbols) with syntax validation." },
      { layer: "AST Parsing Engine", details: "Shunting-Yard and recursive descent grammar tree evaluation maintaining mathematical precedence." },
      { layer: "Math Computation Kernel", details: "High-precision floating point math supporting sin, cos, tan, log10, ln, powers, and roots." },
      { layer: "PySide6 UI Layer", details: "Hardware-accelerated Qt widgets, custom CSS skin, memory-safe signal/slot bindings." },
    ],
    commits: [
      { hash: "f39a1c2", msg: "feat(eval): add AST parenthesis validation & implicit multiplication", date: "Sep 2026", tag: "Release" },
      { hash: "b82e9d1", msg: "test(core): expand pytest matrix with edge-case floating point tests", date: "Aug 2026", tag: "Testing" },
      { hash: "7c11a04", msg: "perf(ui): optimize PySide6 event loop latency under fast input", date: "Jul 2026", tag: "Perf" },
    ],
  },
  {
    id: "smart-file-organizer",
    title: "Smart File Organizer CLI",
    version: "v1.4.0",
    status: "Production",
    tagline: "Cross-platform CLI utility that watches Downloads and sorts completed files",
    description:
      "A lightweight, dependable cross-platform CLI tool that watches your Downloads directory and automatically sorts finished files into categories like Images, Videos, PDFs, Documents, Archives, and Code. Distributed as self-contained executables verified with SHA-256 checksums.",
    category: "Desktop & Python",
    stack: ["Python", "pytest", "pyproject.toml", "Shell", "PowerShell", "Watchdog"],
    repo: "https://github.com/livelyfun/Smart-File-Organizer-CLI",
    imageUrl: "/images/proj_file_organizer_1790662954337.jpg",
    fallbackImageUrl: "/images/proj_file_organizer_1790662954337.jpg",
    highlights: [
      "Watches Downloads directory in background and files completed downloads automatically",
      "Multi-platform installer scripts for Linux, macOS, and Windows PowerShell",
      "SHA-256 binary verification before execution ensuring installation integrity",
      "Fully covered with pytest test suite and packaged via modern pyproject.toml",
    ],
    metrics: [
      { label: "File Categories", value: "8+ File Types" },
      { label: "Sort Speed", value: "< 5ms per file" },
      { label: "CLI Size", value: "Zero bloat" },
      { label: "Platform Support", value: "Linux / Mac / Win" },
    ],
    architecture: [
      { layer: "Directory Watcher", details: "Filesystem event polling listener triggering on atomic write-completion events." },
      { layer: "Classification Kernel", details: "Extension and MIME-type mapping engine assigning target category directories." },
      { layer: "Atomic Mover", details: "Safe collision-resolving file renaming and atomic movement without data corruption." },
      { layer: "CLI Interface", details: "Rich colored terminal feedback with status statistics and log files." },
    ],
    commits: [
      { hash: "3e90b14", msg: "feat(watcher): add debounce logic to prevent sorting incomplete downloads", date: "Sep 2026", tag: "CLI" },
      { hash: "a814c99", msg: "ci: add automated SHA-256 binary release generation", date: "Sep 2026", tag: "Release" },
    ],
  },
];

export interface DeveloperLog {
  id: string;
  date: string;
  project: string;
  title: string;
  type: "Architecture" | "Feature" | "Performance" | "CI/CD";
  summary: string;
  diffStats: string;
}

export const developerLogs: DeveloperLog[] = [
  {
    id: "log-01",
    date: "Oct 18, 2026",
    project: "Gorkhali Gym",
    title: "Hydrate Public Pages & Persist Reviews via Gemini CMS",
    type: "Feature",
    summary:
      "Integrated server-side Gemini API for intelligent workout recommendations and optimized static snapshot hydration with Prisma ORM on Next.js 15.",
    diffStats: "+310 / -45 lines · Vercel Production",
  },
  {
    id: "log-02",
    date: "Oct 17, 2026",
    project: "Hotel Gorkha",
    title: "PostgreSQL Prisma Adapter & Full Hotel JSON-LD Schema",
    type: "Architecture",
    summary:
      "Upgraded database layer with @prisma/adapter-pg, configured rich hotel booking schema, and validated end-to-end reservation flows with Playwright and Vitest.",
    diffStats: "+540 / -112 lines · Vitest passing",
  },
  {
    id: "log-03",
    date: "Oct 04, 2026",
    project: "Water Factory ERP",
    title: "Drizzle ORM + Better-Auth Migration & Live Vercel Release",
    type: "Architecture",
    summary:
      "Transitioned schema migrations to Drizzle Kit with Neon PostgreSQL, implemented Better-Auth session guards, and deployed the live ERP dashboard to Vercel.",
    diffStats: "+890 / -240 lines · Live on Vercel",
  },
  {
    id: "log-04",
    date: "Sep 27, 2026",
    project: "3D Spatial Developer Portfolio",
    title: "Three.js React Three Fiber Spatial Scene & Shaders",
    type: "Performance",
    summary:
      "Engineered real-time interactive 3D WebGL scene with Drei camera controls, custom lighting shaders, and smooth GSAP/Motion viewport transitions.",
    diffStats: "+420 / -85 lines · 60 FPS WebGL",
  },
];

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  period: string;
  status: "In Progress" | "Completed";
  score?: string;
  details: string;
  highlights?: string[];
}

export const educationList: EducationItem[] = [
  {
    institution: "Mahendra Morang Adarsh Multiple Campus",
    degree: "Bachelor of Information Technology (BIT)",
    location: "Biratnagar, Nepal",
    period: "Currently Pursuing",
    status: "In Progress",
    details:
      "Pursuing a rigorous bachelor's degree in Information Technology covering software engineering, database design, computer networks, and algorithms.",
    highlights: [
      "Foundations in computational logic and system architecture",
      "Hands-on coursework in full-stack development and backend engineering",
    ],
  },
  {
    institution: "Shikshadeep Secondary Boarding School",
    degree: "Higher Secondary (Grade 12)",
    location: "Biratnagar, Nepal",
    period: "Completed",
    status: "Completed",
    score: "GPA: 2.95",
    details:
      "Completed secondary education with focused coursework in Mathematics, Physics, and Computer Science.",
  },
  {
    institution: "Shikshadeep Secondary Boarding School",
    degree: "Secondary Education Examination (Grade 10)",
    location: "Biratnagar, Nepal",
    period: "Completed",
    status: "Completed",
    score: "GPA: 3.90",
    details:
      "Graduated with distinction with top academic performance across Mathematics, Science, and Computing.",
  },
];

export interface CompetencyGroup {
  category: string;
  iconName: string;
  items: string[];
}

export const competencyGroups: CompetencyGroup[] = [
  {
    category: "Work Style & Process",
    iconName: "Workflow",
    items: ["Problem Solving", "Agile / Scrum", "Time Management", "Attention to Detail"],
  },
  {
    category: "Communication",
    iconName: "MessageSquare",
    items: ["Technical Writing", "Written & Verbal Communication", "Stakeholder Reporting"],
  },
  {
    category: "Leadership & Teamwork",
    iconName: "Users",
    items: ["Team Collaboration", "Task Allocation", "Mentorship & Peer Coaching"],
  },
  {
    category: "Core Traits",
    iconName: "Sparkles",
    items: ["Fast Learner", "Self-Motivated", "Adaptable", "Critical Thinking"],
  },
];

export const socials = [
  {
    label: "GitHub",
    handle: "github.com/livelyfun",
    href: profile.github,
  },
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/mithlesh-das-dev",
    href: profile.linkedin,
  },
  {
    label: "X",
    handle: "@mithlesh_codes",
    href: profile.twitter,
  },
  {
    label: "Email",
    handle: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: "Phone",
    handle: profile.phone,
    href: `tel:${profile.phoneRaw}`,
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

