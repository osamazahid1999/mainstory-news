import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "@/sanity/lib/client";

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
