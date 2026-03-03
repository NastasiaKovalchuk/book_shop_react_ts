import mongoose, { Types } from "mongoose";

export interface IOrder {
  user: Types.ObjectId;
  items: {
    bookId: string;
    title: string;
    cover?: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  status: "pending" | "paid" | "shipped";
  createdAt: Date;
}

const OrderSchema = new mongoose.Schema<IOrder>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      bookId: String,
      title: String,
      cover: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
