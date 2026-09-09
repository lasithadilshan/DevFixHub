import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DevFixHub",
    short_name: "DevFixHub",
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#0d9488",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
