import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { BookCard } from "../../Books/BookCard";
import { ArrowLeft, Sparkles } from "lucide-react";
import type { Book } from "../../../types/book.ts";

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const displayTitle = category
    ? category
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  useEffect(() => {
    if (!category) return;

    const formattedCategory = category.toLowerCase().replace(/\s+/g, "_");

    const fetchBooks = async (): Promise<void> => {
      setLoading(true);
      try {
        const url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(formattedCategory)}&limit=30`;
        const res = await fetch(url);
        const data = await res.json();

        setBooks(data.docs || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  return (
    <div className="min-h-screen bg-[#fdfcf0] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-700 font-medium transition-colors group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to all stories</span>
          </Link>
        </nav>

        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1 bg-orange-100/50 rounded-full text-orange-700 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <Sparkles size={14} />
            Category Archive
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-orange-950 italic">
            {displayTitle}
          </h1>
          <div className="w-24 h-1 bg-orange-200 mx-auto mt-6 rounded-full opacity-50"></div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse font-serif italic text-orange-300 text-xl">
              Curating the shelf...
            </div>
          </div>
        ) : (
          <>
            {books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                {books.map((book) => (
                  <BookCard key={book.key} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/50 rounded-[3rem] border-2 border-dashed border-orange-100">
                <p className="font-serif italic text-orange-900/50 text-xl">
                  It seems this shelf is temporarily empty.
                </p>
                <Link
                  to="/"
                  className="text-orange-700 font-bold hover:underline mt-4 inline-block"
                >
                  Explore other genres
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
