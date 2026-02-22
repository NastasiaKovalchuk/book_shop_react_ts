import style from "./Home.module.scss";

// type Book = {
//   id: number;
//   title: string;
//   authors: { name: string }[];
//   languages: string[];
//   summaries: string[];
//   formats: {
//     "image/jpeg"?: string;
//   };
// };
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
  const image = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  const addPrice = (key: string) => {
    const min = 5;
    const max = 30;

    // берём числовую часть из key, например "/works/OL99529W"
    const numericPart = key.replace(/\D/g, "");
    const baseNumber = Number(numericPart) || 1;

    return (baseNumber % (max - min)) + min;
  };
  return (
    <div className={style.card}>
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
          <div className={style.price}>${addPrice(book.key)}</div>
        </div>
      </div>
    </div>
  );
};
