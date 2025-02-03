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
