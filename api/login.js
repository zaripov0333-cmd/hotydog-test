let users = [
  { login: "azizbek", password: "1234", role: "admin" }
];

export default function handler(req, res) {

  if (req.method === "POST") {
    const { login, password } = req.body;

    const user = users.find(
      u => u.login === login && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Login yoki parol xato" });
    }

    return res.status(200).json({ role: user.role });
  }

  // yangi user qo‘shish (faqat admin uchun)
  if (req.method === "PUT") {
    const { login, password, role } = req.body;

    users.push({ login, password, role });

    return res.status(200).json({ message: "Foydalanuvchi qo‘shildi" });
  }

  res.status(405).end();
}
