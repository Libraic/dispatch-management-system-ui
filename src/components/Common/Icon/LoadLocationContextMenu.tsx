import React, { useState } from "react";
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
import { Svg } from "./Svg.tsx";

const iconsResources: Record<LocationLabel, string> = {
  "Pick Up":
    "M450-177.23v-285.54L200-607.54v278.62q0 3.07 1.54 5.77 1.54 2.69 4.61 4.61L450-177.23Zm60 0 243.85-141.31q3.07-1.92 4.61-4.61 1.54-2.7 1.54-5.77v-278.62L510-462.77v285.54Zm-30-337.23 247-142.77-240.85-139.31q-3.07-1.92-6.15-1.92-3.08 0-6.15 1.92L233-657.23l247 142.77ZM176.16-265.85q-17.08-9.84-26.62-26.3-9.54-16.47-9.54-36.16v-303.38q0-19.69 9.54-36.16 9.54-16.46 26.62-26.3l267.69-154.08q17.07-9.85 36.15-9.85t36.15 9.85l267.69 154.08q17.08 9.84 26.62 26.3 9.54 16.47 9.54 36.16v303.38q0 19.69-9.54 36.16-9.54 16.46-26.62 26.3L516.15-111.77q-17.07 9.85-36.15 9.85t-36.15-9.85L176.16-265.85ZM480-480Z",
  Delivery:
    "M314.31-129.08Q250-158.15 250-204.23q0-21.31 16.04-40.08t44.35-32.23l47.23 42.85q-12.85 5.15-27.01 12.84-14.15 7.7-19.38 16.23 9.92 17.93 59.04 31.27Q419.38-160 480-160q60.23 0 109.85-13.35 49.61-13.34 59.54-31.27-5.08-9.15-20.5-16.84-15.43-7.69-29.27-12.85l46.61-43.46q30.69 14.08 47.23 32.85Q710-226.15 710-204.23q0 46.08-64.31 75.15Q581.38-100 480-100t-165.69-29.08ZM481-295q99.38-75.31 149.19-149.19Q680-518.08 680-590.92q0-103.54-64.81-156.31Q550.38-800 480-800q-70 0-135 52.77t-65 156.31q0 68.15 49.19 141.23Q378.38-376.61 481-295Zm-1 75q-131-97.85-195.5-190.08Q220-502.31 220-590.92q0-66.77 23.58-117 23.58-50.23 60.88-84.12 37.31-33.88 83.66-50.92Q434.46-860 480-860q45.54 0 91.88 17.04 46.35 17.04 83.66 50.92 37.3 33.89 60.88 84.12 23.58 50.23 23.58 117 0 88.61-64.5 180.84T480-220Zm0-304.23q29.92 0 51.11-21 21.2-21 21.2-51.31 0-29.92-21.2-51.11-21.19-21.2-51.11-21.2-29.54 0-50.92 21.2-21.39 21.19-21.39 51.11 0 30.31 21.39 51.31 21.38 21 50.92 21Zm0-72.31Z",
  "Starting Point":
    "M100-250v-460h60v460h-60Zm534.23-4.23L591.46-296l154-154H247.69v-60h497.39L592.46-664l41.77-41.77L860-480 634.23-254.23Z",
  "Ending Point":
    "M220-100v-720h600l-81.92 185.39L820-449.23H280V-100h-60Zm60-409.23h449.31l-56.46-125.38L729.31-760H280v250.77Zm0 0V-760-509.23Z",
};

