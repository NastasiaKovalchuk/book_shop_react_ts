import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter";
import cartRouter from "./routes/cartRouter";
import orderRouter from "./routes/orderRouter";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ===== DB CONNECT =====
mongoose
  .connect(process.env.MONGO_URI as string)
  .then((): void => console.log("MongoDB connected"))
  .catch(console.error);

// ===== ROUTES =====
app.use("/auth", userRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);

// =====================================================
app.listen(process.env.PORT || 4000, () => {
  console.log("Server running");
});
