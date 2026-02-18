import style from "./Header.module.scss";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { NavBar } from "./NavBar";
import { useModal } from "../ModalContext";
import { useAuthStore } from "../../store/auth.store.ts";
import { ProfileMenu } from "../User/ProfileMenu";
import { useNavigate } from "react-router";

ProfileMenu;
const Header = () => {
  const { accessToken, refreshAccessToken } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      refreshAccessToken();
    }
  }, [accessToken, refreshAccessToken]);

  const handleProfileClick = () => {
    setShowMenu(!showMenu);
  };

  const isAuth = !!accessToken;

  const { openLogin, openCatalog } = useModal();
  return (
    <header className={style.header}>
      <div className={style.header_wrapper}>
        <div className={style.logo} onClick={() => navigate("/")}>
          MyShop
        </div>
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

          <button onClick={isAuth ? handleProfileClick : openLogin}>
            {isAuth ? (
              <>
                Profile <MdAccountCircle />
              </>
            ) : (
              <>
                Login <FaUser />
              </>
            )}
          </button>
          {isAuth && showMenu && (
            <ProfileMenu onClose={() => setShowMenu(false)} />
          )}
        </div>
      </div>

      <NavBar />
    </header>
  );
};

export default Header;
