import { useState } from "react";
import style from "./Login.module.scss";
import { useModal } from "../ModalContext";
// import { useAuthStore } from "../../store/auth.store.ts";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { modal, closeModal } = useModal();
  const [isUser, setIsUser] = useState(false);
  const [step, setStep] = useState<"email" | "password">("email");

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  if (!modal) return null;

  const checkEmail = async (email: string): Promise<void> => {
    try {
      const res = await fetch(
        "https://book-shop-react-ts.onrender.com/auth/check-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        },
      );
      const data = await res.json();

      setIsUser(data.exists);

      setStep("password");
    } catch (err) {
      console.error("Error fetch:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    // ---------------- EMAIL STEP ----------------
    if (step === "email") {
      if (!email) {
        newErrors.email = "Enter email";
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = "Invalid mail format";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        await checkEmail(email);
      }

      return;
    }

    // ---------------- PASSWORD STEP ----------------
    if (step === "password") {
      if (!password) {
        newErrors.password = "Enter your password";
      } else if (password.length < 6) {
        newErrors.password = "Minimum 6 characters";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        await getJwtToken(email);
      }
    }
  };

  const getJwtToken = async (email: string): Promise<void> => {
    console.log("getJwtToken");

    try {
      const res = await fetch(
        "https://book-shop-react-ts.onrender.com/auth/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      if (!res.ok) {
        const error = await res.json();
        setErrors({
          password: error.message,
        });
        return;
      }

      const data = await res.json();
      console.log("DATA===>", data);
      // console.log("Auth!!!!===>:", data);

      // const login = useAuthStore((s) => s.login);
      // const user = useAuthStore((s) => s.user);

      // login({ id: "1", email: email }, "accessToken123");
      // console.log(user);

      closeModal();
    } catch (err) {
      console.error("Auth error:", err);

      setErrors({
        password: "Incorrect email or password",
      });
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
        {step === "password" && isUser && (
          <h2 className={style["login-title"]}>Enter password</h2>
        )}
        {step === "password" && !isUser && (
          <h2 className={style["login-title"]}>Create a profile</h2>
        )}
        {step === "email" && <h2 className={style["login-title"]}>Login</h2>}

        <p className={style["login-subtitle"]}>Enter email</p>

        <form className={style["login-form"]} onSubmit={handleSubmit}>
          {step === "email" && (
            <div className={style["form-group"]}>
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <span className={style["error"]}>{errors.email}</span>
              )}
            </div>
          )}
          {step === "password" && isUser && (
            <div className={style["form-group"]}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              {errors.password && (
                <span className={style["error"]}>{errors.password}</span>
              )}
            </div>
          )}
          {step === "password" && !isUser && (
            <div className={style["form-group"]}>
              <label>Create a profile</label>
              <span className={style["message"]}>
                This address is available for registration
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
          )}

          <button type="submit" className={style["login-button"]}>
            {step === "email" ? "Next" : isUser ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};
