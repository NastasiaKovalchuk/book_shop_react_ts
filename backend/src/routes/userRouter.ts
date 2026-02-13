import { Router } from "express";
import UserController from "../controllers/userController";

const router = Router();

router.post("/check-email", UserController.checkEmail);
router.post("/authenticate", UserController.authenticate);

export default router;
