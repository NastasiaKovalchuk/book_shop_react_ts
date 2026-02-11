import { useState } from "react";
import style from "./Login.module.scss";
import { useModal } from "../ModalContext";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { modal, closeModal } = useModal();

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  if (!modal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    // Валидация email
    if (!email) {
      newErrors.email = "Введите почту или логин";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Неверный формат почты";
    }

    // Валидация пароля
    if (!password) {
      newErrors.password = "Введите пароль";
    } else if (password.length < 6) {
      newErrors.password = "Пароль должен быть не меньше 6 символов";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Форма валидна", { email, password });
      // тут можно отправить запрос на сервер
    }
  };

  return (
    <div className={style["modal-overlay"]} onClick={closeModal}>
      <div
        className={style["login-modal-card"]}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={closeModal}>
          &times;
        </button>

        <h2 className={style["login-title"]}>Войти</h2>
        <p className={style["login-subtitle"]}>Введите почту или логин</p>

        <form className={style["login-form"]} onSubmit={handleSubmit}>
          <div className={style["form-group"]}>
            <label>Почта или логин</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
            />
            {errors.email && (
              <span className={style["error"]}>{errors.email}</span>
            )}
          </div>

          <div className={style["form-group"]}>
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {errors.password && (
              <span className={style["error"]}>{errors.password}</span>
            )}
          </div>

          <button type="submit" className={style["login-button"]}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
