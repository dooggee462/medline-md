/**
 * Trimiterea mesajelor către grupul de Telegram al clinicii.
 * Configurare (.env): TELEGRAM_BOT_TOKEN și TELEGRAM_CHAT_ID.
 * Fără ele, nu se trimite nimic și funcția spune că n-a reușit.
 */
export async function sendTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  try {
    // text simplu, fără parse_mode: nimic din ce scrie clientul nu strică formatarea
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    return true;
  } catch (e) {
    console.error("[telegram] trimitere eșuată:", e);
    return false;
  }
}
