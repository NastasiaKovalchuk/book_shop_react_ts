import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../db/models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;

class UserController {
  // check email
  async checkEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      return res.json({
        exists: !!user,
      });
    } catch {
      return res.status(500).json({ message: "Server error" });
    }
  }

  // Login или Register
  async authenticate(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email & password required" });
      }

      let user = await User.findOne({ email });

      // ===== REGISTER =====
      if (!user) {
        const passwordHash = await bcrypt.hash(password, 10);

        user = await User.create({
          email,
          passwordHash,
        });

        const token = jwt.sign({ email }, JWT_SECRET, {
          expiresIn: "30d",
        });

        return res.json({
          mode: "register",
          token,
          user: user.id,
        });
      }

      // ===== LOGIN =====
      const isValid = await bcrypt.compare(password, user.passwordHash);

      if (!isValid) {
        return res.status(401).json({ message: "Wrong password" });
      }

      const token = jwt.sign({ email }, JWT_SECRET, {
        expiresIn: "30d",
      });

      return res.json({
        mode: "login",
        token,
        user: user.id,
      });
    } catch {
      return res.status(500).json({ message: "Auth error" });
    }
  }
}

export default new UserController();
