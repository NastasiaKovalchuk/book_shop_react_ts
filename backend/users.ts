import bcrypt from "bcryptjs";

interface User {
  email: string;
  passwordHash: string;
}

// Временная база пользователей
const users: User[] = [];

// Для теста можно заранее создать пользователя
const passwordHash = bcrypt.hashSync("123456", 10);
users.push({ email: "test@mail.com", passwordHash });

module.exports = { users };
