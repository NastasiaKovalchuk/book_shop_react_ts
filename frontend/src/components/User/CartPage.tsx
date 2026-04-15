import { useCartStore } from "../../store/cart.store.ts";
import style from "./CartPage.module.scss";
import * as api from "../../api/cart.ts";
import { useAuthStore } from "../../store/auth.store.ts";

export const CartPage = () => {
  const cart = useCartStore((state) => state.items);
  const increaseItem = useCartStore((state) => state.increaseItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const accessToken = useAuthStore((s) => s.accessToken);

  const handleIncrease = async (bookId: string) => {
    if (!accessToken) {
      console.log("Please login to manage cart");
      return;
    }

    const item = cart.find((i) => i.bookId === bookId);
    if (!item) return;

    increaseItem(bookId);
    try {
      await api.addItem(item);
    } catch (err) {
      console.error("Failed to sync cart with server:", err);
    }
  };

  const handleDecrease = async (bookId: string) => {
    if (!accessToken) {
      console.log("Please login to manage cart");
      return;
    }

    const item = cart.find((i) => i.bookId === bookId);
    if (!item) return;

    if (item && item.quantity > 1) {
      decreaseItem(bookId);
      await api.decreaseItem(bookId);
    } else {
      removeItem(bookId);
    }
  };

  const handleClearCart = async () => {
    if (!accessToken) return;

    clearCart();
    try {
      const data = await api.clearCart();
      console.log("Success:", data.message);
    } catch (err) {
      console.error("Clear cart error:", err);
    }
  };

  const handleRemoveItem = async (bookId: string) => {
    if (!accessToken) return;
    removeItem(bookId);

    try {
      await api.removeItem(bookId);
    } catch (err) {
      console.error("Clear cart error:", err);
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className={style.cart}>
      {!cart && <div className={style.empty}>Your cart is empty</div>}
      <h2>Your Cart</h2>
      <ul className={style.items}>
        {cart.map((item) => (
          <li key={item.bookId} className={style.item}>
            {item.cover && (
              <img src={item.cover} alt={item.title} className={style.cover} />
            )}
            <div className={style.info}>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <div className={style.quantity}>
                <button onClick={() => handleDecrease(item.bookId)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(item.bookId)}>+</button>
              </div>
              <button
                className={style.removeBtn}
                onClick={() => handleRemoveItem(item.bookId)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={style.footer}>
        <strong>Total: ${totalPrice}</strong>
        <button onClick={handleClearCart}>Clear Cart</button>
      </div>
    </div>
  );
};
