import { NextResponse } from "next/server";
import { cleanPath, isLeadType, isVisitorId, recordContact, recordVisit } from "@/lib/leads";

/** Roboții de indexare rulează JavaScript și ar umfla vizitele */
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|headless|lighthouse|pingdom|preview|monitor/i;

/**
 * Înregistrează o vizită sau un contact. Public prin natura lui: acceptă strict
 * tipurile din listă și un ID de forma generată de noi, și nu salvează nimic
 * altceva din ce trimite browserul.
 *
 * ponytail: fără rate limiting. Cineva care trimite ID-uri inventate în buclă
 * poate umfla cifrele; pentru un site local riscul e teoretic. Dacă apare,
 * adaugă o limită per IP.
 */
export async function POST(req: Request) {
  try {
    const { type, page, vid } = await req.json();
    if (!isVisitorId(vid)) return NextResponse.json({ ok: false }, { status: 400 });
    if (BOT.test(req.headers.get("user-agent") ?? "")) return NextResponse.json({ ok: true });

    if (type === "visit") await recordVisit(vid);
    else if (isLeadType(type)) await recordContact(vid, type, cleanPath(page));
    else return NextResponse.json({ ok: false }, { status: 400 });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
