import { createPortal } from "react-dom";
import { useModal } from "./ModalContext";
import { Catalog } from "./Header/Category/AllCategories";
import { LoginPage } from "./User/LoginPage";
import style from "./Modal.module.scss";

export const ModalWindow = () => {
  const { modal, closeModal } = useModal();

  if (!modal) return null;

  return createPortal(
    <div className={style.modal_overlay} onClick={closeModal}>
      <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
        {modal === "login" && <LoginPage />}
        {modal === "catalog" && <Catalog />}
      </div>
    </div>,
    document.body,
  );
};
