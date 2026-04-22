import { type CartItem } from "../types/cart";
import { apiRequest } from "./base";

export const getCart = async () => {
  return apiRequest("/cart", {
    method: "GET",
    credentials: "include",
  });
};

export const addItem = async (item: CartItem) => {
  // const res = await fetch("https://book-shop-react-ts.onrender.com/cart/add", {
  return apiRequest("/cart/add", {
    method: "POST",
    body: JSON.stringify({
      bookId: item.bookId,
      title: item.title,
      cover: item.cover,
      price: item.price,
    }),
  });
};

export const decreaseItem = async (bookId: string) => {
  return apiRequest("/cart/decrease", {
    method: "POST",
    body: JSON.stringify({ bookId }),
  });
};

export const removeItem = async (bookId: string) => {
  return apiRequest("/cart/remove", {
    method: "POST",
    body: JSON.stringify({ bookId }),
  });
};

export const clearCart = async () => {
  return apiRequest("/cart/clear", {
    method: "POST",
  });
};
