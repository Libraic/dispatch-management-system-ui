import { useEffect, useRef } from "react";

/**
 * A hook used to detect when the user clicks outside a component.
 * @param callbackFn a function to be called when the user clicks outside the component.
 */
export const useUnfocus = (
  callbackFn: () => void,
  ignoreRefs: React.RefObject<HTMLElement | null>[] = [],
) => {
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedInsideIgnored = ignoreRefs.some((r) =>
        r.current?.contains(target),
      );

      if (
        cellRef.current &&
        !cellRef.current.contains(target) &&
        !clickedInsideIgnored
      ) {
        callbackFn();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return cellRef;
};
