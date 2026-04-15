import bcrypt from "bcryptjs";
import { User } from "../db/models/user-model";
import TokenService from "./token-service";
import UserDto from "../dtos/dtos";
import ApiError from "../exeptions/api-error";

class UserService {
  async checkEmail(email: string) {
    const user = await User.findOne({ email });
    return !!user;
  }

  async authenticate(email: string, password: string) {
    let user = await User.findOne({ email });
    let mode: "login" | "register" = "login";

    if (!user) {
      console.log(email, password);
      mode = "register";
      const passwordHash = await bcrypt.hash(password, 10);

      user = await User.create({ email, passwordHash });
      console.log("user", user);
    } else {
      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) throw ApiError.BadRequest("Wrong password");
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto, mode };
  }

  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw ApiError.UnauthorizedError();

    const userData = await TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();

    const user = await User.findById(userData.id);
    if (!user) throw ApiError.UnauthorizedError();

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

export default new UserService();
