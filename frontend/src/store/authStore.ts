import { create } from "zustand";
import { persist } from "zustand/middleware";
import { queryClient } from "../lib/queryClient";

interface AuthState {
  token: string | null;
  user: any;
  role: "USER" | "ADMIN" | null;

  setAuth: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      role: null,

      setAuth: (token) => {
        const payload = JSON.parse(atob(token.split(".")[1]));

        queryClient.clear();

        set({
          token,
          user: payload,
          role: payload.role,
        });
      },

      logout: () => {
        queryClient.clear();
        
        set({ token: null, user: null, role: null });
      },
    }),
    {
      name: "auth-storage", // 🔥 auto localStorage
    }
  )
);