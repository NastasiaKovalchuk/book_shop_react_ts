import { useState, useEffect } from "react";
import { BookCard } from "./BookCard";
import style from "./Home.module.scss";

export interface Book {
  id: number;
  title: string;
  authors: {
    name: string;
  }[];
  languages: string[];
  summaries: string[];
  formats: {
    "image/jpeg"?: string;
  };
}

const Main = () => {
  const [books, setBooks] = useState<Book[]>([]);

  console.log("render1");

  useEffect(() => {
    const fetchBooks = async (): Promise<void> => {
      try {
        const url = "https://gutendex.com/books";
        const res = await fetch(url);
        const data = await res.json();
        console.log("render2");
        setBooks(data.results || []);
      } catch (err) {
        console.error("Ошибка fetch:", err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className={style.books_grid}>
      {books.map((book) => {
        return (
          <BookCard
            key={book.id}
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
