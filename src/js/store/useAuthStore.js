import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ user, isLoggedIn: !!user }),
      clearUser: () => set({ user: null, isLoggedIn: false }),
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
