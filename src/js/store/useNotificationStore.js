import { create } from "zustand";
/**
 * @typedef {Object} Notification
 * @property {number} id - Unique identifier for the notification.
 * @property {string} message - The notification message.
 * @property {string} type - The notification type (e.g., "success", "error", "info").
 */

/**
 * A Zustand store for managing notifications.
 *
 * This store maintains an array of notifications and provides a method to add new notifications.
 * Each notification is automatically removed after a specified duration.
 *
 * @typedef {Object} NotificationStore
 * @property {Notification[]} notifications - The current list of notifications.
 * @property {function(string, string, number=): void} addNotification - Adds a new notification.
 *   @param {string} message - The message to display in the notification.
 *   @param {string} type - The type of the notification (e.g., "success", "error", "info").
 *   @param {number} [duration=3000] - Duration in milliseconds before the notification is removed.
 */
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
