let users = [
  { login: "azizbek", password: "1234", role: "admin" },
  { login: "user1", password: "1111", role: "viewer" }
];

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { login, password } = req.body;

  const user = users.find(
    u => u.login === login && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Login yoki parol xato" });
  }

  res.status(200).json({ role: user.role });
}
