import style from "./Home.module.scss";

type Book = {
  id: number;
  title: string;
  authors: { name: string }[];
  languages: string[];
  summaries: string[];
  formats: {
    "image/jpeg"?: string;
  };
};

type BookCardProps = {
  book: Book;
};

export const BookCard = ({ book }: BookCardProps) => {
  const image = book.formats["image/jpeg"];

  const addPrice = (bookId: number) => {
    const min = 5;
    const max = 30;
    return (bookId % (max - min)) + min;
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
          {book.authors?.[0]?.name ?? "Unknown author"}
        </div>

        <div className={style.meta}>
          <div className={style.footer}>{book.languages?.join(", ")}</div>
          <div className={style.price}>${addPrice(book.id)}</div>
        </div>
      </div>
    </div>
  );
};
