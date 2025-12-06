import * as React from "react";

import infoIcon from "../../../../assets/global/info.svg";
import { useHoverPanel } from "../../../../hooks/useHoverPanel.ts";
import { HoverableDescription } from "../../Typography/HoverableDescription.tsx";

export const InputFormDescription: React.FC<{
  information: string;
}> = ({ information }) => {
  const hoverPanelData = useHoverPanel();
  return (
    <div className="relative inline-block">
      <img
        className="w-[1.1rem] h-[1.1rem] cursor-pointer"
        src={infoIcon}
        alt="info-icon"
        onMouseEnter={hoverPanelData.handleMouseEnter}
        onMouseLeave={hoverPanelData.handleMouseLeave}
      />
      {hoverPanelData.shouldDisplayMessage() && (
        <HoverableDescription message={information} minWidth="min-w-[12rem]" />
      )}
    </div>
  );
};
