import { useEffect, useRef } from "react";

function useKeyboardShortcuts({
  onSearch,
  onNewTask,
  onClose,
  onDashboard,
  onAllTasks,
  onSettings,
}) {
  const waitingForNavigation = useRef(false);
  const navigationTimeout = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;

      const isTyping =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

      if (event.key === "Escape") {
        waitingForNavigation.current = false;
        clearTimeout(navigationTimeout.current);
        onClose?.();
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onSearch?.();
        return;
      }

      if (isTyping || event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }

      const key = event.key.toLowerCase();

      if (waitingForNavigation.current) {

        waitingForNavigation.current = false;
        
        clearTimeout(navigationTimeout.current);

        if (key === "d") onDashboard?.();
        if (key === "a") onAllTasks?.();
        if (key === "s") onSettings?.();

        return;
      }

      if (key === "g") {
        waitingForNavigation.current = true;

        navigationTimeout.current = setTimeout(() => {
          waitingForNavigation.current = false;
        }, 1000);

        return;
      }

      if (key === "n") {
        onNewTask?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(navigationTimeout.current);
    };
  }, [onSearch, onNewTask, onClose, onDashboard, onAllTasks, onSettings]);
}

export default useKeyboardShortcuts;
