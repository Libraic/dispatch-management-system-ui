import * as React from "react";
import { useHoverPanel } from "../../../../hooks/useHoverPanel.ts";
import { HoverableDescription } from "../../Typography/HoverableDescription.tsx";
import { GoogleIcon } from "../../../../shared/components/GoogleIcon/GoogleIcon.tsx";

export const InputFormDescription: React.FC<{
  information: string;
}> = ({ information }) => {
  const hoverPanelData = useHoverPanel();
  return (
    <div className="relative inline-block">
      <div
        className="w-[1.1rem] h-[1.1rem] cursor-pointer"
        onMouseEnter={hoverPanelData.handleMouseEnter}
        onMouseLeave={hoverPanelData.handleMouseLeave}
      >
        <GoogleIcon code="info" size={1.62} fontColor="#000" />
      </div>
      {hoverPanelData.shouldDisplayMessage() && (
        <HoverableDescription message={information} />
      )}
    </div>
  );
};
