import type { Metadata } from "next";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

const SITE_METADATA_QUERY = defineQuery(`{
  "settings": *[_id == "singleton-siteSettings"][0]{
    siteTitle,
    siteDescription,
    siteKeywords,
    favicon,
    ogImage,
    twitterHandle
  },
  "profile": *[_id == "singleton-profile"][0]{
    firstName,
    lastName,
    headline,
    shortBio,
    email,
    location,
    profileImage,
    socialLinks
  }
}`);

type SiteMetadataQueryResult = {
  settings: {
    siteTitle?: string | null;
    siteDescription?: string | null;
    siteKeywords?: string[] | null;
    favicon?: Parameters<typeof urlFor>[0] | null;
    ogImage?: Parameters<typeof urlFor>[0] | null;
    twitterHandle?: string | null;
  } | null;
  profile: {
    firstName?: string | null;
    lastName?: string | null;
    headline?: string | null;
    shortBio?: string | null;
    email?: string | null;
    location?: string | null;
    profileImage?: Parameters<typeof urlFor>[0] | null;
    socialLinks?: Record<string, string | null | undefined> | null;
  } | null;
};

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl) return configuredUrl.replace(/\/$/, "");

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

function getFullName(profile: SiteMetadataQueryResult["profile"]) {
  return [profile?.firstName, profile?.lastName].filter(Boolean).join(" ");
}

function getSocialProfiles(
  socialLinks?: Record<string, string | null | undefined> | null,
) {
  if (!socialLinks) return [];

  return Object.values(socialLinks).filter(
    (url): url is string => typeof url === "string" && url.length > 0,
  );
}

export async function getSiteMetadataContent() {
  const { data } = await sanityFetch({
    query: SITE_METADATA_QUERY,
    stega: false,
  });

  return (data ?? { settings: null, profile: null }) as SiteMetadataQueryResult;
}

export async function buildSiteMetadata(): Promise<Metadata> {
  const { settings, profile } = await getSiteMetadataContent();

  const siteUrl = getSiteUrl();
  const fullName = getFullName(profile);
  const siteName = settings?.siteTitle || fullName || "Portfolio";
  const title =
    settings?.siteTitle ||
    (fullName && profile?.headline
      ? `${fullName} — ${profile.headline}`
      : fullName || siteName);
  const description =
    settings?.siteDescription?.trim() ||
    profile?.shortBio?.trim() ||
    undefined;

  const ogImageSource = settings?.ogImage ?? profile?.profileImage;
  const ogImageUrl = ogImageSource
    ? urlFor(ogImageSource).width(1200).height(630).fit("crop").url()
    : undefined;

  const faviconUrl = settings?.favicon
    ? urlFor(settings.favicon).width(32).height(32).url()
    : undefined;

  const twitterHandle = settings?.twitterHandle?.replace(/^@/, "");

  const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: settings?.siteKeywords?.length
      ? settings.siteKeywords
      : undefined,
    authors: fullName ? [{ name: fullName }] : undefined,
    creator: fullName || undefined,
    publisher: fullName || siteName,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName,
      title,
      description,
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: fullName ? `${fullName} — portfolio preview` : siteName,
          },
        ],
      }),
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(twitterHandle && { creator: `@${twitterHandle}`, site: `@${twitterHandle}` }),
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    ...(faviconUrl && {
      icons: {
        icon: faviconUrl,
        shortcut: faviconUrl,
      },
    }),
  };

  return metadata;
}

export function buildPersonJsonLd({
  settings,
  profile,
}: SiteMetadataQueryResult) {
  const fullName = getFullName(profile);
  if (!fullName) return null;

  const siteUrl = getSiteUrl();
  const description =
    settings?.siteDescription?.trim() ||
    profile?.shortBio?.trim() ||
    profile?.headline ||
    undefined;
  const imageSource = settings?.ogImage ?? profile?.profileImage;
  const imageUrl = imageSource
    ? urlFor(imageSource).width(1200).height(1200).fit("crop").url()
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: fullName,
    url: siteUrl,
    ...(description && { description }),
    ...(profile?.headline && { jobTitle: profile.headline }),
    ...(profile?.email && { email: profile.email }),
    ...(profile?.location && {
      address: {
        "@type": "PostalAddress",
        addressLocality: profile.location,
      },
    }),
    ...(imageUrl && { image: imageUrl }),
    sameAs: getSocialProfiles(profile?.socialLinks),
  };
}
