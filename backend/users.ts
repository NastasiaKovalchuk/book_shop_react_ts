import bcrypt from "bcryptjs";

export interface User {
  email: string;
  passwordHash: string;
}

export const users: User[] = [];

const passwordHash = bcrypt.hashSync("123456", 10);
users.push({ email: "test@mail.com", passwordHash });
