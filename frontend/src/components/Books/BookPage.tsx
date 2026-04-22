import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import BookCardLoader from "./BookCardLoader";
import { generatePrice } from "../../utils/price.ts";
import { type BookDetails } from "../../types/book";
import { useCartStore } from "../../store/cart.store.ts";
import * as api from "../../api/cart.ts";
import { useAuthStore } from "../../store/auth.store.ts";
import {
  ArrowLeft,
  ShoppingCart,
  Languages,
  User2,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

export const BookPage = () => {
  const { id } = useParams<{ id: string }>();

  const [book, setBook] = useState<BookDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    const workId = id.split("-").pop();

    const getBook = async () => {
      setLoading(true);
      try {
        setError(null);
        const workRes = await fetch(
          `https://openlibrary.org/works/${workId}.json`,
          { signal: controller.signal },
        );
        if (!workRes.ok) throw new Error("Work not found");
        const workData = await workRes.json();

        const authorPromises =
          workData.authors?.map((a: any) =>
            fetch(`https://openlibrary.org${a.author.key}.json`, {
              signal: controller.signal,
            }).then((res) => res.json()),
          ) || [];

        const authorsData = await Promise.all(authorPromises);
        const editionsRes = await fetch(
          `https://openlibrary.org/works/${workId}/editions.json?limit=5`,
          { signal: controller.signal },
        );
        const editionsData = await editionsRes.json();

        const languages =
          editionsData.entries?.[0]?.languages?.map((l: any) =>
            l.key.split("/").pop(),
          ) || [];
        const coverId = workData.covers?.[0];

        setBook({
          key: workId || "",
          title: workData.title,
          description:
            typeof workData.description === "string"
              ? workData.description
              : workData.description?.value,
          cover: coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
            : undefined,
          authors: authorsData.map((a) => a.name),
          languages,
        });
      } catch (err: any) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBook();
    return () => controller.abort();
  }, [id]);

  const triggerForMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleAddToCart = async (book: BookDetails) => {
    if (!accessToken) {
      alert("Please login to add books to your cart");
      return;
    }
    const price = generatePrice(book.key);
    const newItem = {
      bookId: book.key,
      title: book.title,
      cover: book.cover,
      price,
      quantity: 1,
    };

    try {
      await api.addItem(newItem);
      addItem(newItem);
      triggerForMessage();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="bg-[#fdfcf0] min-h-screen pt-20">
        <BookCardLoader />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-orange-800 font-serif italic">
        Oops! We couldn't find this story: {error}
      </div>
    );
  if (!book) return null;

  return (
    <div className="min-h-screen bg-[#fdfcf0] pb-20">
      <div
        className={`fixed top-24 right-6 z-9999 transition-all duration-500 transform ${showMessage ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}
      >
        <div className="bg-orange-900 text-orange-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-orange-800">
          <CheckCircle2 className="w-5 h-5 text-orange-300" />
          <span className="font-medium">Added to your reading nook</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-700 font-medium transition mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to the shelf
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="sticky top-28">
              <div className="relative group">
                <div className="absolute -inset-4 bg-orange-200 blur-3xl opacity-20 group-hover:opacity-40 transition duration-700"></div>

                <div className="relative bg-white p-3 rounded-[2rem] shadow-[0_20px_50px_rgba(120,60,0,0.1)] border border-orange-100/50 overflow-hidden">
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full rounded-2xl object-cover shadow-md transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="aspect-3/4 flex flex-col items-center justify-center text-orange-200 bg-orange-50 rounded-2xl">
                      <BookOpen size={48} strokeWidth={1} />
                      <span className="mt-2 italic">No cover found</span>
                    </div>
                  )}

                  <div className="absolute left-3 top-3 bottom-3 w-4 bg-linear-to-r from-black/10 to-transparent pointer-events-none rounded-l-2xl"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-orange-950 leading-[1.1] mb-6 italic">
              {book.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-orange-100/50 text-orange-800 border border-orange-200/50 text-sm font-medium">
                <User2 className="w-4 h-4 text-orange-400" />
                {book.authors.join(", ") || "Unknown Storyteller"}
              </div>

              <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-orange-100/50 text-orange-800 border border-orange-200/50 text-sm font-medium uppercase tracking-wider">
                <Languages className="w-4 h-4 text-orange-400" />
                {book.languages.slice(0, 3).join(", ") || "English"}
              </div>
            </div>

            <div className="relative bg-white/50 border border-orange-100 rounded-[2.5rem] p-8 mb-12 shadow-sm">
              <div className="flex items-center gap-2 text-orange-300 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                <BookOpen className="w-4 h-4" />
                The Story
              </div>

              <p className="text-orange-900/80 leading-relaxed text-xl font-light italic">
                {book.description ||
                  "Every book is a new world waiting to be opened. This particular tale has no description yet, but it's ready for you to explore."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-10 border-t border-orange-100">
              <div className="flex flex-col">
                <span className="text-xs text-orange-300 font-bold uppercase tracking-widest mb-1">
                  Adopt this book for
                </span>
                <span className="text-5xl font-black text-orange-700">
                  ${generatePrice(book.key)}
                </span>
              </div>

              <button
                onClick={() => handleAddToCart(book)}
                className="group relative w-full sm:w-auto"
              >
                <div className="absolute -inset-1 bg-orange-400 blur-xl opacity-20 group-hover:opacity-40 transition"></div>
                <div className="relative flex items-center justify-center gap-3 px-12 py-5 rounded-2xl text-white font-bold text-lg bg-orange-800 hover:bg-orange-900 shadow-xl transition-all active:scale-95 overflow-hidden">
                  <ShoppingCart className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                  Add to my bag
                  <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
