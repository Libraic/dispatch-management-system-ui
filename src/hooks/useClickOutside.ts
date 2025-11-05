import { type RefObject, useEffect } from "react";

// TODO: Incorporate this hook instead of useUnfocus
export const useOnClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  ignoredRefs?: RefObject<HTMLElement | null>[],
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      const targetNode = event.target as Node;

      if (ref.current && ref.current.contains(targetNode)) {
        return;
      }

      if (ignoredRefs) {
        for (const ignoredRef of ignoredRefs) {
          if (ignoredRef.current && ignoredRef.current.contains(targetNode)) {
            return;
          }
        }
      }

      callback();
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback, ignoredRefs]);
};
