import { createPortal } from "react-dom";
import { useModal } from "./ModalContext";
import { Catalog } from "./Header/Category/AllCategories";
import { LoginPage } from "./User/LoginPage";
import { X } from "lucide-react";

export const ModalWindow = () => {
  const { modal, closeModal } = useModal();

  if (!modal) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-orange-950/20 backdrop-blur-md transition-all duration-300"
      onClick={closeModal}
    >
      <div
        className="
          relative bg-[#fdfcf0] rounded-[2.5rem] shadow-[0_30px_100px_rgba(120,60,0,0.2)] 
          min-w-[320px] max-w-[500px] w-full max-h-[90vh] overflow-y-auto
          border border-orange-100/50
          animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="
            absolute top-5 right-5 p-2 rounded-full 
            bg-orange-50 text-orange-300 hover:text-orange-700 hover:bg-orange-100 
            transition-all z-10
          "
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        <div className="h-2 w-full bg-linear-to-r from-orange-100 via-orange-200 to-orange-100 opacity-50" />

        <div className="p-8 md:p-10">
          {modal === "login" && (
            <div className="text-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-orange-950 italic mb-2">
                Welcome Back
              </h2>
              <p className="text-sm text-orange-400 font-medium">
                Step into your personal reading nook
              </p>
            </div>
          )}

          <div className="mt-4">
            {modal === "login" && <LoginPage />}
            {modal === "catalog" && <Catalog />}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
