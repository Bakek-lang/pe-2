import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (message, type, duration = 3000) => {
    const id = Date.now();
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }],
    }));

    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, duration);
  },
}));

export default useNotificationStore;
