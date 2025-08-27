import * as React from "react";

import infoIcon from "../assets/global/info.svg";
import { useHoverPanel } from "../hooks/useHoverPanel.ts";
import { HoverableInformation } from "./HoverableInformation.tsx";

export const FieldInformation: React.FC<{
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
        <HoverableInformation message={information} minWidth="min-w-[12rem]" />
      )}
    </div>
  );
};
