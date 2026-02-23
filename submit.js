export default async function handler(req, res) {
  // CORS (brauzerdan keladigan request uchun)
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOW_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  try {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ ok: false, error: "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID" });
    }

    const { name, surname, phone, role, score } = req.body || {};
    const cleanName = String(name || "").trim();
    const cleanSurname = String(surname || "").trim();
    const cleanPhone = String(phone || "").trim();
    const cleanRole = String(role || "").trim();
    const numScore = Number(score || 0);

    if (!cleanName || !cleanSurname || !cleanPhone || !cleanRole) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    // O‘tish ballari (server tomonda tekshiramiz)
    const PASS = {
      KASSIR: 6,
      OSHPAZ: 7,
      BOSHQARUVCHI: 8,
      DIREKTOR: 5
    };

    const passScore = PASS[cleanRole];
    if (passScore == null) {
      return res.status(400).json({ ok: false, error: "Unknown role" });
    }

    // Faqat o‘tgan bo‘lsa telegramga yuboriladi
    if (numScore < passScore) {
      return res.status(200).json({ ok: true, sent: false });
    }

    const text =
`🟧 HOTY DOGY • Yangi nomzod
👤 Ism: ${cleanName}
👤 Familiya: ${cleanSurname}
📞 Telefon: ${cleanPhone}
💼 Lavozim: ${cleanRole}
⭐ Ball: ${numScore} (O‘tish: ${passScore}+)
✅ Status: O‘TDΙ`;

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text
      })
    });

    const tgJson = await tgRes.json().catch(() => ({}));

    if (!tgRes.ok || tgJson.ok === false) {
      return res.status(502).json({ ok: false, error: "Telegram API error", details: tgJson });
    }

    return res.status(200).json({ ok: true, sent: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
}
