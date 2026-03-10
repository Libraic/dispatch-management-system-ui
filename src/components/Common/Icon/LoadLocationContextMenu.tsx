import React, { useState } from "react";
import { ContextMenu } from "../ContextMenu/public/ContextMenu.tsx";
import type { StateData } from "../../../types/internal/common/props-types.ts";
import type {
  LocationLabel,
  LocationLabelResource,
  LoadData,
  LoadDataError,
  LoadLocationData,
} from "../../../types/internal/trucks-board/trucks-board-types.ts";
import type { ContextMenuActionItem } from "../../../types/internal/common/context-menu-types.ts";
import { useContextMenu } from "../../../hooks/useContextMenu.ts";
import { createPortal } from "react-dom";
import pickUpFocusedIcon from "../../../assets/trucks-board/locations/pickup-focused.svg";
import pickUpUnfocusedIcon from "../../../assets/trucks-board/locations/pickup-unfocused.svg";
import pickUpWhiteIcon from "../../../assets/trucks-board/locations/pickup-white.svg";
import deliveryFocusedIcon from "../../../assets/trucks-board/locations/delivery-focused.svg";
import deliveryUnfocusedIcon from "../../../assets/trucks-board/locations/delivery-unfocused.svg";
import deliveryWhiteIcon from "../../../assets/trucks-board/locations/delivery-white.svg";
import startingPointUnfocusedIcon from "../../../assets/trucks-board/locations/start-unfocused.svg";
import startingPointFocusedIcon from "../../../assets/trucks-board/locations/start-focused.svg";
import startingPointWhiteIcon from "../../../assets/trucks-board/locations/start-white.svg";
import endingPointFocusedIcon from "../../../assets/trucks-board/locations/end-focused.svg";
import endingPointUnfocusedIcon from "../../../assets/trucks-board/locations/end-unfocused.svg";
import endingPointWhiteIcon from "../../../assets/trucks-board/locations/end-white.svg";
import removeWhiteIcon from "../../../assets/trucks-board/locations/remove-white.svg";
import removeUnfocusedIcon from "../../../assets/trucks-board/locations/remove-unfocused.svg";

const iconsResources: LocationLabelResource = {
  "Pick Up": { focused: pickUpFocusedIcon, unfocused: pickUpUnfocusedIcon },
  Delivery: { focused: deliveryFocusedIcon, unfocused: deliveryUnfocusedIcon },
  "Starting Point": {
    focused: startingPointFocusedIcon,
    unfocused: startingPointUnfocusedIcon,
  },
  "Ending Point": {
    focused: endingPointFocusedIcon,
    unfocused: endingPointUnfocusedIcon,
  },
};

export const LoadLocationContextMenu: React.FC<{
  loadStateData: StateData<LoadData, LoadDataError>;
  loadLocation: LoadLocationData;
}> = ({ loadStateData, loadLocation }) => {
  const icons = iconsResources[loadLocation.label];
  const [activeIcon, setActiveIcon] = useState(icons.unfocused);
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
      setActiveIcon(iconsResources[locationLabel].unfocused);
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
      activeIcon: startingPointWhiteIcon,
      inactiveIcon: startingPointUnfocusedIcon,
      label: "Starting Point",
      action: () => labelSetterFunction("Starting Point"),
      level: 1,
    },
    {
      activeIcon: pickUpWhiteIcon,
      inactiveIcon: pickUpUnfocusedIcon,
      label: "Pick Up",
      action: () => labelSetterFunction("Pick Up"),
      level: 1,
    },
    {
      activeIcon: deliveryWhiteIcon,
      inactiveIcon: deliveryUnfocusedIcon,
      label: "Delivery",
      action: () => labelSetterFunction("Delivery"),
      level: 1,
    },
    {
      activeIcon: endingPointWhiteIcon,
      inactiveIcon: endingPointUnfocusedIcon,
      label: "Ending Point",
      action: () => labelSetterFunction("Ending Point"),
      level: 1,
    },
    {
      activeIcon: removeWhiteIcon,
      inactiveIcon: removeUnfocusedIcon,
      label: "Delete",
      action: loadLocationRemover,
      level: 2,
    },
  ];

  return (
    <div>
      <div
        onMouseEnter={() => setActiveIcon(icons.focused)}
        onMouseLeave={() => setActiveIcon(icons.unfocused)}
        onContextMenu={contextMenu.open}
        onClick={contextMenu.close}
      >
        <img className="w-8 h-8 cursor-pointer" src={activeIcon} alt="icon" />
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
