import style from "./PageWrapper.module.scss";
import Header from "./Header/Header";
import Home from "./Main/HomePage";
import { ModalProvider } from "./ModalContext";
import { ModalWindow } from "./ModalWindow";

export const PageWrapper = () => {
  return (
    <div className={style.container}>
      <ModalProvider>
        <Header />
        <Home />
        <ModalWindow />
      </ModalProvider>
    </div>
  );
};
