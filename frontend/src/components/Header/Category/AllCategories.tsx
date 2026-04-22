import { CATEGORIES } from "@/constants/categories";
import { useNavigate } from "react-router";
import { useModal } from "../../ModalContext";
import { BookText, Sparkles } from "lucide-react";

export const Catalog = () => {
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleCategoryClick = (cat: string) => {
    closeModal();

    const slug = cat
      .replace("Category: ", "")
      .toLowerCase()
      .replace(/\s+/g, "_");
    navigate(`/category/${slug}`);
  };

  return (
    <div className="w-full">

      <div className="flex items-center gap-3 mb-8 border-b border-orange-100 pb-4">
        <div className="p-2 bg-orange-100 rounded-lg text-orange-700">
          <BookText size={20} />
        </div>
        <div>
          <h2 className="text-xl font-serif font-bold text-orange-950 italic">
            Library Sections
          </h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-orange-300 font-bold">
            Choose your story
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CATEGORIES.map((cat: string) => {
          const cleanName = cat.replace("Category: ", "");

          return (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="
                group relative flex items-center justify-between px-5 py-4 
                bg-white border border-orange-50 rounded-2xl
                text-left transition-all duration-300
                hover:bg-orange-800 hover:border-orange-800 hover:-translate-y-1
                hover:shadow-[0_10px_20px_rgba(120,60,0,0.1)]
              "
            >
              <span className="font-serif italic text-orange-950 group-hover:text-orange-50 transition-colors">
                {cleanName}
              </span>

              <Sparkles
                size={14}
                className="text-orange-200 group-hover:text-orange-300 opacity-0 group-hover:opacity-100 transition-all"
              />

              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-orange-200 rounded-r-full group-hover:bg-orange-400 transition-colors" />
            </button>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-orange-50 text-center">
        <p className="text-[11px] italic text-orange-300">
          "A room without books is like a body without a soul."
        </p>
      </div>
    </div>
  );
};
