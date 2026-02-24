import { useState, useEffect } from "react";
import { BookCard } from "../../Books/BookCard";
import style from "../../Main/Home.module.scss";

import { useParams } from "react-router";

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  language?: string[];
}

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (!category) return;

    const formattedCategory = category?.toLowerCase().replace(/\s+/g, "_");

    const fetchBooks = async (): Promise<void> => {
      try {
        const url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(formattedCategory ?? "")}&limit=30`;
        const res = await fetch(url);
        const data = await res.json();

        setBooks(data.docs || []);
      } catch (err) {
        console.error("Ошибка fetch:", err);
      }
    };

    fetchBooks();
  }, [category]);

  return (
    // <div>{category}</div>
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

export default CategoryPage;
