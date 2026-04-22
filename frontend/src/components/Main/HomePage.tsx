import { useState, useEffect } from "react";
import BookLoader from "../Books/BooksLoader.tsx";
import { BookCard } from "../Books/BookCard";
import { BOOKS } from "../../constants/books.ts";
import { type Book } from "../../types/book";

const Main = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async (): Promise<void> => {
      try {
        const url = "https://openlibrary.org/search.json?title=book";
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }

        const data = await res.json();

        setBooks(data.docs.slice(0, 30) || []);
        setLoading(false);
      } catch (err) {
        setBooks(BOOKS);
        console.error("Ошибка fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <BookLoader />;

  return (
    <div className="min-h-screen bg-[#fdfcf0] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif italic text-orange-900 mb-10 text-center">
          Handpicked for your cozy evening
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
