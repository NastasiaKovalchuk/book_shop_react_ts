import { Request, Response, NextFunction } from "express";
import userService from "../service/user-service";

class UserController {
  async checkEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const exists = await userService.checkEmail(email);
      return res.json({ exists });
    } catch (e) {
      next(e);
    }
  }

  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await userService.authenticate(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        secure: false,
        // sameSite: "strict",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      return res.json({
        mode: userData.mode,
        accessToken: userData.accessToken,
        user: userData.user,
      });
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json({ message: "Logged out" });
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
