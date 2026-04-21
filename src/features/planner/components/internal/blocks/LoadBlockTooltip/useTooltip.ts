import { useRef, useState } from "react";

export const useTooltip = () => {
  const [tooltipPos, setTooltipPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null); // rename if parentRef is already taken by useMode()

  const handleMouseEnter = () => {
    hoverTimerRef.current = setTimeout(() => {
      if (tooltipRef.current) {
        const rect = tooltipRef.current.getBoundingClientRect();
        setTooltipPos({
          top: rect.bottom + 4, // 4px gap below the block
          left: rect.left + 16, // 16px offset to the right
        });
      }
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setTooltipPos(null);
  };

  return {
    tooltipRef: tooltipRef,
    handleMouseEnter,
    handleMouseLeave,
    tooltipPos,
  };
};