export const LoadLocationContextMenu: React.FC<{
  loadStateData: StateData<LoadData, LoadDataError>;
  loadLocation: LoadLocationData;
}> = ({ loadStateData, loadLocation }) => {
  const icons = iconsResources[loadLocation.label];
  const [hovered, setHovered] = useState(false);
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
      svgPath:
        "M120-260v-440h40v440h-40Zm508.46-8.46L599.92-296l164-164H255.38v-40h507.77L600.92-664l27.54-27.54L840-480 628.46-268.46Z",
      label: "Starting Point",
      action: () => labelSetterFunction("Starting Point"),
      level: 1,
    },
    {
      svgPath:
        "M460-171.46v-297.08L200-619.08v283.23q0 6.16 3.08 11.54 3.07 5.39 9.23 9.23L460-171.46Zm40 0 247.69-143.62q6.16-3.84 9.23-9.23 3.08-5.38 3.08-11.54v-283.23L500-468.54v297.08Zm-20-331.46 257-148.54-244.69-141.62q-6.16-3.84-12.31-3.84t-12.31 3.84L223-651.46l257 148.54ZM192.31-279.69q-15.16-8.69-23.73-23.62-8.58-14.92-8.58-32.31v-288.76q0-17.39 8.58-32.31 8.57-14.93 23.73-23.62l255.38-147.15q15.16-8.69 32.31-8.69 17.15 0 32.31 8.69l255.38 147.15q15.16 8.69 23.73 23.62 8.58 14.92 8.58 32.31v288.76q0 17.39-8.58 32.31-8.57 14.93-23.73 23.62L512.31-132.54q-15.16 8.69-32.31 8.69-17.15 0-32.31-8.69L192.31-279.69ZM480-480Z",
      label: "Pick Up",
      action: () => labelSetterFunction("Pick Up"),
      level: 1,
    },
    {
      svgPath:
        "M314.31-129.08Q250-158.15 250-204.23q0-21.31 16.04-40.08t44.35-32.23l47.23 42.85q-12.85 5.15-27.01 12.84-14.15 7.7-19.38 16.23 9.92 17.93 59.04 31.27Q419.38-160 480-160q60.23 0 109.85-13.35 49.61-13.34 59.54-31.27-5.08-9.15-20.5-16.84-15.43-7.69-29.27-12.85l46.61-43.46q30.69 14.08 47.23 32.85Q710-226.15 710-204.23q0 46.08-64.31 75.15Q581.38-100 480-100t-165.69-29.08ZM481-295q99.38-75.31 149.19-149.19Q680-518.08 680-590.92q0-103.54-64.81-156.31Q550.38-800 480-800q-70 0-135 52.77t-65 156.31q0 68.15 49.19 141.23Q378.38-376.61 481-295Zm-1 75q-131-97.85-195.5-190.08Q220-502.31 220-590.92q0-66.77 23.58-117 23.58-50.23 60.88-84.12 37.31-33.88 83.66-50.92Q434.46-860 480-860q45.54 0 91.88 17.04 46.35 17.04 83.66 50.92 37.3 33.89 60.88 84.12 23.58 50.23 23.58 117 0 88.61-64.5 180.84T480-220Zm0-304.23q29.92 0 51.11-21 21.2-21 21.2-51.31 0-29.92-21.2-51.11-21.19-21.2-51.11-21.2-29.54 0-50.92 21.2-21.39 21.19-21.39 51.11 0 30.31 21.39 51.31 21.38 21 50.92 21Zm0-72.31Z",
      label: "Delivery",
      action: () => labelSetterFunction("Delivery"),
      level: 1,
    },
    {
      svgPath:
        "M240-120v-680h560l-83.85 170.77L800-458.46H280V-120h-40Zm40-378.46h456.62l-64.93-130.77L736.62-760H280v261.54Zm0 0V-760v261.54Z",
      label: "Ending Point",
      action: () => labelSetterFunction("Ending Point"),
      level: 1,
    },
    {
      svgPath:
        "M292.31-140q-29.92 0-51.12-21.19Q220-182.39 220-212.31V-720h-40v-60h180v-35.38h240V-780h180v60h-40v507.69Q740-182 719-161q-21 21-51.31 21H292.31ZM680-720H280v507.69q0 5.39 3.46 8.85t8.85 3.46h375.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-720ZM376.16-280h59.99v-360h-59.99v360Zm147.69 0h59.99v-360h-59.99v360ZM280-720v520-520Z",
      label: "Delete",
      action: loadLocationRemover,
      level: 2,
    },
  ];

  return (
    <div>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onContextMenu={contextMenu.open}
        onClick={contextMenu.close}
      >
        <Svg
          activeColor="#4e71ff"
          inactiveColor="#6b7280"
          isHovered={hovered}
          svgPath={icons}
          size={32}
        />
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
