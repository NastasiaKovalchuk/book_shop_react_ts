import jwt from "jsonwebtoken";
import { Token } from "../db/models/token-model";

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.JWT_SECRET as string;

class TokenService {
  generateAccessToken(payload: any) {
    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "30m",
    });
    return accessToken;
  }

  generateRefreshToken(payload: any) {
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return refreshToken;
  }

  async saveToken(userId: string, refreshToken: string) {
    const token = await Token.findOne({ user: userId });
    if (token) {
      token.refreshToken = refreshToken;
      await token.save();
    }
    const newToken = await Token.create({ user: userId, refreshToken });
    return newToken;
  }
}

export default new TokenService();
