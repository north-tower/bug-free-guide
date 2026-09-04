/**
 * Editable source of truth for `npm run seed`.
 *
 * Confirm these before publishing:
 * - PROFILE_EMAIL (or set SEED_PROFILE_EMAIL)
 * - NorthStack start date (estimated below)
 * - Education: placeholder MIT/Berkeley records are deleted; add real education in Studio if you want that section back
 */

export const PROFILE_EMAIL =
  process.env.SEED_PROFILE_EMAIL ?? "muneshmyke@gmail.com";

export const profile = {
  firstName: "Mike",
  lastName: "Ndegwa",
  headline: "Full-Stack Software Developer",
  headlineStaticText: "I build",
  headlineAnimatedWords: [
    "ISP platforms",
    "POS systems",
    "logistics software",
    "payment integrations",
    "fintech products",
  ],
  headlineAnimationDuration: 3000,
  shortBio:
    "Full-stack developer specializing in production software for the Kenyan market — payments (M-Pesa/Safaricom Daraja), logistics, POS, ISP billing, and fintech. Comfortable owning a product from database schema to deployed infrastructure.",
  fullBio: [
    "I'm Mike Ndegwa (also Mike Munene), a full-stack software developer at NorthStack, based in Nairobi, Kenya and open to remote work.",
    "I specialize in production software for the Kenyan market — payments (M-Pesa/Safaricom Daraja), logistics, POS, ISP billing, and fintech. I am comfortable owning a product from database schema to deployed infrastructure.",
    "Core stack: NestJS, TypeORM, PostgreSQL, Next.js (App Router), TypeScript, Tailwind CSS, Python (data/automation), Docker and Docker Compose.",
    "Also comfortable with FastAPI, R, Express, and Strapi.",
  ],
  location: "Nairobi, Kenya (open to remote work)",
  availability: "open" as const,
  // LinkedIn work history starts Jan 2024; adjust if you want a different number.
  yearsOfExperience: 2,
  socialLinks: {
    github: "https://github.com/north-tower",
    linkedin: "https://www.linkedin.com/in/mike-munene-28657a228",
  },
};

export const siteSettings = {
  siteTitle: "Mike Ndegwa — Full-Stack Software Developer",
  siteDescription:
    "Full-stack developer in Nairobi building production software for Kenyan payments, logistics, POS, ISP billing, and fintech.",
  siteKeywords: [
    "Mike Ndegwa",
    "Mike Munene",
    "Full-Stack Developer",
    "Nairobi",
    "Kenya",
    "NestJS",
    "Next.js",
    "M-Pesa",
    "Daraja",
    "TypeScript",
  ],
  ctaText: "Get In Touch",
  ctaUrl: "#contact",
  heroHeadline: "Full-Stack Software Developer",
  heroSubheadline:
    "Production software for the Kenyan market — payments, logistics, POS, ISP billing, and fintech. Based in Nairobi, open to remote work.",
  showBlog: false,
  showServices: false,
  showTestimonials: false,
  footer: {
    text: "Full-stack developer at NorthStack. Building production software for the Kenyan market.",
    copyrightText: "© 2026 Mike Ndegwa. All rights reserved.",
    links: [] as Array<{ title: string; url: string }>,
  },
};

type SkillCategory =
  | "frontend"
  | "backend"
  | "devops"
  | "mobile"
  | "payments"
  | "data-automation";

type Proficiency = "intermediate" | "advanced";

export type SeedSkill = {
  _id: string;
  name: string;
  category: SkillCategory;
  proficiency: Proficiency;
  percentage: number;
  color: string;
};

const CORE = 85;
const COMFORTABLE = 70;

