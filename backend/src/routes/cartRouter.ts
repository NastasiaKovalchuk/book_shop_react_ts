import { Router } from "express";
import CartController from "../controllers/cartController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, CartController.getCart);
router.post("/add", authMiddleware, CartController.addToCart);
router.post("/decrease", authMiddleware, CartController.decreaseItem);
router.post("/remove", authMiddleware, CartController.removeFromCart);
router.post("/clear", authMiddleware, CartController.clearCart);

export default router;
