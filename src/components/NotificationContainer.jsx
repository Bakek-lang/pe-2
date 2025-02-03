import useNotificationStore from "../js/store/useNotificationStore";
import { getNotificationClasses } from "../js/utils/notifications/getNotificationClasses";

export default function NotificationContainer() {
  const { notifications } = useNotificationStore();

  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={getNotificationClasses(notification.type)}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
}
