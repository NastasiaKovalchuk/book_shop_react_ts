import style from "./Header.module.scss";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { NavBar } from "./NavBar";
import { useModal } from "../ModalContext";
import { useAuthStore } from "../../store/auth.store.ts";
import { ProfileMenu } from "../User/ProfileMenu";
import { useNavigate } from "react-router";

const Header = () => {
  const { accessToken, refreshAccessToken, isAuthChecked } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const { openLogin, openCatalog } = useModal();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      refreshAccessToken();
    }
  }, [accessToken, refreshAccessToken]);

  const handleProfileClick = () => {
    setShowMenu(!showMenu);
  };

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
        console.log("searchByParameters", data.docs);
        setResults((data.docs ?? []).slice(0, 5));
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleChooseBook = (title: string, key: string) => {
    const workId = key.split("/").pop();
    const createSlug = (title: string) =>
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
    console.log(`/book/${createSlug(title)}-${workId}`);
    navigate(`/book/${createSlug(title)}-${workId}`);
    setShowDropdown(false);
    setQuery("");
  };

  const isAuth = !!accessToken;
  // if (!isAuthChecked) return null;

  return (
    <header className={style.header}>
      <div className={style.header_wrapper}>
        <div className={style.logo} onClick={() => navigate("/")}>
          MyShop
        </div>
        <div>
          <li>
            <button onClick={openCatalog} className={style.actions}>
              <SiBookstack /> Catalog
            </button>
          </li>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!query.trim()) return;

              navigate(`/search?q=${encodeURIComponent(query)}`);
              setShowDropdown(false);
            }}
          >
            <div className={style.search__input}>
              <input
                value={query}
                placeholder="Search"
                name="q"
                data-testid="search__input"
                role="combobox"
                aria-controls="suggestionsSearchResult"
                aria-autocomplete="list"
                aria-haspopup="listbox"
                aria-expanded="false"
                onChange={(e) => setQuery(e.target.value)}
              />
              {showDropdown && results.length > 0 && (
                <div className={style.dropdown}>
                  {results.map((book) => (
                    <div
                      className={style.dropdown_item}
                      key={book.key}
                      onClick={() => handleChooseBook(book.title, book.key)}
                    >
                      <div>{book.title},</div>
                      <small>{book.author_name?.[0] ?? "Unknown author"}</small>
                    </div>
                  ))}
                </div>
              )}
              <button
                // className={style.header}
                type="submit"
                data-testid="search__button"
                aria-label="Search "
              >
                Найти
              </button>
            </div>
          </form>
        </div>
        <div className={style.actions}>
          <div className={style.action} onClick={() => navigate("/cart")}>
            <BsCart />
          </div>

          <button
            onClick={isAuthChecked && isAuth ? handleProfileClick : openLogin}
          >
            {isAuthChecked && isAuth ? (
              <>
                Profile <MdAccountCircle />
              </>
            ) : (
              <>
                Login <FaUser />
              </>
            )}
          </button>
          {isAuthChecked && isAuth && showMenu && (
            <ProfileMenu onClose={() => setShowMenu(false)} />
          )}
        </div>
      </div>

      <NavBar />
    </header>
  );
};

export default Header;
