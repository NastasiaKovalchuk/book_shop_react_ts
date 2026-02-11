import { useEffect, useState } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://gutendex.com/books");
        const data = await res.json();

        const categoriesSet = new Set<string>();
        data.results.forEach((book: any) => {
          book.bookshelves.forEach((cat: string) => categoriesSet.add(cat));
        });

        setCategories(Array.from(categoriesSet));
      } catch (err) {
        console.error(err);
        setError("Ошибка при загрузке категорий");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
