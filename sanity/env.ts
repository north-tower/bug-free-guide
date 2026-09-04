function firstEnv(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

export const apiVersion =
  firstEnv("SANITY_API_VERSION", "NEXT_PUBLIC_SANITY_API_VERSION") ||
  "2026-06-24";

export const dataset = assertValue(
  firstEnv("SANITY_DATASET", "NEXT_PUBLIC_SANITY_DATASET"),
  "Missing environment variable: SANITY_DATASET",
);

export const projectId = assertValue(
  firstEnv("SANITY_PROJECT_ID", "NEXT_PUBLIC_SANITY_PROJECT_ID"),
  "Missing environment variable: SANITY_PROJECT_ID",
);

export const studioUrl = firstEnv(
  "SANITY_STUDIO_URL",
  "NEXT_PUBLIC_SANITY_STUDIO_URL",
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
