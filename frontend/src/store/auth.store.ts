import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as api from "../api/auth";

interface AuthState {
  user: { id: string; email: string } | null;
  accessToken: string | null;
  login: (user: AuthState["user"], token: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      accessToken: null,
      login: (user, accessToken) => set({ user, accessToken }),
      logout: () => set({ user: null, accessToken: null }),
      refreshAccessToken: async () => {
        try {
          const data = await api.refreshToken();
          set({ accessToken: data.accessToken });
        } catch {
          get().logout();
        }
      },
    }),
    { name: "auth-storage", storage: createJSONStorage(() => localStorage) },
  ),
);
