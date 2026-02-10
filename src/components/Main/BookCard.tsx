// import style from "./Home.module.scss";

type Book = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: { thumbnail: string };
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
        <div>{book.volumeInfo.title}</div>
        <div>{book.volumeInfo.authors}</div>
        <img
          src={book.volumeInfo.imageLinks?.thumbnail}
          alt={book.volumeInfo.title}
        />
      </li>
    </div>
  );
};

export default BookCard;
