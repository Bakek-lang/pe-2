import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      accessToken: null,
      setUser: (user, token) =>
        set({ user, isLoggedIn: !!user, accessToken: token }),
      clearUser: () =>
        set({ user: null, isLoggedIn: false, accessToken: null }),
      updateUserDetails: (newDetails) =>
        set((state) => ({
          user: { ...state.user, ...newDetails },
        })),
    }),
    {
      name: "auth-store",
    }
  )
);

export default useAuthStore;
