import { useCartStore } from "../../store/cart.store.ts";
import * as api from "../../api/cart.ts";
import { useAuthStore } from "../../store/auth.store.ts";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Heart,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export const CartPage = () => {
  const cart = useCartStore((state) => state.items);
  const { increaseItem, decreaseItem, removeItem, clearCart } = useCartStore();
  const accessToken = useAuthStore((s) => s.accessToken);

  const handleIncrease = async (bookId: string) => {
    if (!accessToken) return;
    const item = cart.find((i) => i.bookId === bookId);
    if (!item) return;

    try {
      await api.addItem(item);
      increaseItem(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecrease = async (bookId: string) => {
    if (!accessToken) return;
    const item = cart.find((i) => i.bookId === bookId);
    if (!item || item.quantity <= 1) return;

    try {
      await api.decreaseItem(bookId);
      decreaseItem(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveItem = async (bookId: string) => {
    if (!accessToken) return;

    try {
      await api.removeItem(bookId);
      removeItem(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-[#fdfcf0]">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-300">
          <ShoppingBag size={48} strokeWidth={1} />
        </div>
        <h2 className="text-3xl font-serif italic text-orange-900 mb-2 text-center">
          Your bag is empty
        </h2>
        <p className="text-orange-400/80 mb-8 max-w-xs text-center font-medium">
          Your reading nook looks a bit lonely. Let's find some stories to fill
          it!
        </p>
        <Link to="/">
          <Button className="rounded-full px-10 h-14 text-lg bg-orange-800 hover:bg-orange-900 shadow-xl shadow-orange-900/10 transition-all">
            <ArrowLeft className="mr-2 w-5 h-5" /> Back to the Shelf
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfcf0] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-end justify-between mb-10 border-b border-orange-100 pb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-orange-950 italic tracking-tight">
              My Reading Bag
            </h1>
            <p className="text-orange-400 font-medium italic mt-1">
              You've chosen {cart.length} stories so far
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-bold uppercase tracking-widest text-orange-300 hover:text-red-400 flex items-center gap-1.5 transition-colors group"
          >
            <Trash2 size={14} /> Clear Bag
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item) => (
              <div
                key={item.bookId}
                className="bg-white/60 p-4 md:p-6 rounded-[2rem] border border-orange-50 flex gap-6 items-center group transition-all hover:bg-white hover:shadow-[0_20px_40px_rgba(120,60,0,0.05)]"
              >
                <div className="w-20 h-28 md:w-24 md:h-36 bg-orange-50 rounded-2xl overflow-hidden shrink-0 shadow-sm relative">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-y-0 left-0 w-2 bg-black/5"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-serif font-bold text-orange-950 text-lg md:text-xl truncate pr-4">
                      {item.title}
                    </h3>
                    <button
                      onClick={() => handleRemoveItem(item.bookId)}
                      className="text-orange-200 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <p className="text-orange-700 font-black text-lg mb-4">
                    ${item.price}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-orange-50/50 rounded-full p-1 border border-orange-100/50">
                      <button
                        onClick={() => handleDecrease(item.bookId)}
                        className="p-1.5 hover:bg-white hover:text-orange-700 rounded-full transition-all text-orange-300 disabled:opacity-20"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-orange-900 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrease(item.bookId)}
                        className="p-1.5 hover:bg-white hover:text-orange-700 rounded-full transition-all text-orange-300"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-orange-300 font-bold uppercase tracking-tighter">
                        Subtotal
                      </p>
                      <p className="text-orange-900 font-bold">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-orange-950 text-orange-50 p-8 rounded-[2.5rem] shadow-2xl shadow-orange-900/20 sticky top-28 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 blur-[80px] rounded-full"></div>

              <h2 className="text-xl font-serif italic mb-8 border-b border-orange-900/50 pb-4">
                Summary
              </h2>

              <div className="space-y-4 mb-10 font-medium">
                <div className="flex justify-between text-orange-200/60">
                  <span>Subtotal</span>
                  <span className="text-orange-50">${totalPrice}</span>
                </div>
                <div className="flex justify-between text-orange-200/60">
                  <span>Home Delivery</span>
                  <span className="text-orange-300 italic tracking-wide font-bold text-xs uppercase">
                    Free of charge
                  </span>
                </div>

                <div className="pt-6 border-t border-orange-900/50 flex justify-between items-end">
                  <div>
                    <span className="text-orange-200/40 text-[10px] uppercase font-bold tracking-widest block mb-1">
                      Total Amount
                    </span>
                    <span className="text-3xl font-serif italic font-bold text-orange-200">
                      ${totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              <Button className="w-full h-16 rounded-2xl text-lg font-bold bg-orange-700 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-black/20">
                Checkout
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>

              <div className="mt-8 flex items-center justify-center gap-2 opacity-30 text-[9px] font-bold uppercase tracking-[0.2em]">
                <Heart size={10} className="fill-current" />
                Handpicked with love
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
