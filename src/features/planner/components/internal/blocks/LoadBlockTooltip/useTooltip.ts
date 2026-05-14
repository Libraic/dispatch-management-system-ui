import { useRef, useState } from "react";
import { useOnClickOutside } from "#/hooks/useClickOutside";

export const useTooltip = () => {
  const [tooltipPos, setTooltipPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const blockRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(blockRef, () => setTooltipPos(null), [tooltipRef]);

  const openTooltip = () => {
    if (blockRef.current) {
      const rect = blockRef.current.getBoundingClientRect();
      setTooltipPos({
        top: rect.bottom + 4,
        left: rect.left + 16,
      });
    }
  };

  const closeTooltip = () => {
    setTooltipPos(null);
  };

  return {
    blockRef,
    tooltipRef,
    openTooltip,
    closeTooltip,
    tooltipPos,
  };
};
