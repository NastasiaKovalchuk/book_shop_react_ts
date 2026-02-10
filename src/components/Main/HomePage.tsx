import { useState, useEffect } from "react";
import { BookCard } from "./BookCard";
import style from "./Home.module.scss";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: { thumbnail: string };
  };
}

const Main = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async (): Promise<void> => {
      try {
        const url =
          "https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=10";
        const res = await fetch(url);
        const data = await res.json();
        console.log("data.items", data.items);
        setBooks(data.items || []);
      } catch (err) {
        console.error("Ошибка fetch:", err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
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
