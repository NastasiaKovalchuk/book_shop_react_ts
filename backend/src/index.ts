import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter";
import cartRouter from "./routes/cartRouter";
import orderRouter from "./routes/orderRouter";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error-middleware";

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);
app.use(cookieParser());
app.use(express.json());

// ===== ROUTES =====
app.use("/auth", userRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);

// ===== ERROR MIDDLEWARE =====
app.use(errorMiddleware);

// ===== DB CONNECT =====
mongoose
  .connect(process.env.MONGO_URI as string)
  .then((): void => console.log("MongoDB connected"))
  .catch(console.error);

// =====================================================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
