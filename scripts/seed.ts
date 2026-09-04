/**
 * One-shot Sanity importer. Overwrites John Doe placeholder documents
 * with the content in `scripts/seed-data.ts`.
 *
 *   npm run seed
 *   npm run seed -- --dry-run
 *   npm run seed -- --dataset production
 *
 * Uses SANITY_API_WRITE_TOKEN, or falls back to SANITY_SERVER_API_TOKEN.
 * That token needs Editor (write) access. Profile photo, site logo, favicon,
 * OG image, and brand colors are preserved.
 */
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import {
  DELETE_TYPES,
  experience,
  navigation,
  PROFILE_EMAIL,
  profile,
  projects,
  siteSettings,
  skills,
} from "./seed-data";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index);
    const value = trimmed.slice(index + 1).replace(/^["']|["']$/g, "");
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvLocal();

function argValue(flag: string) {
  const indexed = process.argv.findIndex((value) => value === flag);
  if (indexed !== -1) return process.argv[indexed + 1];
  const prefixed = process.argv.find((value) => value.startsWith(`${flag}=`));
  return prefixed ? prefixed.slice(flag.length + 1) : undefined;
}

const dryRun = process.argv.includes("--dry-run");
const projectId =
  process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  argValue("--dataset") ||
  process.env.SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET;
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_SERVER_API_TOKEN;
const apiVersion =
  process.env.SANITY_API_VERSION ||
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  "2026-06-24";

if (!projectId || !dataset) {
  throw new Error("Missing SANITY_PROJECT_ID or SANITY_DATASET");
}

if (!token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN (or SANITY_SERVER_API_TOKEN). The token needs write access.",
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

console.log(`Seeding Sanity project ${projectId} / dataset "${dataset}"`);

function portableText(paragraphs: string[]) {
  return paragraphs.map((text, index) => ({
    _type: "block" as const,
    _key: `p${index + 1}`,
    style: "normal" as const,
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: `p${index + 1}s`,
        marks: [] as string[],
        text,
      },
    ],
  }));
}

function withKeys<T extends Record<string, unknown>>(
  items: T[],
): Array<T & { _key: string }> {
  return items.map((item, index) => ({
    ...item,
    _key: `${index + 1}`.padStart(2, "0"),
  }));
}

async function idsOfTypes(types: readonly string[]) {
  const documents = await client.fetch<Array<{ _id: string; _type: string }>>(
    `*[_type in $types && !(_id in path("drafts.**"))]{_id,_type}`,
    { types },
  );
  return documents;
}

async function commit(mutations: object[], label: string) {
  if (mutations.length === 0) return;

  console.log(`${dryRun ? "[dry-run] " : ""}${label}: ${mutations.length} mutation(s)`);
  if (dryRun) return;

  const chunkSize = 80;
  for (let index = 0; index < mutations.length; index += chunkSize) {
    const chunk = mutations.slice(index, index + chunkSize);
    await client.mutate(chunk, { autoGenerateArrayKeys: false, visibility: "async" });
  }
}

async function seed() {
  const existing = await idsOfTypes(DELETE_TYPES);
  const byType = Map.groupBy
    ? Map.groupBy(existing, (doc) => doc._type)
    : existing.reduce((map, doc) => {
        const list = map.get(doc._type) ?? [];
        list.push(doc);
        map.set(doc._type, list);
        return map;
      }, new Map<string, typeof existing>());

  console.log("Current placeholder documents to replace:");
  for (const type of DELETE_TYPES) {
    console.log(`  ${type}: ${byType.get(type)?.length ?? 0}`);
  }

  const deleteMutations = existing.map((doc) => ({
    delete: { id: doc._id },
  }));

  const skillDocs = skills.map((skill) => ({
    _id: skill._id,
    _type: "skill" as const,
    name: skill.name,
    category: skill.category,
    proficiency: skill.proficiency,
    percentage: skill.percentage,
    color: skill.color,
  }));

  const experienceDocs = experience.map((role) => ({
    _id: role._id,
    _type: "experience" as const,
    company: role.company,
    position: role.position,
    employmentType: role.employmentType,
    location: role.location,
    startDate: role.startDate,
    ...(role.endDate ? { endDate: role.endDate } : {}),
    current: role.current,
    order: role.order,
    description: portableText(role.description),
    responsibilities: role.responsibilities,
    technologies: withKeys(role.technologies),
  }));

  const projectDocs = projects.map((project) => ({
    _id: project._id,
    _type: "project" as const,
    title: project.title,
    slug: { _type: "slug" as const, current: project.slug },
    tagline: project.tagline,
    category: project.category,
    featured: project.featured,
    order: project.order,
    ...(project.githubUrl ? { githubUrl: project.githubUrl } : {}),
    ...(project.liveUrl ? { liveUrl: project.liveUrl } : {}),
    technologies: withKeys(project.technologies),
  }));

  const navigationDocs = navigation.map((item) => ({
    _id: item._id,
    _type: "navigation" as const,
    title: item.title,
    href: item.href,
    icon: item.icon,
    isExternal: item.isExternal,
    order: item.order,
  }));

  const createMutations = [
    ...skillDocs,
    ...experienceDocs,
    ...projectDocs,
    ...navigationDocs,
  ].map((doc) => ({ createOrReplace: doc }));

  const existingProfile = await client.fetch<{
    _id?: string;
    email?: string | null;
  } | null>(`*[_id=="singleton-profile"][0]{_id,email}`);
  const existingSettings = await client.fetch<{ _id?: string } | null>(
    `*[_id=="singleton-siteSettings"][0]{_id}`,
  );

  const existingEmail = existingProfile?.email?.trim() ?? "";
  const placeholderEmail = /example\.com$/i.test(existingEmail);
  const email =
    PROFILE_EMAIL.trim() ||
    (!placeholderEmail ? existingEmail : "");
  if (!email) {
    console.warn(
      "No PROFILE_EMAIL / SEED_PROFILE_EMAIL set — removing the placeholder john.doe@example.com address. Set one in scripts/seed-data.ts and re-run if you want email on the site.",
    );
  } else {
    console.log(`Using profile email: ${email}`);
  }

  const profileSet: Record<string, unknown> = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    headline: profile.headline,
    headlineStaticText: profile.headlineStaticText,
    headlineAnimatedWords: profile.headlineAnimatedWords,
    headlineAnimationDuration: profile.headlineAnimationDuration,
    shortBio: profile.shortBio,
    fullBio: portableText(profile.fullBio),
    location: profile.location,
    availability: profile.availability,
    yearsOfExperience: profile.yearsOfExperience,
    socialLinks: profile.socialLinks,
  };

  if (email) {
    profileSet.email = email;
  }

  const profileUnset = [
    "stats",
    "phone",
    "socialLinks.twitter",
    "socialLinks.website",
    "socialLinks.medium",
    "socialLinks.devto",
    "socialLinks.youtube",
    "socialLinks.stackoverflow",
    ...(email ? [] : ["email"]),
  ];

  const settingsSet = {
    siteTitle: siteSettings.siteTitle,
    siteDescription: siteSettings.siteDescription,
    siteKeywords: siteSettings.siteKeywords,
    ctaText: siteSettings.ctaText,
    ctaUrl: siteSettings.ctaUrl,
    heroHeadline: siteSettings.heroHeadline,
    heroSubheadline: siteSettings.heroSubheadline,
    showBlog: siteSettings.showBlog,
    showServices: siteSettings.showServices,
    showTestimonials: siteSettings.showTestimonials,
    footer: {
      text: siteSettings.footer.text,
      copyrightText: siteSettings.footer.copyrightText,
      links: withKeys(siteSettings.footer.links),
    },
  };

  const patchMutations: object[] = [];

  if (existingProfile?._id) {
    patchMutations.push({
      patch: {
        id: "singleton-profile",
        set: profileSet,
        unset: profileUnset,
      },
    });
  } else {
    patchMutations.push({
      createOrReplace: {
        _id: "singleton-profile",
        _type: "profile",
        ...profileSet,
        ...(email ? { email } : {}),
      },
    });
  }

  if (existingSettings?._id) {
    patchMutations.push({
      patch: {
        id: "singleton-siteSettings",
        set: settingsSet,
        unset: ["twitterHandle"],
      },
    });
  } else {
    patchMutations.push({
      createOrReplace: {
        _id: "singleton-siteSettings",
        _type: "siteSettings",
        ...settingsSet,
      },
    });
  }

  await commit(deleteMutations, "Delete placeholder documents");
  await commit(createMutations, "Create real skills, experience, projects, nav");
  await commit(patchMutations, "Patch profile and site settings (images kept)");

  console.log("\nDone.");
  console.log("Created:", {
    skills: skillDocs.length,
    experience: experienceDocs.length,
    projects: projectDocs.length,
    navigation: navigationDocs.length,
  });
  console.log("Hidden by emptying (no fake replacements): testimonials, certifications, achievements, blog, services, education.");
  console.log("Add project cover images in Studio — the schema requires them for new edits, but the homepage already handles a missing image.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
