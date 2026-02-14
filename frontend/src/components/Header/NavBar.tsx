import style from "./Header.module.scss";

export const NavBar = () => {
  return (
    <div className={style.header_wrapper}>
      <a href="/">New books</a>

      <a href="/about">Popular</a>

      <a href="/contact">Контакты</a>
    </div>
  );
};
