import style from "./Header.module.scss";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { NavBar } from "./NavBar";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.header_wrapper}>
        <div className={style.logo}>MyShop</div>
        <div>
          <li>
            <a href="/catalog">Каталог</a>
          </li>
        </div>
        <div>
          <form action="/search/" method="get">
            <div className={style.header}>
              <input
                className={style.header}
                placeholder="Искать на Литрес"
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
                aria-label="Найти "
              >
                Найти
              </button>
            </div>
          </form>
        </div>
        <div className={style.actions}>
          <a href="/login" className={style.action}>
            <FaUser /> Войти
          </a>
          <a href="/cart" className={style.action}>
            <FaShoppingCart /> Корзина
          </a>
        </div>
      </div>

      <NavBar />
    </header>
  );
};

export default Header;
