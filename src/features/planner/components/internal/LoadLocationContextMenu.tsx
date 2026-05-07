import React, { useContext } from "react";
import { ContextMenu } from "#/ui/ContextMenu/public/ContextMenu";
import type {
  LoadLocationData,
  LocationLabel,
} from "#/types/internal/planner/planner-types";
import type { ContextMenuActionItem } from "#/types/internal/common/context-menu-types";
import { useContextMenu } from "#/hooks/useContextMenu";
import { createPortal } from "react-dom";
import { GoogleIcon } from "#/ui/GoogleIcon/GoogleIcon";
import { LoadContext } from "#/features/planner/context/LoadContext";
import { BLANK_STRING } from "#/constants/common/global-constants";

const iconsResources: Record<LocationLabel, string> = {
  "Pick Up": "box",
  Delivery: "location_on",
  "Starting Point": "start",
  "Ending Point": "flag_2",
};

export const LoadLocationContextMenu: React.FC<{
  loadLocation: LoadLocationData;
}> = ({ loadLocation }) => {
  const loadContext = useContext(LoadContext)!!;
  const iconCode = iconsResources[loadLocation.label];
  const contextMenu = useContextMenu();

  const labelSetterFunction = (locationLabel: LocationLabel) => {
    loadContext.setLoadData((prevData) => {
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
    loadContext.setLoadData((prevData) => {
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
        <div
          className={`
            flex items-center justify-center mb-[2.8rem] text-[#6b7280] 
            ${loadLocation.label === "Pick Up" || loadLocation.label === "Delivery" ? "hover:text-[#4e71ff]" : BLANK_STRING}
          `}
        >
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