export const skills: SeedSkill[] = [
  { _id: "skill-nestjs", name: "NestJS", category: "backend", proficiency: "advanced", percentage: CORE, color: "#E0234E" },
  { _id: "skill-typeorm", name: "TypeORM", category: "backend", proficiency: "advanced", percentage: CORE, color: "#FE0803" },
  { _id: "skill-postgresql", name: "PostgreSQL", category: "backend", proficiency: "advanced", percentage: CORE, color: "#4169E1" },
  { _id: "skill-nodejs", name: "Node.js", category: "backend", proficiency: "advanced", percentage: CORE, color: "#339933" },
  { _id: "skill-python", name: "Python", category: "backend", proficiency: "advanced", percentage: CORE, color: "#3776AB" },
  { _id: "skill-express", name: "Express", category: "backend", proficiency: "intermediate", percentage: COMFORTABLE, color: "#000000" },
  { _id: "skill-fastapi", name: "FastAPI", category: "backend", proficiency: "intermediate", percentage: COMFORTABLE, color: "#009688" },
  { _id: "skill-strapi", name: "Strapi", category: "backend", proficiency: "intermediate", percentage: COMFORTABLE, color: "#4945FF" },
  { _id: "skill-nextjs", name: "Next.js", category: "frontend", proficiency: "advanced", percentage: CORE, color: "#000000" },
  { _id: "skill-typescript", name: "TypeScript", category: "frontend", proficiency: "advanced", percentage: CORE, color: "#3178C6" },
  { _id: "skill-tailwind", name: "Tailwind CSS", category: "frontend", proficiency: "advanced", percentage: CORE, color: "#06B6D4" },
  { _id: "skill-react", name: "React", category: "frontend", proficiency: "advanced", percentage: CORE, color: "#61DAFB" },
  { _id: "skill-docker", name: "Docker", category: "devops", proficiency: "advanced", percentage: CORE, color: "#2496ED" },
  { _id: "skill-compose", name: "Docker Compose", category: "devops", proficiency: "advanced", percentage: CORE, color: "#2496ED" },
  { _id: "skill-azure-vm", name: "Azure VM", category: "devops", proficiency: "advanced", percentage: CORE, color: "#0078D4" },
  { _id: "skill-nginx", name: "Nginx", category: "devops", proficiency: "advanced", percentage: CORE, color: "#009639" },
  { _id: "skill-certbot", name: "Let's Encrypt / Certbot", category: "devops", proficiency: "advanced", percentage: CORE, color: "#003A70" },
  { _id: "skill-mpesa", name: "M-Pesa Daraja", category: "payments", proficiency: "advanced", percentage: CORE, color: "#4CAF50" },
  { _id: "skill-safaricom", name: "Safaricom integrations", category: "payments", proficiency: "advanced", percentage: CORE, color: "#00A651" },
  { _id: "skill-gateways", name: "Flutterwave / Paystack / Kopokopo", category: "payments", proficiency: "intermediate", percentage: COMFORTABLE, color: "#F5A623" },
  { _id: "skill-selenium", name: "Selenium", category: "data-automation", proficiency: "advanced", percentage: CORE, color: "#43B02A" },
  { _id: "skill-macrodroid", name: "MacroDroid / ngrok", category: "data-automation", proficiency: "advanced", percentage: CORE, color: "#1A73E8" },
  { _id: "skill-r", name: "R", category: "data-automation", proficiency: "intermediate", percentage: COMFORTABLE, color: "#276DC3" },
  { _id: "skill-react-native", name: "React Native", category: "mobile", proficiency: "intermediate", percentage: COMFORTABLE, color: "#61DAFB" },
];

function skillRef(id: string) {
  return { _type: "reference" as const, _ref: id };
}

