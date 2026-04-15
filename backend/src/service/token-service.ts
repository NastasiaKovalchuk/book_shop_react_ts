import jwt from "jsonwebtoken";
import { Token } from "../db/models/token-model";

interface TokenPayload {
  id: string;
  email: string;
}

class TokenService {
  generateTokens(payload: TokenPayload) {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_SECRET as string,
      { expiresIn: "30d" },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const token = await Token.findOne({ user: userId });

    if (token) {
      token.refreshToken = refreshToken;
      return token.save();
    }
    const newToken = await Token.create({ user: userId, refreshToken });
    return newToken;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  }

  async validateRefreshToken(refreshToken: string) {
    try {
      const userData = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET as string,
      ) as TokenPayload;

      return userData;
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken: string) {
    try {
      const tokenData = await Token.findOne({ refreshToken });
      return tokenData;
    } catch (error) {}
  }
}

export default new TokenService();
