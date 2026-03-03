import { Router } from "express";
import OrderController from "../controllers/orderController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, OrderController.createOrder);
router.get("/", authMiddleware, OrderController.getOrders);

export default router;
