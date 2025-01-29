import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persists((set) => ({
    user: null,
    isLoggedIn: false,
  }))
);
