import style from "./BookCard.module.scss";
import { useNavigate } from "react-router";
import { generatePrice } from "../../utils/price.ts";

type Book = {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  language?: string[];
};

type BookCardProps = {
  book: Book;
};

export const BookCard = ({ book }: BookCardProps) => {
  const navigate = useNavigate();
  const image = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  const handleChooseBook = (title: string, key: string) => {
    const workId = key.split("/").pop();
    const createSlug = (title: string) =>
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
    console.log(title, key);
    navigate(`/book/${createSlug(title)}-${workId}`);
    return;
  };

  return (
    <div
      className={style.card}
      onClick={() => handleChooseBook(book.title, book.key)}
    >
      <div className={style.image_wrapper}>
        {image ? (
          <img src={image} alt={book.title} className={style.image} />
        ) : (
          <span>No image</span>
        )}
      </div>

      <div className={style.content}>
        <div className={style.title}>{book.title}</div>

        <div className={style.author}>
          {book.author_name?.[0] ?? "Unknown author"}
        </div>

        <div className={style.meta}>
          <div className={style.footer}>{book.language?.join(", ")}</div>
          <div className={style.price}>${generatePrice(book.key)}</div>
        </div>
      </div>
    </div>
  );
};
