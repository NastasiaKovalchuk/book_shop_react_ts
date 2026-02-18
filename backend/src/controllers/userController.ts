import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../db/models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.JWT_SECRET as string;

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
    const generateAccessToken = (user: any) => {
      return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });
    };

    const generateRefreshToken = (user: any) => {
      return jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: "7d" });
    };
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

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
          mode: "register",
          accessToken,
          user: user.id,
        });
      }

      // ===== LOGIN =====
      const isValid = await bcrypt.compare(password, user.passwordHash);

      if (!isValid) {
        return res.status(401).json({ message: "Wrong password" });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        mode: "login",
        accessToken,
        user: user.id,
      });
    } catch {
      return res.status(500).json({ message: "Auth error" });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token" });
      }
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as {
        id: string;
      };

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newAccessToken = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" },
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        accessToken: newAccessToken,
      });
    } catch (err) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  }
}

export default new UserController();
