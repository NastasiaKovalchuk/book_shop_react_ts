// index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const { users } = require("./users"); // CommonJS импорт
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Типизация user
interface IUser {
  email: string;
  passwordHash: string;
}

// Регистрация нового пользователя
app.post("/auth/register", async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password)
    return res.status(400).json({ error: "Email и пароль обязательны" });

  if ((users as IUser[]).find((u) => u.email === email)) {
    return res.status(400).json({ error: "Пользователь уже существует" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  (users as IUser[]).push({ email, passwordHash });

  res.json({ message: "Пользователь зарегистрирован" });
});

// Логин пользователя
app.post("/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = (users as IUser[]).find((u) => u.email === email);
  if (!user)
    return res.status(401).json({ error: "Неверный email или пароль" });

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid)
    return res.status(401).json({ error: "Неверный email или пароль" });

  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Защищённый роут
app.get("/profile", (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Нет токена" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Доступ разрешен", user: decoded });
  } catch (err) {
    res.status(401).json({ error: "Неверный токен" });
  }
});

app.listen(process.env.PORT || 4000, () =>
  console.log("Server running on port 4000"),
);
