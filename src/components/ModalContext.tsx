import { createContext, useContext, useState, type ReactNode } from "react";
import style from "./Modal.module.scss";

type ModalType = "login" | "catalog" | null;

type ModalContextType = {
  modal: ModalType;
  openLogin: () => void;
  openCatalog: () => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside provider");
  return ctx;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalType>(null);

  const openLogin = () => setModal("login");
  const openCatalog = () => setModal("catalog");
  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider
      value={{ modal, openLogin, openCatalog, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
