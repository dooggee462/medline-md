/** Pornește verificarea reamintirilor o dată cu serverul (doar pe Node, nu în edge) */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { startReminders } = await import("./lib/reminders");
  startReminders();
}
