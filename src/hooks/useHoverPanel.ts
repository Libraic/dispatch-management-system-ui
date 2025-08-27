import { useRef, useState } from "react";

export type HoverPanelData = {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  shouldDisplayMessage: () => boolean;
};

export const useHoverPanel = (condition?: boolean): HoverPanelData => {
  const [showInformation, setShowInformation] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowInformation(condition ?? true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setShowInformation(false);
  };

  return {
    handleMouseEnter,
    handleMouseLeave,
    shouldDisplayMessage: () => showInformation && (condition ?? true),
  };
};
