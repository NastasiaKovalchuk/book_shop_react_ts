import style from "./Header.module.scss";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { NavBar } from "./NavBar";
import { useModal } from "../ModalContext";

const Header = () => {
  const { openLogin, openCatalog } = useModal();
  return (
    <header className={style.header}>
      <div className={style.header_wrapper}>
        <div className={style.logo}>MyShop</div>
        <div>
          <li>
            <button onClick={openCatalog}>Catalog</button>
          </li>
        </div>
        <div>
          <form action="/search/" method="get">
            <div className={style.header}>
              <input
                className={style.header}
                placeholder="Search"
                name="q"
                data-testid="search__input"
                role="combobox"
                aria-controls="suggestionsSearchResult"
                aria-autocomplete="list"
                aria-haspopup="listbox"
                aria-expanded="false"
              />
              <button
                className={style.header}
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
          <a href="/cart" className={style.action}>
            <FaShoppingCart /> Корзина
          </a>
          <button onClick={openLogin}>
            Login
            <FaUser />
          </button>
        </div>
      </div>

      <NavBar />
    </header>
  );
};

export default Header;