export const experience = [
  {
    _id: "exp-northstack",
    company: "NorthStack",
    position: "Senior Full-Stack Developer",
    employmentType: "full-time" as const,
    location: "Nairobi, Kenya (open to remote work)",
    // Estimated: Aeres role on LinkedIn ended Jul 2025. Confirm this date in Studio if it is wrong.
    startDate: "2025-08-01",
    endDate: undefined,
    current: true,
    order: 0,
    description: [
      "Recently promoted to Senior Full-Stack Developer. Currently mentoring an intern while owning production products from database schema through deployed infrastructure.",
    ],
    responsibilities: [
      "Build and operate production software for Kenyan payments, logistics, POS, ISP billing, and fintech.",
      "Mentor an intern alongside day-to-day product work.",
      "Own delivery from schema design to Azure VM / Docker deployments.",
    ],
    technologies: [
      "skill-nestjs",
      "skill-typeorm",
      "skill-postgresql",
      "skill-nextjs",
      "skill-typescript",
      "skill-docker",
      "skill-mpesa",
    ].map(skillRef),
  },
  {
    _id: "exp-freelance",
    company: "Freelance / Contract",
    position: "Full-Stack Developer",
    employmentType: "freelance" as const,
    location: "Nairobi, Kenya (remote)",
    startDate: "2024-01-01",
    endDate: undefined,
    current: true,
    order: 1,
    description: [
      "Ongoing freelance and contract work alongside product development: academic and data assistance, branding and web builds, and client integrations.",
    ],
    responsibilities: [
      "Academic and data assistance.",
      "Branding and web builds.",
      "Client integrations.",
    ],
    technologies: [
      "skill-nextjs",
      "skill-typescript",
      "skill-python",
      "skill-react",
    ].map(skillRef),
  },
  {
    _id: "exp-aeres",
    company: "Aeres Technologies Limited",
    position: "Full-stack Developer",
    employmentType: "full-time" as const,
    location: "Ruiru, Kiambu, Kenya",
    startDate: "2024-07-01",
    endDate: "2025-07-31",
    current: false,
    order: 2,
    description: [
      "Full-stack developer at Aeres Technologies Limited (from LinkedIn).",
    ],
    responsibilities: [],
    technologies: [
      "skill-nextjs",
      "skill-typescript",
      "skill-react",
      "skill-tailwind",
    ].map(skillRef),
  },
  {
    _id: "exp-kilimo",
    company: "Kilimo Feeds Limited",
    position: "Software Engineer",
    employmentType: "full-time" as const,
    location: "Nakuru, Kenya",
    startDate: "2024-01-01",
    endDate: "2024-07-31",
    current: false,
    order: 3,
    description: [
      "Software Engineer at Kilimo Feeds Limited (from LinkedIn).",
    ],
    responsibilities: [],
    technologies: ["skill-nextjs", "skill-typescript", "skill-react"].map(
      skillRef,
    ),
  },
];

