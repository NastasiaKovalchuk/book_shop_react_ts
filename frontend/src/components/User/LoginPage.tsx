import { useState } from "react";
import { useModal } from "../ModalContext";
import { useAuthStore } from "../../store/auth.store.ts";
import * as api from "../../api/auth.ts";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

export const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { closeModal } = useModal();
  const [isUser, setIsUser] = useState(false);
  const [step, setStep] = useState<"email" | "password">("email");

  const login = useAuthStore((s) => s.login);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const checkEmail = async (email: string): Promise<void> => {
    try {
      const data = await api.checkEmail(email);
      setIsUser(data.exists);
      setStep("password");
    } catch (err) {
      console.error("Error fetching email check:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (step === "email") {
      if (!email) {
        newErrors.email = "Please, tell us your email";
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = "This email looks a bit strange";
      }

      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) await checkEmail(email);
      return;
    }

    if (step === "password") {
      if (!password) {
        newErrors.password = "A secret key is required";
      } else if (password.length < 6) {
        newErrors.password = "At least 6 characters, please";
      }

      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0)
        await getJwtToken(email, password);
    }
  };

  const getJwtToken = async (
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      const data = await api.getJwtToken(email, password);
      login({ id: data.user, email: email }, data.accessToken);
      closeModal();
    } catch (err) {
      setErrors({ password: "The key or email doesn't match our records" });
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {step === "email" ? (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-orange-300 ml-1">
                Your Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-200 group-focus-within:text-orange-500 transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-orange-50/50 border-2 border-orange-100 rounded-2xl py-4 pl-12 pr-4 text-orange-950 placeholder:text-orange-200 focus:bg-white focus:border-orange-200 focus:ring-4 focus:ring-orange-100 transition-all outline-none italic font-serif"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs italic ml-1 animate-in fade-in slide-in-from-left-1">
                  {errors.email}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-orange-50 px-4 py-2 rounded-xl border border-orange-100 mb-4">
                <span className="text-xs font-medium text-orange-800 truncate max-w-[200px]">
                  {email}
                </span>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-[10px] font-bold text-orange-400 hover:text-orange-700 uppercase"
                >
                  Change
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-orange-300 ml-1">
                  {isUser ? "Secret Password" : "Create a Password"}
                </label>
                {!isUser && (
                  <div className="flex items-center gap-2 text-green-600/70 text-[11px] italic mb-2">
                    <Sparkles size={12} />
                    Welcome! This email is ready for a new story.
                  </div>
                )}
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-200 group-focus-within:text-orange-500 transition-colors"
                    size={20}
                  />
                  <input
                    type="password"
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-orange-50/50 border-2 border-orange-100 rounded-2xl py-4 pl-12 pr-4 text-orange-950 placeholder:text-orange-200 focus:bg-white focus:border-orange-200 focus:ring-4 focus:ring-orange-100 transition-all outline-none font-sans tracking-widest"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs italic ml-1">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full group relative flex items-center justify-center gap-3 bg-orange-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-orange-900/10 hover:bg-orange-900 hover:-translate-y-0.5 active:translate-y-0 transition-all overflow-hidden"
          >
            <span className="relative z-10">
              {step === "email"
                ? "Continue"
                : isUser
                  ? "Open My Nook"
                  : "Start My Journey"}
            </span>
            <ArrowRight
              size={18}
              className="relative z-10 group-hover:translate-x-1 transition-transform"
            />
            <div className="absolute inset-0 bg-linear-to-r from-orange-700 to-orange-800 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </form>

        <p className="text-center text-[11px] text-orange-300 px-6 leading-relaxed">
          By continuing, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Stories</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};
