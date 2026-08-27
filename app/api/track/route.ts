import { NextResponse } from "next/server";
import { cleanPath, isLeadType, recordLead } from "@/lib/leads";

/**
 * Înregistrează un contact venit de pe site (apel, WhatsApp, formular…).
 * Public prin natura lui — de aceea acceptă STRICT tipurile din listă și nu
 * salvează nimic din ce trimite clientul în afară de tip.
 *
 * ponytail: fără rate limiting. Cifrele pot fi umflate de cineva care apelează
 * endpointul în buclă; pentru un site local riscul e teoretic. Dacă apare,
 * adaugă o limită per IP.
 */
export async function POST(req: Request) {
  try {
    const { type, page } = await req.json();
    if (!isLeadType(type)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await recordLead(type, cleanPath(page));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
