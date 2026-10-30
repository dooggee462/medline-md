"use client";

import { useEffect, useState } from "react";

/** Cheia publică vine din server, în formatul pe care îl cere browserul */
function keyToBytes(key: string): ArrayBuffer {
  const padded = (key + "=".repeat((4 - (key.length % 4)) % 4)).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(padded);
  const bytes = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return bytes.buffer;
}

type Stare = "verific" | "neacceptat" | "blocat" | "oprit" | "pornit";

/**
 * Pornește notificările pe telefonul curent. Pe iPhone merge doar dacă panoul
 * e pus pe ecranul principal, de asta spunem asta din timp.
 */
export function PushButton({ publicKey }: { publicKey: string }) {
  const [stare, setStare] = useState<Stare>("verific");
  const [lucrez, setLucrez] = useState(false);
  const [mesaj, setMesaj] = useState("");

  useEffect(() => {
    if (!publicKey || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      setStare("neacceptat");
      return;
    }
    if (Notification.permission === "denied") {
      setStare("blocat");
      return;
    }
    navigator.serviceWorker
      .getRegistration("/admin")
      .then((reg) => reg?.pushManager.getSubscription())
      .then((sub) => setStare(sub ? "pornit" : "oprit"))
      .catch(() => setStare("oprit"));
  }, [publicKey]);

  async function trimite(action: string, subscription?: unknown) {
    const res = await fetch("/api/admin/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, subscription }),
    });
    return res.ok ? ((await res.json()) as { ok: boolean; trimise?: number }) : { ok: false };
  }

  async function porneste() {
    setLucrez(true);
    setMesaj("");
    try {
      const permisiune = await Notification.requestPermission();
      if (permisiune !== "granted") {
        setStare(permisiune === "denied" ? "blocat" : "oprit");
        return;
      }
      const reg = await navigator.serviceWorker.register("/admin/sw.js", { scope: "/admin" });
      await navigator.serviceWorker.ready;
      const sub =
        (await reg.pushManager.getSubscription()) ??
        (await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: keyToBytes(publicKey),
        }));
      const { ok } = await trimite("subscribe", sub.toJSON());
      setStare(ok ? "pornit" : "oprit");
      setMesaj(ok ? "Gata. Ar trebui să fi primit deja o notificare." : "Nu s-a putut salva. Încearcă din nou.");
    } catch (e) {
      setMesaj(`Nu a mers: ${(e as Error).message}`);
      setStare("oprit");
    } finally {
      setLucrez(false);
    }
  }

  async function opreste() {
    setLucrez(true);
    const reg = await navigator.serviceWorker.getRegistration("/admin");
    const sub = await reg?.pushManager.getSubscription();
    if (sub) {
      await trimite("unsubscribe", sub.toJSON());
      await sub.unsubscribe();
    }
    setStare("oprit");
    setMesaj("Notificările sunt oprite pe telefonul acesta.");
    setLucrez(false);
  }

  async function proba() {
    setLucrez(true);
    const r = await trimite("test");
    setMesaj(r.ok ? "Trimisă. Dacă nu o vezi, verifică setările telefonului." : "Nu a plecat nicio notificare.");
    setLucrez(false);
  }

  const buton = "rounded-lg px-4 py-2.5 text-sm font-semibold disabled:opacity-60";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      {stare === "neacceptat" ? (
        <p className="text-sm text-slate-600">
          Browserul acesta nu poate primi notificări. Pe iPhone, pune întâi panoul pe ecranul principal,
          din Safari, și deschide-l de acolo.
        </p>
      ) : stare === "blocat" ? (
        <p className="text-sm text-amber-700">
          Notificările sunt blocate din setările telefonului pentru medline.md. Permite-le de acolo, apoi
          revino la pagina asta.
        </p>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              stare === "pornit" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"
            }`}
          >
            {stare === "pornit" ? "pornite pe telefonul acesta" : "oprite pe telefonul acesta"}
          </span>

          {stare === "pornit" ? (
            <>
              <button onClick={proba} disabled={lucrez} className={`${buton} bg-brand-600 text-white hover:bg-brand-700`}>
                Trimite o probă
              </button>
              <button onClick={opreste} disabled={lucrez} className={`${buton} border border-slate-300 text-slate-600 hover:bg-slate-50`}>
                Oprește
              </button>
            </>
          ) : (
            <button onClick={porneste} disabled={lucrez} className={`${buton} bg-brand-600 text-white hover:bg-brand-700`}>
              {lucrez ? "Un moment…" : "Activează notificările"}
            </button>
          )}
        </div>
      )}
      {mesaj && <p className="mt-3 text-sm text-slate-500">{mesaj}</p>}
    </div>
  );
}
