import { create } from "zustand";
import type { User } from "@/shared/types/user.types";
import { ACCESS_TOKEN_KEY } from "@/shared/constants/app";

interface AuthState {
  currentUser: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setCredentials: (user: User, token: string) => void;
  clearCredentials: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
  isAuthenticated: Boolean(localStorage.getItem(ACCESS_TOKEN_KEY)),

  setCredentials: (user, token) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    set({ currentUser: user, accessToken: token, isAuthenticated: true });
  },

  clearCredentials: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    set({ currentUser: null, accessToken: null, isAuthenticated: false });
  },
}));
