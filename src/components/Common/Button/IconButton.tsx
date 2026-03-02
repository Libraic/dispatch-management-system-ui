import * as React from "react";
import { useHoverPanel } from "../../../hooks/useHoverPanel.ts";
import { HoverableDescription } from "../Typography/HoverableDescription.tsx";

export const IconButton: React.FC<{
  unfocusedResource: string;
  focusedResource: string;
  action: () => void;
  information?: string;
}> = ({ unfocusedResource, focusedResource, information, action }) => {
  const [resource, setResource] = React.useState(unfocusedResource);
  const hoverPanelData = useHoverPanel(!!information);
  return (
    <div className="relative inline-block">
      <img
        className="w-[2rem] cursor-pointer"
        onMouseEnter={() => {
          setResource(focusedResource);
          hoverPanelData.handleMouseEnter();
        }}
        onMouseLeave={() => {
          setResource(unfocusedResource);
          hoverPanelData.handleMouseLeave();
        }}
        src={resource}
        alt="add-record-unfocused"
        onClick={action}
      />
      {hoverPanelData.shouldDisplayMessage() && (
        <HoverableDescription message={information!!} />
      )}
    </div>
  );
};
