import React from "react";
import { ContextMenu } from "../ContextMenu/public/ContextMenu.tsx";
import type { StateData } from "../../../types/internal/common/props-types.ts";
import type {
  LoadData,
  LoadDataError,
  LoadLocationData,
  LocationLabel,
} from "../../../types/internal/planner/planner-types.ts";
import type { ContextMenuActionItem } from "../../../types/internal/common/context-menu-types.ts";
import { useContextMenu } from "../../../hooks/useContextMenu.ts";
import { createPortal } from "react-dom";
import { GoogleIcon } from "../../../shared/components/GoogleIcon/GoogleIcon.tsx";

const iconsResources: Record<LocationLabel, string> = {
  "Pick Up": "box",
  Delivery: "location_on",
  "Starting Point": "start",
  "Ending Point": "flag_2",
};

export const LoadLocationContextMenu: React.FC<{
  loadStateData: StateData<LoadData, LoadDataError>;
  loadLocation: LoadLocationData;
}> = ({ loadStateData, loadLocation }) => {
  const iconCode = iconsResources[loadLocation.label];
  const contextMenu = useContextMenu();

  const labelSetterFunction = (locationLabel: LocationLabel) => {
    loadStateData.setData((prevData) => {
      const locations = prevData.locations.map((location) =>
        location.uuid !== loadLocation.uuid
          ? location
          : {
              ...location,
              label: locationLabel,
            },
      );
      return { ...prevData, locations: locations };
    });
  };

  const loadLocationRemover = () => {
    loadStateData.setData((prevData) => {
      let order = 0;
      const locations: LoadLocationData[] = [];
      for (const prevLocation of prevData.locations) {
        if (prevLocation.uuid !== loadLocation.uuid) {
          locations.push({ ...prevLocation, order: order });
          order++;
        }
      }
      return { ...prevData, locations: locations };
    });
  };

  const actionItems: ContextMenuActionItem[] = [
    {
      icon: "arrow_forward",
      label: "Starting Point",
      action: () => labelSetterFunction("Starting Point"),
      level: 1,
    },
    {
      icon: "inventory_2",
      label: "Pick Up",
      action: () => labelSetterFunction("Pick Up"),
      level: 1,
    },
    {
      icon: "location_on",
      label: "Delivery",
      action: () => labelSetterFunction("Delivery"),
      level: 1,
    },
    {
      icon: "flag",
      label: "Ending Point",
      action: () => labelSetterFunction("Ending Point"),
      level: 1,
    },
    {
      icon: "delete",
      label: "Delete",
      action: loadLocationRemover,
      level: 2,
    },
  ];

  return (
    <div>
      <div onContextMenu={contextMenu.open} onClick={() => contextMenu.close()}>
        <div className="flex items-center justify-center text-[#6b7280] hover:text-[#4e71ff]">
          <GoogleIcon code={iconCode} size={2} weight={300} />
        </div>
        {contextMenu.isActive() &&
          createPortal(
            <ContextMenu
              x={contextMenu.getX()}
              y={contextMenu.getY()}
              deactivateContextMenuFn={contextMenu.close}
              actions={actionItems}
            />,
            document.body,
          )}
      </div>
    </div>
  );
};
