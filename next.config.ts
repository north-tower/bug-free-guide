import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SANITY_PROJECT_ID:
      process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    SANITY_DATASET:
      process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET,
    SANITY_API_VERSION:
      process.env.SANITY_API_VERSION ||
      process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    SANITY_STUDIO_URL:
      process.env.SANITY_STUDIO_URL || process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;