import { create } from "zustand";
import { persist } from "zustand/middleware";
/**
 * Zustand store for managing authentication state.
 *
 * This store holds the user's authentication information, including the user object,
 * login status, and access token. It provides functions to set, clear, and update the user data.
 * The store state is persisted using the `persist` middleware with the key "auth-store".
 *
 * @typedef {Object} AuthState
 * @property {Object|null} user - The current user object. Null if no user is logged in.
 * @property {boolean} isLoggedIn - Indicates whether a user is currently logged in.
 * @property {string|null} accessToken - The access token for authenticated requests.
 * @property {function(Object|null, string|null): void} setUser - Sets the user object and access token.
 *   @param {Object|null} user - The user object.
 *   @param {string|null} token - The access token.
 * @property {function(): void} clearUser - Clears the user data and resets authentication state.
 * @property {function(Object): void} updateUserDetails - Merges new details into the current user object.
 *   @param {Object} newDetails - An object containing new user details to merge.
 */
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
