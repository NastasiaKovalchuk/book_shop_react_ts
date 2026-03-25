import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface IToken {
  user: Types.ObjectId;
  refreshToken: string;
}

const TokenSchema = new Schema<IToken>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  refreshToken: { type: String, required: true },
});

export const Token = model<IToken>("Token", TokenSchema);
