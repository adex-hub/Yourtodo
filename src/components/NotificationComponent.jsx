import { useEffect } from "react";

/* eslint-disable react/prop-types */
const NotificationComponent = ({ items }) => {
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }

    let timeout;

    const notifyUser = () => {
      if (Notification.permission === "granted") {
        const tasksLeft = items.filter((item) => !item.done).length;
        if (tasksLeft > 0) {
          const notification = new Notification("Don't Forget Your Tasks!", {
            body: `You have ${tasksLeft} task${
              tasksLeft > 1 ? "s" : ""
            } left! Come round 'em up`,
          });

          notification.onclick = function () {
            window.focus();
          };
        }
      }
    };

    const resetTimeout = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(notifyUser, 30 * 60 * 1000);
    };

    const handleActivity = () => {
      resetTimeout();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);

    // Initialize timeout
    resetTimeout();

    // Cleanup event listeners and timeout on component unmount
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, [items]);

  return null;
};

export default NotificationComponent;
