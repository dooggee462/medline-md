import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.legalName} — Asistență medicală la domiciliu`,
    short_name: SITE.name,
    description:
      "Asistență medicală la domiciliu în Chișinău: detoxifiere post-alcool, codare, perfuzii, injecții și îngrijire 24/7.",
    start_url: "/ro",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0c3a2d",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
