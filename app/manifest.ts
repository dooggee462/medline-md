import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.legalName} — Asistență medicală la domiciliu`,
    short_name: SITE.name,
    description:
      "Asistență medicală profesională la domiciliu în Chișinău și Moldova.",
    start_url: "/ro",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
