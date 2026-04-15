import { Request, Response } from "express";
import { Order } from "../db/models/Order";
import { Cart } from "../db/models/Cart";

interface AuthRequest extends Request {
  user?: any;
}

const OrderController = {
  async createOrder(req: AuthRequest, res: Response) {
    try {
    } catch {}
  },

  async getOrders(req: AuthRequest, res: Response) {
    try {
    } catch {}
  },
};

export default OrderController;
