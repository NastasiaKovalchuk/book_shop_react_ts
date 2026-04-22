import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { generatePrice } from "../../utils/price.ts";
import { type Book } from "../../types/book";
import { Book as BookIcon } from "lucide-react";

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
    navigate(`/book/${createSlug(title)}-${workId}`);
  };

  return (
    <Card
      className="
        group flex flex-col h-full bg-white rounded-[24px] overflow-hidden 
        border-none shadow-[0_8px_20px_rgba(120,60,0,0.05)]
        transition-all duration-500 cursor-pointer
        hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(120,60,0,0.12)]
      "
      onClick={() => handleChooseBook(book.title, book.key)}
    >
      <div className="relative w-full h-[280px] bg-orange-50/30 flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute left-0 top-0 w-1 h-full bg-orange-200/50 opacity-0 group-hover:opacity-100 transition-opacity" />

        {image ? (
          <img
            src={image}
            alt={book.title}
            className="w-full h-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-orange-200">
            <BookIcon size={40} strokeWidth={1} />
            <span className="text-xs italic">No cover</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-2 flex-1 bg-white">
        <h3 className="font-serif text-[17px] font-bold leading-tight line-clamp-2 text-orange-950 group-hover:text-orange-700 transition-colors">
          {book.title}
        </h3>

        <p className="text-[13px] font-medium text-orange-400/80 italic">
          by {book.author_name?.[0] ?? "Unknown story-teller"}
        </p>

        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-orange-50">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            {/* Основной язык */}
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest truncate">
              {book.language?.[0] || "Global"}
            </span>

            {book.language && book.language.length > 1 && (
              <span className="shrink-0 flex items-center justify-center h-4 px-1.5 rounded-full bg-orange-100/50 text-orange-400 text-[9px] font-black border border-orange-200/30">
                +{book.language.length - 1}
              </span>
            )}
          </div>

          <div className="text-[18px] font-black text-orange-700 shrink-0">
            ${generatePrice(book.key)}
          </div>
        </div>
      </div>
    </Card>
  );
};
