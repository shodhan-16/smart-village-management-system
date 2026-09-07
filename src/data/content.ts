import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Award,
  BadgeCheck,
  Braces,
  Cloud,
  CloudCog,
  Cloudy,
  Database,
  FileText,
  Github,
  GraduationCap,
  HardDrive,
  Linkedin,
  Mail,
  Rocket,
  Server,
  Shield,
  Terminal,
  Users,
  Wrench,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Identity & links — edit this file to keep the site in sync         */
/* ------------------------------------------------------------------ */

export const identity = {
  name: "Shodhan",
  firstName: "SHODHAN",
  lastName: "",
  role: "Cloud Engineer",
  education: "BE — Information Science & Engineering",
  college: "Moodlakatte Institute of Technology",
  location: "Kundapura, Karnataka, India",
  years: "2023 — 2027",
  tagline:
    "Building reliable cloud-powered systems and turning ideas into scalable digital experiences.",
  mission: "Become a strong Cloud Engineer capable of designing, deploying and maintaining reliable cloud infrastructure.",
};

/** Replace these with your real profile URLs. */
export const links = {
  github: "", // TODO: https://github.com/<your-username>
  linkedin: "", // TODO: https://www.linkedin.com/in/<your-username>
  email: "", // TODO: you@example.com — mailto link is built from this
  resume: "/resume/Shodhan_Cloud_Engineer.pdf",
};

export const emailHref = links.email ? `mailto:${links.email}` : "#contact";

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

export type NavItem = { id: string; label: string };

export const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "cloud", label: "Cloud" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export const SECTION_ORDER = [
  "identity",
  "about",
  "education",
  "skills",
  "cloud",
  "projects",
  "certifications",
  "philosophy",
  "contact",
] as const;

export type SectionId = (typeof SECTION_ORDER)[number];

export const SECTION_META: Record<SectionId, { index: string; title: string; nav: string }> = {
  identity: { index: "00", title: "Identity", nav: "IDENTITY" },
  about: { index: "01", title: "Who is Shodhan?", nav: "ABOUT" },
  education: { index: "02", title: "Education", nav: "EDUCATION" },
  skills: { index: "03", title: "Skill Matrix", nav: "SKILLS" },
  cloud: { index: "04", title: "Cloud Journey", nav: "CLOUD" },
  projects: { index: "05", title: "Projects", nav: "PROJECTS" },
  certifications: { index: "06", title: "Certifications & Achievements", nav: "CERTIFICATIONS" },
  philosophy: { index: "07", title: "Engineering Philosophy", nav: "PHILOSOPHY" },
  contact: { index: "08", title: "Let's Build Something", nav: "CONTACT" },
};

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export const bootLines = [
  "> booting shodhan.system",
  "> loading cloud infrastructure...",
  "> loading engineering profile...",
  "> access granted",
];

export const heroMeta = ["AWS", "CLOUD", "LINUX", "SQL", "GIT", "WEB"];

export const statusLines: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Activity, label: "STATUS", value: "OPERATIONAL" },
  { icon: Cloud, label: "REGION", value: "IN-SOUTH-1" },
  { icon: HardDrive, label: "BUILD", value: "ACTIVE" },
  { icon: Users, label: "FOCUS", value: "CLOUD ENGINEERING" },
];

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

export const aboutParagraphs: { title: string; text: string }[] = [
  {
    title: "CLOUD COMPUTING",
    text: "Cloud computing is the core of what I'm building toward — remote infrastructure that is elastic, observable and dependable.",
  },
  {
    title: "AWS",
    text: "Hands-on foundation across core services, with cloud fundamentals and infrastructure concepts as my daily study topic.",
  },
  {
    title: "LINUX & SYSTEMS",
    text: "Comfortable in Linux terminals, working with files, permissions, processes and networked systems.",
  },
  {
    title: "SQL & BACKEND",
    text: "Modelling data and building REST/API-driven backends with Node.js, Express.js and MySQL.",
  },
  {
    title: "GIT / GITHUB",
    text: "Version control as a discipline — clean commits, branching and collaborative workflows.",
  },
  {
    title: "CONTINUOUS LEARNING",
    text: "Learning in public, building in private, and shipping practical projects that test what I know.",
  },
];

