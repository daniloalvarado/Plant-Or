import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.EXPO_PUBLIC_SANITY_PROJECT_ID || "9m09a5ng",
  dataset: process.env.EXPO_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2024-03-28",
  token: process.env.EXPO_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
