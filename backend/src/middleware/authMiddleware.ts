import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email?: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export default function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  console.log("authMiddleware token", token);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err);
    res.status(401).json({ message: "Invalid token" });
  }
}
