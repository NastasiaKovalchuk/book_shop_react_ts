import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as api from "../api/auth";
import { useCartStore } from "./cart.store";

interface AuthState {
  user: { id: string; email: string } | null;
  accessToken: string | null;
  isAuthChecked: boolean;
  login: (user: AuthState["user"], token: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthChecked: false,
      login: (user, accessToken) =>
        set({ user, accessToken, isAuthChecked: true }),
      logout: async () => {
        try {
          await api.logout();
        } catch (err) {
          console.error("API Logout failed", err);
        } finally {
          useCartStore.getState().clearCart();
          set({ user: null, accessToken: null, isAuthChecked: false });
        }
      },

      refreshAccessToken: async (): Promise<string | null> => {
        try {
          const data = await api.refreshToken();
          set({ accessToken: data.accessToken });
          return data.accessToken;
        } catch {
          get().logout();
          return null;
        }
      },
    }),
    { name: "auth-storage", storage: createJSONStorage(() => localStorage) },
  ),
);
