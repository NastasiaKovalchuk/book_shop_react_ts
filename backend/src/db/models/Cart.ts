import mongoose, { Types } from "mongoose";

interface ICartItem {
  bookId: string; // key из OpenLibrary
  title: string;
  cover?: string;
  price: number;
  quantity: number;
}

export interface ICart {
  user: Types.ObjectId;
  items: ICartItem[];
}

const CartItemSchema = new mongoose.Schema({
  bookId: { type: String, required: true },
  title: { type: String, required: true },
  cover: String,
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema<ICart>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [CartItemSchema],
});

export const Cart = mongoose.model<ICart>("Cart", CartSchema);
