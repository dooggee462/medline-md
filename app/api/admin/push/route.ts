import { NextResponse } from "next/server";
import { currentUser } from "@/lib/team";
import { addSubscription, removeSubscription, sendPush, type PushSub } from "@/lib/push";

/** Pornirea, oprirea și proba notificărilor de pe un telefon */
export async function POST(req: Request) {
  const session = await currentUser();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  let body: { action?: string; subscription?: PushSub };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const sub = body.subscription;
  const valid = sub && typeof sub.endpoint === "string" && sub.keys?.p256dh && sub.keys?.auth;

  if (body.action === "subscribe") {
    if (!valid) return NextResponse.json({ ok: false }, { status: 400 });
    await addSubscription(session.user, sub);
    await sendPush([session.user], {
      title: "Notificările sunt pornite",
      body: `Telefonul acesta va primi anunțurile pentru ${session.name}.`,
      url: "/admin/notificari",
    });
    return NextResponse.json({ ok: true });
  }

  if (body.action === "unsubscribe") {
    if (!valid) return NextResponse.json({ ok: false }, { status: 400 });
    await removeSubscription(session.user, sub.endpoint);
    return NextResponse.json({ ok: true });
  }

  if (body.action === "test") {
    const trimise = await sendPush([session.user], {
      title: "🔔 Probă",
      body: "Așa arată o notificare de la registru.",
      url: "/admin/notificari",
    });
    return NextResponse.json({ ok: trimise > 0, trimise });
  }

  return NextResponse.json({ ok: false }, { status: 400 });
}
