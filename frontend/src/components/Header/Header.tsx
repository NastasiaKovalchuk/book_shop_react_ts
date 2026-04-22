import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { ShoppingBag, User, Search, BookText, LogIn } from "lucide-react";
import { useAuthStore } from "../../store/auth.store.ts";
import { useModal } from "../ModalContext";
import { ProfileMenu } from "../User/ProfileMenu";
import type { Book } from "../../types/book.ts";
import { useCartStore } from "../../store/cart.store.ts";

const Header = () => {
  const { accessToken, isAuthChecked } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const { openLogin, openCatalog } = useModal();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const cartCount = useCartStore((state) => state.getTotalCount());

  const isAuth = !!accessToken;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=1`,
        );
        const data = await res.json();
        setResults((data.docs ?? []).slice(0, 6));
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleChooseBook = (title: string, key: string) => {
    const workId = key.split("/").pop();
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    navigate(`/book/${slug}-${workId}`);
    setShowDropdown(false);
    setQuery("");
  };

  return (
    <header className="sticky top-0 z-1000 w-full bg-[#fdfcf0]/90 backdrop-blur-md border-b border-orange-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-8">
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-serif font-bold text-orange-900 cursor-pointer tracking-tight flex items-center gap-2 group"
        >
          <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center text-orange-800 group-hover:bg-orange-300 transition-colors">
            <BookText size={22} />
          </div>
          <span className="hidden sm:block italic">
            book<span className="text-orange-700 not-italic">nook</span>
          </span>
        </div>

        <button
          onClick={openCatalog}
          className="hidden lg:flex items-center gap-2 font-medium text-orange-900/70 hover:text-orange-900 transition-colors"
        >
          Catalog
        </button>

        <div className="flex-1 max-w-xl relative" ref={dropdownRef}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim())
                navigate(`/search?q=${encodeURIComponent(query)}`);
              setShowDropdown(false);
            }}
            className="relative"
          >
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-300 transition-colors"
              size={18}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find your next story..."
              className="w-full bg-orange-50/50 border-2 border-orange-100 rounded-full py-2.5 pl-12 pr-4 text-orange-900 placeholder:text-orange-300 focus:bg-white focus:border-orange-200 transition-all outline-none text-sm shadow-sm italic"
            />
          </form>

          {showDropdown && results.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-3 bg-white rounded-3xl shadow-xl shadow-orange-900/5 border border-orange-50 overflow-hidden p-2">
              {results.map((book) => (
                <div
                  key={book.key}
                  onClick={() => handleChooseBook(book.title, book.key)}
                  className="flex items-center gap-4 p-3 hover:bg-orange-50/50 rounded-2xl cursor-pointer transition-colors group"
                >
                  <div className="w-10 h-14 bg-orange-100 rounded-lg overflow-hidden shrink-0 shadow-sm">
                    <img
                      src={
                        book.cover_i
                          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
                          : ""
                      }
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-orange-900 group-hover:text-orange-700 transition-colors leading-tight">
                      {book.title}
                    </span>
                    <span className="text-xs text-orange-400 font-medium">
                      {book.author_name?.[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          {isAuthChecked && isAuth && (
            <button
              onClick={() => navigate("/cart")}
              className="p-3 text-orange-800 hover:bg-orange-100/50 rounded-full relative transition-colors"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />

              {cartCount > 0 && (
                <span className="absolute top-2 right-2 min-w-[18px] h-[18px] px-1 bg-orange-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-[#fdfcf0] animate-in fade-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          <div className="relative">
            <button
              onClick={
                isAuth && isAuthChecked
                  ? () => setShowMenu(!showMenu)
                  : openLogin
              }
              className="flex items-center gap-2 p-1.5 pl-4 pr-1.5 bg-orange-100/50 text-orange-900 rounded-full hover:bg-orange-100 transition-all border border-orange-200/50"
            >
              <span className="font-bold text-sm hidden sm:block">
                {isAuth && isAuthChecked ? "My Nook" : "Sign In"}
              </span>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-orange-700 shadow-sm border border-orange-100">
                {isAuth && isAuthChecked ? (
                  <User size={18} strokeWidth={2} />
                ) : (
                  <LogIn size={18} strokeWidth={2} />
                )}
              </div>
            </button>

            {isAuth && isAuthChecked && showMenu && (
              <div className="absolute top-full right-0 mt-3">
                <ProfileMenu onClose={() => setShowMenu(false)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
