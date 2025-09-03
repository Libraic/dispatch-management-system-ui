import * as React from "react";
import { useHoverPanel } from "../../../hooks/useHoverPanel.ts";
import { HoverableInformation } from "../../../global/HoverableInformation.tsx";

export const IconButton: React.FC<{
  unfocusedResource: string;
  focusedResource: string;
  action: () => void;
  information?: string;
}> = ({ unfocusedResource, focusedResource, information, action }) => {
  const [resource, setResource] = React.useState(unfocusedResource);
  const hoverPanelData = useHoverPanel(!!information);
  return (
    <div className="relative inline-block mx-3">
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
        <HoverableInformation
          message={information!!}
          leftPosition="left-[4.2rem]"
          minWidth="min-w-[8rem]"
        />
      )}
    </div>
  );
};
