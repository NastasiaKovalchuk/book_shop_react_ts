import mongoose, { Types } from "mongoose";

export interface IUser {
  email: string;
  passwordHash: string;
  cart: Types.ObjectId;
  orders: Types.ObjectId[];
}

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

export const User = mongoose.model<IUser>("User", UserSchema);
