import { useState, useEffect } from "react";
import BookLoader from "../Books/BooksLoader.tsx";
import { BookCard } from "../Books/BookCard";
import style from "./Home.module.scss";
import { BOOKS } from "../../constants/books.ts";
// interface for Open Library
export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  language?: string[];
}

const Main = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("fetchBooks");
    const fetchBooks = async (): Promise<void> => {
      try {
        const url = "https://openlibrary.org/search.json?title=book";
        const res = await fetch(url);
        const data = await res.json();
        // console.log("fetchBooks", data.docs);
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
    <div className={style.books_grid}>
      {books.map((book) => {
        return (
          <BookCard
            key={book.key}
            book={book}
            // isSelected={book.id === props.selectedTrackId}
            // onSelect={handleClick}
          />
        );
      })}
    </div>
  );
};

export default Main;
