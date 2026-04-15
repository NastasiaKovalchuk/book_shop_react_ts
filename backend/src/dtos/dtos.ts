import { Types } from "mongoose";

interface IUserModel {
  email: string;
  _id: Types.ObjectId;
}

export default class UserDto {
  email: string;
  id: string;
  constructor(model: IUserModel) {
    this.email = model.email;
    this.id = String(model._id);
  }
}
