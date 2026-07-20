import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

const mainDocuments = defineDocuments([
  {
    route: "/",
    filter: `_id == "singleton-profile"`,
  },
]);

const locations = {
  profile: defineLocations({
    select: { firstName: "firstName", lastName: "lastName" },
    resolve: (doc) => ({
      locations: [
        {
          title: [doc?.firstName, doc?.lastName].filter(Boolean).join(" ") || "Profile",
          href: "/",
        },
      ],
    }),
  }),

  siteSettings: defineLocations({
    message: "This document is used on all pages",
    tone: "caution" as const,
  }),

  project: defineLocations({
    select: { title: "title" },
    resolve: (doc) => ({
      locations: [{ title: doc?.title || "Project", href: "/#projects" }],
    }),
  }),

  skill: defineLocations({
    select: { name: "name" },
    resolve: (doc) => ({
      locations: [{ title: doc?.name || "Skill", href: "/#skills" }],
    }),
  }),

  service: defineLocations({
    select: { title: "title" },
    resolve: (doc) => ({
      locations: [{ title: doc?.title || "Service", href: "/#services" }],
    }),
  }),

  experience: defineLocations({
    select: { position: "position", company: "company" },
    resolve: (doc) => ({
      locations: [
        {
          title: [doc?.position, doc?.company].filter(Boolean).join(" at ") || "Experience",
          href: "/#experience",
        },
      ],
    }),
  }),

  education: defineLocations({
    select: { degree: "degree", institution: "institution" },
    resolve: (doc) => ({
      locations: [
        {
          title: [doc?.degree, doc?.institution].filter(Boolean).join(" — ") || "Education",
          href: "/#education",
        },
      ],
    }),
  }),

  certification: defineLocations({
    select: { name: "name" },
    resolve: (doc) => ({
      locations: [{ title: doc?.name || "Certification", href: "/#certifications" }],
    }),
  }),

  achievement: defineLocations({
    select: { title: "title" },
    resolve: (doc) => ({
      locations: [{ title: doc?.title || "Achievement", href: "/#achievements" }],
    }),
  }),

  blog: defineLocations({
    select: { title: "title" },
    resolve: (doc) => ({
      locations: [{ title: doc?.title || "Blog Post", href: "/#blog" }],
    }),
  }),

  testimonial: defineLocations({
    select: { name: "name" },
    resolve: (doc) => ({
      locations: [{ title: doc?.name || "Testimonial", href: "/#testimonials" }],
    }),
  }),

  navigation: defineLocations({
    message: "Navigation links appear in the site header and dock",
    tone: "caution" as const,
  }),
};

export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments,
  locations,
};
