import mongoose from "mongoose";

export interface IUser {
  email: string;
  passwordHash: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", UserSchema);
