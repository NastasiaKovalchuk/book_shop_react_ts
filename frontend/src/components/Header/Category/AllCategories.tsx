import style from "./Categories.module.scss";
import { CATEGORIES } from "@/constants/categories";
import { useNavigate } from "react-router";
import { useModal } from "../../ModalContext";

export const Catalog = () => {
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleCategoryClick = (cat: string) => {
    closeModal();
    navigate(`/category/${cat.toLocaleLowerCase()}`);
  };

  return (
    <div className={style.categories_container}>
      {CATEGORIES.map((cat: string) => (
        <button
          key={cat}
          className={style["category-btn"]}
          onClick={() => handleCategoryClick(cat)}
        >
          {cat.replace("Category: ", "")}
        </button>
      ))}
    </div>
  );
};
