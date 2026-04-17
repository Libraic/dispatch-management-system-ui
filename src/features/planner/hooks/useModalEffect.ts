import { useEffect } from "react";

export const useModalEffect = (
  quitFn: () => void,
  submitFn: () => Promise<void>,
) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    const handleEscKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        quitFn();
      }
    };

    const handleEnterKeyDown = async (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        await submitFn();
      }
    };

    window.addEventListener("keydown", handleEscKeyDown);
    window.addEventListener("keydown", handleEnterKeyDown);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleEscKeyDown);
      window.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, [quitFn, submitFn]);
};
