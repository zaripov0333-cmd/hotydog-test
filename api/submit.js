export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, surname, phone, role, score } = req.body;

  if (parseInt(score) < 4) {
    return res.status(200).json({ message: "Score too low" });
  }

  const message = `
🔥 YANGI KANDIDAT

👤 Ism: ${name}
👤 Familya: ${surname}
📞 Telefon: ${phone}
💼 Lavozim: ${role}
⭐ Ball: ${score}
  `;

  const response = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: "-152266750",
        text: message,
      }),
    }
  );

  const data = await response.json();

  if (!data.ok) {
    return res.status(500).json({ message: "Telegram error", data });
  }

  res.status(200).json({ message: "Sent to Telegram" });
}
