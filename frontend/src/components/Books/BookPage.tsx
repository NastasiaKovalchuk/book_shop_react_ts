import style from "./BookPage.module.scss";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import BookCardLoader from "./BookCardLoader";
import { generatePrice } from "../../utils/price.ts";

type Book = {
  key: string;
  title: string;
  description?: string;
  cover?: string;
  authors: string[];
  languages: string[];
};

export const BookPage = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    const workId = id.split("-").pop();

    const getBook = async (): Promise<void> => {
      setLoading(true);
      try {
        setError(null);

        const workRes = await fetch(
          `https://openlibrary.org/works/${workId}.json`,
          { signal: controller.signal },
        );

        // console.log("workRes", workRes);

        if (!workRes.ok) throw new Error("Work not found");

        const workData = await workRes.json();
        // console.log("languages", workData.description);

        const authorPromises =
          workData.authors?.map((a: any) =>
            fetch(`https://openlibrary.org${a.author.key}.json`, {
              signal: controller.signal,
            }).then((res) => res.json()),
          ) || [];

        const authorsData = await Promise.all(authorPromises);

        const editionsRes = await fetch(
          `https://openlibrary.org/works/${workId}/editions.json?limit=15`,
          { signal: controller.signal },
        );

        const editionsData = await editionsRes.json();

        const languages =
          editionsData.entries?.[0]?.languages?.map((l: any) =>
            l.key.split("/").pop(),
          ) || [];

        console.log("languages", languages);

        const coverId = workData.covers?.[0];
        const cover = coverId
          ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
          : undefined;

        setBook({
          key: workId || "",
          title: workData.title,
          description:
            typeof workData.description === "string"
              ? workData.description
              : workData.description?.value,
          cover,
          authors: authorsData.map((a) => a.name),
          languages,
        });
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getBook();

    return () => controller.abort();
  }, [id]);

  const handleAddToCart = (book: Book) => {
    const price = generatePrice(book.key);
    console.log(`Added to cart: ${book.title} — $${price}`);
  };

  if (loading) return <BookCardLoader />;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <BookCardLoader />;

  return (
    <div className={style.container}>
      <div className={style.card}>
        {book.cover && (
          <img src={book.cover} alt={book.title} className={style.cover} />
        )}
        <div className={style.info}>
          <h1 className={style.title}>{book.title}</h1>
          <p>
            <span className={style.label}>Authors:</span>{" "}
            {book.authors.join(", ")}
          </p>
          <p>
            <span className={style.label}>Languages:</span>{" "}
            {book.languages.join(", ")}
          </p>
          {book.description && (
            <p className={style.description}>{book.description}</p>
          )}
          <div className={style.price}>Price: ${generatePrice(book.key)}</div>
          <button
            className={style.addToCartBtn}
            onClick={() => handleAddToCart(book)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
