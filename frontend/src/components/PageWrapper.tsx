import Header from "./Header/Header";
import { ModalProvider } from "./ModalContext";
import { ModalWindow } from "./ModalWindow";
import { Outlet } from "react-router";

export const PageWrapper = () => {
  return (
    <div className="max-w-[1207px] mx-auto px-[15px] py-[10px] min-h-360 bg-white transition-[background-image] duration-75 ease-in-out">
      <ModalProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <ModalWindow />
      </ModalProvider>
    </div>
  );
};
