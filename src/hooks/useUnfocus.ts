import React, { useEffect, useRef } from "react";

/**
 * A custom React hook that provides functionality to detect clicks outside a specified element
 * and execute a callback function when such clicks occur.
 *
 * @param {Function} callbackFn - The function to execute when a click occurs outside the target element.
 * @param {React.RefObject<HTMLElement | null>[]} [ignoreRefs=[]] - An optional array of refs
 *        corresponding to elements that should be ignored when detecting outside clicks.
 *        If a click occurs within any of these elements, the callback function will not be executed.
 * @returns {React.RefObject<HTMLDivElement | null>} A `ref` to be assigned to the target element for which
 *          outside clicks are being monitored.
 */
export const useUnfocus = (
  callbackFn: () => void,
  ignoreRefs: React.RefObject<HTMLElement | null>[] = [],
): React.RefObject<HTMLDivElement | null> => {
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
  }, [callbackFn, ignoreRefs]);

  return cellRef;
};
