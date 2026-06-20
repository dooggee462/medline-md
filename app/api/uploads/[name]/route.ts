import { promises as fs } from "fs";
import path from "path";
import { UPLOADS_DIR } from "@/lib/posts";

const TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  // Securitate: doar nume de fișier simplu, fără path traversal
  const safe = path.basename(name);
  const ext = safe.split(".").pop()?.toLowerCase() || "";
  if (!TYPES[ext]) return new Response("Not found", { status: 404 });

  try {
    const buf = await fs.readFile(path.join(UPLOADS_DIR, safe));
    return new Response(new Uint8Array(buf), {
      headers: {
        "Content-Type": TYPES[ext],
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
