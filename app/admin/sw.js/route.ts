/**
 * Programul care primește notificările pe telefon. Trebuie servit chiar din
 * /admin, ca să poată lucra pentru tot panoul.
 */
export const dynamic = "force-static";

const SCRIPT = `
self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) {}
  const title = data.title || "Medline";
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || "",
      icon: "/icon-512.png",
      badge: "/icon-512.png",
      vibrate: [120, 60, 120],
      tag: data.tag || undefined,
      renotify: Boolean(data.tag),
      data: { url: data.url || "/admin/registru" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "/admin/registru";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes("/admin") && "focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
`;

export function GET() {
  return new Response(SCRIPT, {
    headers: {
      "Content-Type": "text/javascript; charset=utf-8",
      "Service-Worker-Allowed": "/admin",
      "Cache-Control": "no-cache",
    },
  });
}