export const projects = [
  {
    _id: "proj-isp-saas",
    title: "ISP SaaS Platform",
    slug: "isp-saas-platform",
    tagline:
      "Multi-tenant SaaS for Kenyan ISPs — a locally-built alternative to Netmaster/Powercode, with MikroTik, FreeRADIUS, fiber OLT, and Daraja STK Push billing.",
    category: "web-app" as const,
    featured: true,
    order: 0,
    githubUrl: undefined,
    liveUrl: undefined,
    technologies: [
      "skill-nestjs",
      "skill-postgresql",
      "skill-typeorm",
      "skill-mpesa",
      "skill-docker",
    ].map(skillRef),
  },
  {
    _id: "proj-express",
    title: "Express — Logistics Fleet Management",
    slug: "express-logistics-fleet-management",
    tagline:
      "Fleet management for riders, vehicles, and deliveries, with enterprise dashboards and Kenya-specific compliance fields (insurance, roadworthiness).",
    category: "web-app" as const,
    featured: true,
    order: 1,
    githubUrl: undefined,
    liveUrl: undefined,
    technologies: [
      "skill-nextjs",
      "skill-typescript",
      "skill-tailwind",
      "skill-react",
    ].map(skillRef),
  },
  {
    _id: "proj-insightful-pos",
    title: "insightful pos",
    slug: "insightful-pos",
    tagline:
      "POS for Kenyan retail: offline-first PWA, RBAC, data-integrity safeguards, and idempotent M-Pesa payment handling.",
    category: "web-app" as const,
    featured: true,
    order: 2,
    githubUrl: "https://github.com/north-tower/insightful-pos",
    liveUrl: "https://insightful-pos.vercel.app",
    technologies: [
      "skill-nextjs",
      "skill-nestjs",
      "skill-postgresql",
      "skill-mpesa",
    ].map(skillRef),
  },
  {
    _id: "proj-foodcart",
    title: "FoodCart",
    slug: "foodcart",
    tagline:
      "Multi-tenant food ordering for the Kenyan market (Glovo-inspired UX): restaurant discovery, menus, cart, and checkout.",
    category: "web-app" as const,
    featured: true,
    order: 3,
    githubUrl: undefined,
    liveUrl: undefined,
    technologies: ["skill-nextjs", "skill-nestjs"].map(skillRef),
  },
  {
    _id: "proj-sales-agent",
    title: "Autonomous Sales Agent",
    slug: "autonomous-sales-agent",
    tagline:
      "AI-driven sales automation: autonomous lead research and outreach via the Claude API, Serper.dev, and Resend, with a Next.js ops dashboard.",
    category: "ai-ml" as const,
    featured: true,
    order: 4,
    githubUrl: undefined,
    liveUrl: undefined,
    technologies: ["skill-nestjs", "skill-nextjs", "skill-typescript"].map(
      skillRef,
    ),
  },
  {
    _id: "proj-rider-app",
    title: "Delivery Rider App",
    slug: "delivery-rider-app",
    tagline:
      "Cross-platform rider app (Expo/React Native) for last-mile delivery in the Kenyan market.",
    category: "mobile-app" as const,
    featured: true,
    order: 5,
    githubUrl: undefined,
    liveUrl: undefined,
    technologies: ["skill-react-native", "skill-typescript", "skill-react"].map(
      skillRef,
    ),
  },
  {
    _id: "proj-rulebook",
    title: "Rulebook",
    slug: "rulebook",
    tagline:
      "Node.js/Express API integrating Safaricom Daraja B2C disbursements.",
    category: "api-backend" as const,
    featured: true,
    order: 6,
    githubUrl: undefined,
    liveUrl: undefined,
    technologies: [
      "skill-nodejs",
      "skill-express",
      "skill-mpesa",
      "skill-safaricom",
    ].map(skillRef),
  },
];

/**
 * Pinned GitHub repos that are NOT imported (practice, this site, or unclear):
 * - glowing-eureka — Portfolio 2.0 (this site)
 * - potential-invention — Tiempo V2 weather app
 * - special-parakeet — Trackie 2.0
 * - bookish-goggles — Aeres (work-related frontend; add in Studio if you want it listed)
 * - neon-cart-craft — no description; looks like a practice/shop UI
 * - deliveroo — not in the public repo list returned by GitHub
 *
 * Client projects without public repos are listed above with no GitHub URL.
 */

export const navigation = [
  { _id: "nav-1", title: "Home", href: "#home", icon: "IconHome", isExternal: false, order: 1 },
  { _id: "nav-2", title: "About", href: "#about", icon: "IconUser", isExternal: false, order: 2 },
  { _id: "nav-3", title: "Skills", href: "#skills", icon: "IconBulb", isExternal: false, order: 3 },
  { _id: "nav-4", title: "Experience", href: "#experience", icon: "IconBriefcase", isExternal: false, order: 4 },
  { _id: "nav-5", title: "Projects", href: "#projects", icon: "IconCode", isExternal: false, order: 5 },
  { _id: "nav-6", title: "Contact", href: "#contact", icon: "IconMail", isExternal: false, order: 6 },
  {
    _id: "nav-7",
    title: "GitHub",
    href: "https://github.com/north-tower",
    icon: "IconBrandGithub",
    isExternal: true,
    order: 7,
  },
  {
    _id: "nav-8",
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/mike-munene-28657a228",
    icon: "IconBrandLinkedin",
    isExternal: true,
    order: 8,
  },
];

export const DELETE_TYPES = [
  "testimonial",
  "certification",
  "achievement",
  "blog",
  "service",
  "education",
  "project",
  "skill",
  "experience",
  "navigation",
] as const;
