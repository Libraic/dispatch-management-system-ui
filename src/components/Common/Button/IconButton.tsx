import * as React from "react";
import { useHoverPanel } from "../../../hooks/useHoverPanel.ts";
import { HoverableDescription } from "../Typography/HoverableDescription.tsx";

export const IconButton: React.FC<{
  icon: React.ReactNode;
  action: () => void;
  information?: string;
}> = ({ icon, information, action }) => {
  const hoverPanelData = useHoverPanel(!!information);
  return (
    <div
      className="relative hover:text-[#4e71ff] text-[#666666] hover:cursor-pointer flex flex-row items-center gap-x-1"
      onMouseEnter={hoverPanelData.handleMouseEnter}
      onMouseLeave={hoverPanelData.handleMouseLeave}
      onClick={action}
    >
      {icon}
      {hoverPanelData.shouldDisplayMessage() && (
        <HoverableDescription message={information!!} />
      )}
    </div>
  );
};
