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

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "Desktop App" | "AI & Multimedia" | "Web & Frontend";
  stack: string[];
  repo: string;
  demo?: string;
  // Free placeholder images matched by topic
  imageUrl: string;
  fallbackImageUrl: string;
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: "kira-calculator",
    title: "Kira Calculator",
    tagline: "Cross-platform desktop scientific calculator & math engine",
    description:
      "A cross-platform desktop application built in Python with a modern PySide6 GUI. Features an expression parser supporting operator precedence, nested parentheses, powers, roots, trigonometric functions, logarithms, and constants (π, e), backed by a comprehensive pytest test suite.",
    category: "Desktop App",
    stack: ["Python", "PySide6", "pytest", "GUI Design"],
    repo: "https://github.com/livelyfun",
    imageUrl:
      "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=900&q=80",
    fallbackImageUrl: "https://picsum.photos/seed/kira-calculator/800/500",
    highlights: [
      "Engineered robust mathematical expression parsing with operator precedence",
      "Support for trigonometric functions, logarithms, powers, and constants (π, e)",
      "Automated unit testing suite using pytest to guarantee computational precision",
    ],
  },
  {
    id: "ai-reel-studio",
    title: "AI Reel Studio",
    tagline: "Automated AI short-form video generation platform",
    description:
      "An exploration project orchestrating automated short-form video workflows from single text prompts. Leverages Gemini / Google AI Studio models to synthesize visual asset pipelines, generate synchronized voiceovers, align captions, and assemble multi-media reels.",
    category: "AI & Multimedia",
    stack: ["React", "JavaScript", "Gemini AI", "Google AI Studio", "REST APIs"],
    repo: "https://github.com/livelyfun",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
    fallbackImageUrl: "https://picsum.photos/seed/ai-reel-studio/800/500",
    highlights: [
      "Prompt-driven multimedia orchestration pipeline powered by Gemini models",
      "Dynamic visual asset selection and text caption timing alignment",
      "Structured video rendering workflow designed for rapid content creation",
    ],
  },
  {
    id: "react-learning-projects",
    title: "React & Next.js Project Suite",
    tagline: "Modern web applications demonstrating front-end mastery",
    description:
      "A curated collection of production-ready hands-on web applications mastering modern frontend architecture. Emphasizes reusable component design, client-side & server routing, state management, API integrations, and responsive CSS.",
    category: "Web & Frontend",
    stack: ["Next.js", "React.js", "JavaScript", "HTML5", "CSS3", "REST APIs"],
    repo: "https://github.com/livelyfun",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    fallbackImageUrl: "https://picsum.photos/seed/react-learning-projects/800/500",
    highlights: [
      "Production component patterns with React 19 and Next.js App Router",
      "Real-world state management, asynchronous API data fetching, and caching",
      "Accessible, mobile-first responsive interfaces optimized for performance",
    ],
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
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

