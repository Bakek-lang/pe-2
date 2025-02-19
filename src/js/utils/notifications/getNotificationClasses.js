/**
 * Returns the TailwindCSS class names for a notification based on its type.
 *
 * This function composes a base set of TailwindCSS classes with additional classes depending on the
 * notification type provided. If the provided type does not match any predefined types,
 * the default "info" style is applied.
 *
 * @param {string} type - The type of the notification (e.g., "success", "error", "info").
 * @returns {string} A string of TailwindCSS classes to style the notification.
 */
export function getNotificationClasses(type) {
  const base =
    "p-3 text-white rounded shadow-lg transition-opacity duration-300";
  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return `${base} ${typeClasses[type] || typeClasses.info} `;
}
