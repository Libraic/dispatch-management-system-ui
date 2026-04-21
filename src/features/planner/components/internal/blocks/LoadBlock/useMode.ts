import { useEffect, useRef, useState } from "react";
import type { DisplayMode } from "#/features/planner/components/internal/blocks/LoadBlock/LoadBlock.types";
import { useOnClickOutside } from "#/hooks/useClickOutside";

export const useMode = () => {
  const modeRef = useRef<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLDivElement | null>(null);
  const [clicked, setClicked] = useState(false);
  useOnClickOutside(modeRef, () => setClicked(false));

  const [mode, setMode] = useState<DisplayMode>("full");

  useEffect(() => {
    if (!modeRef.current || !childRef.current) return;

    const observer = new ResizeObserver(() => {
      const containerWidth = modeRef.current!.offsetWidth;
      const fullWidth = childRef.current!.scrollWidth;

      if (fullWidth <= containerWidth) {
        setMode("full");
      } else if (containerWidth > 180) {
        setMode("compact");
      } else if (containerWidth > 70) {
        setMode("minimal");
      } else {
        setMode("hidden");
      }
    });

    observer.observe(modeRef.current);

    return () => observer.disconnect();
  }, []);

  return {
    modeRef: modeRef,
    childRef,
    mode,
    clicked,
    setClicked,
  };
};
