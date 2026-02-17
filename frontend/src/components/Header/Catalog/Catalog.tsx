import style from "./Catalog.module.scss";
import { CATEGORIES } from "@/constants/categories";

export const Catalog = () => {
  return (
    <div className={style.categories_container}>
      {CATEGORIES.map((cat: string) => (
        <button key={cat} className={style["category-btn"]}>
          {cat.replace("Category: ", "")}
        </button>
      ))}
    </div>
  );
};
