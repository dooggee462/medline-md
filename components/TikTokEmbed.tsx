"use client";

import { useEffect } from "react";
import { tiktokVideoId } from "@/lib/content";

/**
 * Embed pentru un singur clip TikTok (folosit în articolele de blog).
 * Încarcă scriptul oficial embed.js care transformă blockquote-ul în player.
 */
export function TikTokEmbed({ url }: { url: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [url]);

  return (
    <div className="flex justify-center">
      <blockquote
        className="tiktok-embed"
        cite={url}
        data-video-id={tiktokVideoId(url)}
        style={{ maxWidth: 605, minWidth: 280, margin: 0 }}
      >
        <section></section>
      </blockquote>
    </div>
  );
}