export const aboutCard = {
  focus: "Cloud Engineering",
  mindset: ["BUILD", "LEARN", "IMPROVE", "DEPLOY"],
  mission: identity.mission,
};

/* ------------------------------------------------------------------ */
/*  Education                                                          */
/* ------------------------------------------------------------------ */

export const educationTimeline = [
  {
    icon: GraduationCap,
    period: "2023 — 2027",
    degree: "BE — Information Science & Engineering",
    place: "Moodlakatte Institute of Technology",
    city: "Kundapura, Karnataka",
    note: "Core engineering foundation — data structures, databases, OS, networking and software engineering.",
    status: "CURRENT",
  },
];

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/* ------------------------------------------------------------------ */

export type Skill = { name: string; desc: string };
export type SkillCategory = {
  id: string;
  label: string;
  icon: LucideIcon;
  tagline: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "cloud",
    label: "Cloud",
    icon: Cloudy,
    tagline: "Foundations in modern cloud infrastructure, AWS and the operational mindset behind it.",
    skills: [
      { name: "AWS", desc: "Cloud platform fundamentals and hands-on infrastructure experience." },
      { name: "Cloud Computing", desc: "Elasticity, scale, availability and how cloud systems are built and operated." },
      { name: "IAM", desc: "Identity and access management — the security boundary of everything in the cloud." },
      { name: "EC2", desc: "Launching, configuring and managing virtual servers with Linux." },
      { name: "S3", desc: "Object storage, buckets, keys, lifecycle and access controls." },
      { name: "VPC", desc: "Virtual networks, subnets, routing and connectivity between services." },
      { name: "Cloud Fundamentals", desc: "Shared responsibility, regions, availability zones and service models." },
    ],
  },
  {
    id: "systems",
    label: "Systems",
    icon: Terminal,
    tagline: "Ground-level understanding of operating systems and networks.",
    skills: [
      { name: "Linux", desc: "Shell workflow, file systems, permissions, processes and service management." },
      { name: "Networking Fundamentals", desc: "IP, DNS, HTTP, ports, routing and how requests travel the internet." },
    ],
  },
  {
    id: "development",
    label: "Development",
    icon: Braces,
    tagline: "Building working software — from web interface to API server.",
    skills: [
      { name: "HTML", desc: "Semantic, accessible structure for every interface I build." },
      { name: "JavaScript Fundamentals", desc: "Async programming, DOM, ES modules and core language mechanics." },
      { name: "React Fundamentals", desc: "Component thinking, state and building interactive web interfaces." },
      { name: "Node.js", desc: "Server-side JavaScript with the Express.js runtime and HTTP server patterns." },
      { name: "REST APIs", desc: "Designing clean, resource-oriented endpoints and handling requests end-to-end." },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    tagline: "Structured data, relationships and the queries that run systems.",
    skills: [
      { name: "MySQL", desc: "Schema design, constraints, and writing efficient relational queries." },
      { name: "SQL", desc: "SELECT to JOIN — the language of data, proven on HackerRank." },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    tagline: "The daily toolkit of an engineer who ships.",
    skills: [
      { name: "Git", desc: "Version control, branching, merging and clean commit hygiene." },
      { name: "GitHub", desc: "Remote collaboration, pull requests and project documentation." },
      { name: "VS Code", desc: "Editor workflow, extensions, debugging and keyboard-first habits." },
      { name: "Thunder Client", desc: "Manual API testing and endpoint verification during development." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Cloud journey                                                      */
/* ------------------------------------------------------------------ */

export const cloudStages: { label: string; code: string; desc: string }[] = [
  { label: "LEARNING", code: "stage_01", desc: "Cloud fundamentals, AWS core services and how modern infrastructure works" },
  { label: "BUILDING", code: "stage_02", desc: "Turning concepts into working systems — servers, storage, databases and APIs" },
  { label: "DEPLOYING", code: "stage_03", desc: "Getting applications running on infrastructure and learning to operate them" },
  { label: "AUTOMATING", code: "stage_04", desc: "Scripting, configuration and infrastructure decisions that remove manual toil" },
  { label: "ENGINEERING", code: "stage_05", desc: "Designing reliable, observable, secure cloud systems end to end" },
];

export const cloudServices: { code: string; name: string }[] = [
  { code: "ec2", name: "EC2" },
  { code: "vpc", name: "VPC" },
  { code: "iam", name: "IAM" },
  { code: "s3", name: "S3" },
  { code: "rds", name: "RDS" },
  { code: "cw", name: "CloudWatch" },
];

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */

export type ProjectFeature = string;
export type Project = {
  id: string;
  index: string;
  codename: string;
  name: string;
  tagline: string;
  badge: string;
  problem: string;
  solution: string;
  architecture: { node: string; detail: string }[];
  stack: string[];
  features: ProjectFeature[];
  status: string;
  github: string;
  demo: string;
  accent: "blue" | "cyan" | "violet";
};

export const projects: Project[] = [
  {
    id: "smart-village",
    index: "01",
    codename: "OP_SVILLAGE",
    name: "Smart Village Management System",
    badge: "FLAGSHIP MISSION",
    tagline:
      "A digital platform designed to improve village issue reporting and Panchayat administration — a full-stack system built end to end.",
    problem:
      "In villages, complaints about infrastructure and civic issues are handwritten, lost between departments and hard to track. Citizens have no visibility, and Panchayat administration has no single source of truth.",
    solution:
      "A role-based platform where verified users raise complaints with image evidence, the Panchayat routes them to the right department, and workers/solvers close them. Every issue becomes a trackable record with status and notifications.",
    architecture: [
      { node: "USER", detail: "Sign up, verify, submit complaints with images" },
      { node: "AUTHENTICATION", detail: "JWT sessions + bcrypt password hashing" },
      { node: "API SERVER", detail: "Node.js + Express.js REST API" },
      { node: "MYSQL DATABASE", detail: "Users, complaints, departments, workers" },
      { node: "PANCHAYAT ADMIN", detail: "Route issues, assign workers, monitor" },
      { node: "ISSUE SOLVER", detail: "Claim, resolve, update status" },
    ],
    stack: ["Node.js", "Express.js", "MySQL", "JWT", "bcrypt", "Multer", "REST APIs"],
    features: [
      "User authentication & role-based access",
      "User verification before submitting issues",
      "Complaint submission with image upload",
      "Panchayat administration dashboard",
      "Worker / solver workflow",
      "Complaint status tracking",
      "Notifications at every state change",
      "Department-based issue routing",
      "AI integration planned for intelligent classification",
    ],
    status: "ACTIVE DEVELOPMENT",
    github: "", // TODO: link to the repo
    demo: "",
    accent: "blue",
  },
  {
    id: "clouddrive",
    index: "02",
    codename: "OP_CLOUDSTORE",
    name: "Personal Cloud Storage Platform",
    badge: "CLOUD STORAGE SYSTEM",
    tagline:
      "A Google-Drive-inspired cloud storage experience — upload, organise and manage files behind real authentication.",
    problem:
      "Most student apps stop at the frontend. This project was built to prove a complete cloud-style product loop: authentication, storage, and a user dashboard.",
    solution:
      "A React + TypeScript interface backed by Supabase — auth, cloud storage and per-user data with a clean, fast file-management workflow.",
    architecture: [
      { node: "BROWSER UI", detail: "React + TypeScript application" },
      { node: "AUTH", detail: "Supabase authentication & session" },
      { node: "STORAGE LAYER", detail: "Supabase cloud buckets" },
      { node: "DATABASE", detail: "File metadata + user dashboard data" },
      { node: "USER DASHBOARD", detail: "Upload, rename, delete, organise files" },
    ],
    stack: ["React", "TypeScript", "Supabase"],
    features: [
      "File upload to cloud storage",
      "File management & organisation",
      "Secure authentication",
      "Cloud storage integration",
      "User dashboard experience",
    ],
    status: "BUILT",
    github: "", // TODO: link to the repo
    demo: "",
    accent: "cyan",
  },
  {
    id: "portfolio",
    index: "03",
    codename: "OP_PORTFOLIO",
    name: "Developer Portfolio",
    badge: "FRONTEND SYSTEM",
    tagline:
      "The site you are exploring — a custom-built interactive portfolio demonstrating frontend engineering, UI/UX and motion design.",
    problem:
      "A student portfolio needs to do more than list skills. It has to communicate engineering taste and attention to detail within the first five seconds.",
    solution:
      "A cinematic, scroll-driven experience engineered with React, TypeScript, Tailwind CSS and motion — reduced-motion friendly, performance aware, and recruiter ready.",
    architecture: [
      { node: "SCROLL ENGINE", detail: "Section tracking + progress indicators" },
      { node: "VIEW LAYER", detail: "React + TypeScript components" },
      { node: "MOTION SYSTEM", detail: "Framer Motion — 60fps, GPU-friendly" },
      { node: "STYLE SYSTEM", detail: "Tailwind CSS design tokens" },
      { node: "DATA LAYER", detail: "Structured content for easy updates" },
    ],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    features: [
      "Cinematic boot-sequence hero",
      "Scroll-driven story across 9 sections",
      "Interactive cloud architecture visual",
      "Project mission cards & case studies",
      "Reduced-motion support",
    ],
    status: "SHIPPED",
    github: "", // TODO: link to the repo
    demo: "", // TODO: live URL
    accent: "violet",
  },
];

export const projectStatusColor: Record<Project["accent"], string> = {
  blue: "text-electric",
  cyan: "text-cyanflare",
  violet: "text-violetflare",
};

/* ------------------------------------------------------------------ */
/*  Certifications                                                     */
/* ------------------------------------------------------------------ */

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  credential: string;
  verified: boolean;
  icon: LucideIcon;
};

export const certifications: Certification[] = [
  {
    name: "AWS Cloud Quest: Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "AWS Skill Builder",
    credential: "", // TODO: credential URL
    verified: true,
    icon: CloudCog,
  },
  {
    name: "AWS Cloud Practitioner Training",
    issuer: "Amazon Web Services",
    date: "AWS Skill Builder",
    credential: "", // TODO: credential URL
    verified: true,
    icon: Award,
  },
  {
    name: "AWS Cloud Essentials Training Badge",
    issuer: "Amazon Web Services",
    date: "AWS Skill Builder",
    credential: "", // TODO: credential URL
    verified: true,
    icon: BadgeCheck,
  },
  {
    name: "SQL (Basic)",
    issuer: "HackerRank",
    date: "Skill Certificate",
    credential: "", // TODO: credential URL
    verified: true,
    icon: Database,
  },
];

/* ------------------------------------------------------------------ */
/*  What I build                                                       */
/* ------------------------------------------------------------------ */

export const pillars: { icon: LucideIcon; title: string; desc: string; tag: string }[] = [
  { icon: Cloud, title: "Cloud", tag: "DOMAIN_01", desc: "Build cloud-based infrastructure and services." },
  { icon: Server, title: "Systems", tag: "DOMAIN_02", desc: "Design practical backend and API-driven systems." },
  { icon: Shield, title: "Security", tag: "DOMAIN_03", desc: "Understand authentication, authorization and secure application design." },
  { icon: Rocket, title: "Projects", tag: "DOMAIN_04", desc: "Turn real-world problems into working software." },
];

/* ------------------------------------------------------------------ */
/*  Philosophy                                                         */
/* ------------------------------------------------------------------ */

export const philosophyWords = ["LEARN.", "BUILD.", "BREAK.", "FIX.", "IMPROVE."];

export const philosophyQuote =
  "The goal isn't to know everything. The goal is to keep becoming better at building.";

/* ------------------------------------------------------------------ */
/*  Contact / footer                                                   */
/* ------------------------------------------------------------------ */

export const footerLinks: { icon: LucideIcon; label: string; href: string; external: boolean }[] = [
  { icon: Github, label: "GitHub", href: links.github, external: true },
  { icon: Linkedin, label: "LinkedIn", href: links.linkedin, external: true },
  { icon: Mail, label: "Email", href: emailHref, external: false },
  { icon: FileText, label: "Resume", href: links.resume, external: false },
];


