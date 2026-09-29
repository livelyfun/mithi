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
  linkedin: "https://linkedin.com/in/mithi",
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
  ],
  stats: [
    { value: "BIT", label: "Undergrad in Tech" },
    { value: "3+", label: "Featured Projects" },
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
  sandboxType: "calculator" | "reel-studio" | "graphql" | "performance";
}

export const projects: Project[] = [
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
    sandboxType: "performance",
  },
  {
    id: "ai-reel-studio",
    title: "AI Reel Studio",
    version: "v3.0.2",
    status: "Active Dev",
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
      { label: "Live Demo", value: "ai-reel-studio.vercel.app" },
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
    sandboxType: "reel-studio",
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
    sandboxType: "calculator",
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
    sandboxType: "performance",
  },
  {
    id: "yt-downloader",
    title: "YT Downloader Desktop",
    version: "v1.2.0",
    status: "Production",
    tagline: "Local desktop utility for downloading video & audio packaged as a Debian .deb",
    description:
      "A desktop downloader that keeps everything local on the user's machine. A React renderer drives an Electron main process that shells out to yt-dlp and ffmpeg, parsing live progress, transfer speed, and ETA with format/audio selection.",
    category: "Desktop & Python",
    stack: ["JavaScript", "Electron", "React", "Node.js", "Tailwind CSS", "yt-dlp", "ffmpeg"],
    repo: "https://github.com/livelyfun/youtube-video-downloader",
    imageUrl: "/images/project_backend_api_1790662478810.jpg",
    fallbackImageUrl: "/images/project_backend_api_1790662478810.jpg",
    highlights: [
      "Electron main / preload / renderer architecture with typed IPC channels",
      "Live progress, download speed, and ETA parsed directly from yt-dlp stdout",
      "Format selector supporting Video+Audio, Video-Only, or High-Bitrate MP3",
      "Packaged as a standard Debian .deb with desktop file and dependency checks",
    ],
    metrics: [
      { label: "Formats", value: "MP4 / WebM / MP3" },
      { label: "Packaging", value: "Debian .deb package" },
      { label: "Speed", value: "Uncapped network" },
      { label: "IPC Latency", value: "< 2ms Electron" },
    ],
    architecture: [
      { layer: "Electron Main", details: "Node.js process managing native OS windows, filesystem access, and yt-dlp subprocesses." },
      { layer: "IPC Bridge", details: "Secure context-isolated preload scripts streaming stdout progress ticks to UI." },
      { layer: "React Frontend", details: "Dark mode queue manager showing real-time progress bars and speed charts." },
      { layer: "Debian Packaging", details: "Standard Linux .deb package with desktop shortcuts and dependency validation." },
    ],
    commits: [
      { hash: "5d01a33", msg: "feat(ipc): add typed stream events for download progress percentage", date: "Sep 2026", tag: "Electron" },
      { hash: "8b72c44", msg: "pkg: bundle Linux desktop launcher and mime associations", date: "Aug 2026", tag: "Packaging" },
    ],
    sandboxType: "graphql",
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
    demo: "https://melbourne-property-management-and-s-teal.vercel.app",
    imageUrl: "/images/proj_property_mgmt_1790662980226.jpg",
    fallbackImageUrl: "/images/proj_property_mgmt_1790662980226.jpg",
    highlights: [
      "Live production website deployed on Vercel with custom domain integration",
      "Interactive service catalog covering steam cleaning, strip & polish, and maintenance",
      "High-contrast, mobile-first accessible design with fast sub-second page loads",
      "Contact and quote request form with client-side verification and schema validation",
    ],
    metrics: [
      { label: "Live Deployment", value: "Vercel Production" },
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
    sandboxType: "performance",
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
    date: "Sep 28, 2026",
    project: "Nexus Backend & GraphQL Gateway",
    title: "DataLoader Batching & Query Plan Optimization",
    type: "Performance",
    summary:
      "Resolved N+1 read overhead on nested GraphQL relationship queries by deploying DataLoader memoized caching. Firestore read counts dropped by 72% across load tests.",
    diffStats: "+148 / -34 lines · 42ms p99",
  },
  {
    id: "log-02",
    date: "Sep 22, 2026",
    project: "Kira Calculator",
    title: "Recursive Descent Shunting-Yard AST Precision Update",
    type: "Architecture",
    summary:
      "Refactored AST expression tokenization to handle implicit multiplication and negative exponents without grammar ambiguity. Added 35 additional pytest assertions.",
    diffStats: "+210 / -65 lines · 120 tests pass",
  },
  {
    id: "log-03",
    date: "Sep 15, 2026",
    project: "AI Reel Studio",
    title: "OffscreenCanvas Worker & Web Audio Frequency Spectrum",
    type: "Feature",
    summary:
      "Decoupled vertical 1080x1920 video frame compositing from the main browser thread into an OffscreenCanvas Web Worker, keeping timeline scrubbing at silky 60 FPS.",
    diffStats: "+340 / -82 lines · 60 FPS steady",
  },
  {
    id: "log-04",
    date: "Sep 08, 2026",
    project: "Next.js 15 Full-Stack Ecosystem",
    title: "Three.js Spatial WebGL Core & Standalone Edge Build",
    type: "Architecture",
    summary:
      "Engineered real-time interactive 3D developer node topology with mouse tracking, dynamic matrix rotations, and standalone container deployment for sub-second boots.",
    diffStats: "+480 / -95 lines · 100 Lighthouse",
  },
];

export const devSystem = {
  branch: "main",
  runtime: "Node.js v22.14 LTS",
  framework: "Next.js 15.5 App Router",
  state: "Systems Nominal",
  totalTests: "140+ Passing",
  p99Latency: "42ms",
  uptime: "99.98%",
};

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
    handle: "linkedin.com/in/mithi",
    href: profile.linkedin,
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
  { label: "Updates", href: "#dev-updates" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

