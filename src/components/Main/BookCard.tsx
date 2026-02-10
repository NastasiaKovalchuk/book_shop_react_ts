// import style from "./Home.module.scss";

type Book = {
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
};

// Создаём тип пропсов
type BookCardProps = {
  book: Book;
};

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="bg-white">
      <li key={book.id}>
        <div>{book.title}</div>
        <div>{book.authors?.[0]?.name ?? "Unknown author"}</div>
        <img
          src={book.formats["image/jpeg"]}
          alt={book.formats["image/jpeg"]}
        />
      </li>
    </div>
  );
};

export default BookCard;
