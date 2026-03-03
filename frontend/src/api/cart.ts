import { type CartItem } from "../types/cart";

export const addItem = async (item: CartItem, accessToken: string) => {
  // const res = await fetch("https://book-shop-react-ts.onrender.com/cart/add", {
  const res = await fetch("http://localhost:4000/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      bookId: item.bookId,
      title: item.title,
      cover: item.cover,
      price: item.price,
    }),
  });
  if (!res.ok) {
    const error = await res.json();
    console.log("Error", error);
    throw new Error(error.message);
  }

  return res.json();
};

export const decreaseItem = async (bookId: string, accessToken: string) => {
  const res = await fetch("http://localhost:4000/cart/decrease", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ bookId }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.log("Error", error);
    throw new Error(error.message);
  }

  return res.json();
};

export const removeItem = async (bookId: string, accessToken: string) => {
  const res = await fetch("http://localhost:4000/cart/remove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ bookId }),
  });
  if (!res.ok) {
    const error = await res.json();
    console.log("Error", error);
    throw new Error(error.message);
  }
  return res.json();
};

export const clearCart = async (accessToken: string) => {
  const res = await fetch("http://localhost:4000/cart/clear", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    console.log("Error", error);
    throw new Error(error.message);
  }
  return res.json();
};
