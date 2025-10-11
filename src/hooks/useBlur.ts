import { useEffect, useRef } from "react";

/**
 * A hook used to detect when the user clicks outside a component.
 * @param callbackFn a function to be called when the user clicks outside the component.
 */
export const useBlur = (callbackFn: () => void) => {
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", (e: MouseEvent) => {
      const target = e!!.target as Node;
      if (!cellRef.current?.contains(target)) {
        callbackFn();
      }
    });
  });

  return cellRef;
};
