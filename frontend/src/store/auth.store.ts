import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as api from "../api/auth";

interface AuthState {
  user: { id: string; email: string } | null;
  accessToken: string | null;
  refreshToken: string | null;

  login: (user: AuthState["user"], token: string, refreshToken: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      login: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
      refreshAccessToken: async () => {
        const token = get().refreshToken;
        if (!token) return;
        try {
          const data = await api.refreshToken(token);
          set({ accessToken: data.accessToken });
        } catch {
          get().logout();
        }
      },
    }),
    { name: "auth-storage", storage: createJSONStorage(() => localStorage) },
  ),
);
