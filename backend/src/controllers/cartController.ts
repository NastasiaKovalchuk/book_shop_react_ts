import { Request, Response } from "express";
import { Cart } from "../db/models/Cart";

interface AuthRequest extends Request {
  user?: any;
}

const CartController = {
  async getCart(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;

      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  async addToCart(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;

      const { bookId, title, cover, price } = req.body;

      if (!bookId || !title || !price) {
        return res.status(400).json({ message: "Missing fields" });
      }

      let cart = await Cart.findOne({ user: userId });

      if (!cart) {
        cart = await Cart.create({
          user: userId,
          items: [],
        });
      }

      const existingItem = cart.items.find((item) => item.bookId === bookId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({
          bookId,
          title,
          cover,
          price,
          quantity: 1,
        });
      }

      await cart.save();

      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  async decreaseItem(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const { bookId } = req.body;

      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const item = cart.items.find((i) => i.bookId === bookId);

      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart.items = cart.items.filter((i) => i.bookId !== bookId);
      }

      await cart.save();

      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  async removeFromCart(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const { bookId } = req.body;

      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      cart.items = cart.items.filter((item) => item.bookId !== bookId);

      await cart.save();

      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  async clearCart(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;

      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      cart.items = [];
      await cart.save();

      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default CartController;
