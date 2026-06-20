"use client";

import { useEffect } from "react";
import { tiktokVideoId } from "@/lib/content";

/**
 * Galerie de clipuri TikTok (embed oficial).
 * Încarcă scriptul embed.js care transformă blockquote-urile în playere.
 */
export function TikTokGallery({ urls }: { urls: string[] }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [urls.length]);

  return (
    <div className="grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {urls.map((url) => (
        <blockquote
          key={url}
          className="tiktok-embed"
          cite={url}
          data-video-id={tiktokVideoId(url)}
          style={{ maxWidth: 605, minWidth: 280, margin: 0 }}
        >
          <section></section>
        </blockquote>
      ))}
    </div>
  );
}
