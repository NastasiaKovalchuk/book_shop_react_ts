import style from "./PageWrapper.module.scss";
import Header from "./Header/Header";
// import Home from "./Main/HomePage";
import { ModalProvider } from "./ModalContext";
import { ModalWindow } from "./ModalWindow";
import { Outlet } from "react-router";

export const PageWrapper = () => {
  return (
    <div className={style.container}>
      <ModalProvider>
        <Header />
        <Outlet />
        <ModalWindow />
      </ModalProvider>
    </div>
  );
};
