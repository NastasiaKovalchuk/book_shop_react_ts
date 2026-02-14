// import { useCategories } from "./UseCategories";
import style from "./Catalog.module.scss";

export const Catalog = () => {
  // const { categories, loading, error } = useCategories();
  const categories = [
    "Classics",
    "Fiction",
    "Fantasy",
    "Science-fiction",
    "Romance",
    "Horror",
    "Children",
    "History",
    "Science",
    "Adventure",
    "Mystery",
    "Poetry",
    "Movie Books",
  ];

  // if (loading) return <p>Загрузка категорий...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <div className={style.categories_container}>
      {categories.map((cat) => (
        <button key={cat} className={style["category-btn"]}>
          {cat.replace("Category: ", "")}
        </button>
      ))}
    </div>
  );
};
