import {
  type DriverWorkforce,
  type LoadData,
} from "#/types/internal/planner/planner-types";
import React, { useContext } from "react";
import { SYSTEM_FONT_NORMAL } from "#/tailwind/tailwind-font-vars";
import { useActivator } from "#/hooks/useActivator";
import { useContextMenu } from "#/hooks/useContextMenu";
import type { ContextMenuActionItem } from "#/types/internal/common/context-menu-types";
import { ContextMenu } from "#/ui/ContextMenu/public/ContextMenu";
import {
  getChangeStatusOptions,
  getDeleteOption,
} from "#/utils/context-menu/context-menu-utils";
import { DispatchingContext } from "#/context/DispatchingContext";
import { SchedulableModal } from "#/features/planner/components/internal/forms/SchedulableModal";
import { LOAD_STATUS_COLORS } from "#/features/planner/components/internal/blocks/LoadBlock/LoadBlock.constants";
import { LoadBlockDetails } from "#/features/planner/components/internal/blocks/LoadBlockDetails";
import { useLoadPosition } from "#/features/planner/hooks/useLoadPosition";
import { useLoadBlock } from "#/features/planner/hooks/useLoadBlock";
import {
  getFirstPickUpLocation,
  getLastDeliveryLocation,
} from "#/features/planner/utils/loads.utils";

export const LoadBlock: React.FC<{
  driverLoadData: DriverWorkforce;
  load: LoadData;
}> = ({ driverLoadData, load }) => {
  const context = useContext(DispatchingContext)!;
  const { startingPoint, width } = useLoadPosition(load, context.days);

  const { updateStatus, deleteLoad } = useLoadBlock(load, driverLoadData);

  const loadFormActivator = useActivator();
  const contextMenu = useContextMenu();

  const actionItems: ContextMenuActionItem[] = [
    ...getChangeStatusOptions(updateStatus),
    getDeleteOption(deleteLoad),
  ];

  const firstLocation = getFirstPickUpLocation(load.locations)!;
  const lastLocation = getLastDeliveryLocation(load.locations)!;

  return (
    <div
      className="absolute top-2 h-[3.6rem] pointer-events-auto"
      onContextMenu={(e) => {
        if (!loadFormActivator.isActive()) {
          contextMenu.open(e);
        }
      }}
      onClick={contextMenu.close}
      style={{
        left: `${startingPoint}rem`,
        width: `${width}rem`,
      }}
    >
      <div
        onDoubleClick={loadFormActivator.change}
        className={`
          relative h-full mx-1 rounded-lg
          ${LOAD_STATUS_COLORS[load.loadStatus].backgroundColor}
          flex items-center justify-between px-3 shadow-sm
          cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis
          ${SYSTEM_FONT_NORMAL} text-[0.8rem]
        `}
      >
        <LoadBlockDetails
          textColor={LOAD_STATUS_COLORS[load.loadStatus].textColor}
          load={load}
          startLocation={firstLocation.location}
          endLocation={lastLocation.location}
          width={width}
        />
      </div>

      {loadFormActivator.isActive() && (
        <SchedulableModal
          deactivate={loadFormActivator.deactivate}
          props={{
            id: load.id,
            calendarBookModalType: "Load",
            workforce: driverLoadData,
          }}
        />
      )}

      {contextMenu.isActive() && (
        <ContextMenu
          x={contextMenu.getX()}
          y={contextMenu.getY()}
          deactivateContextMenuFn={contextMenu.close}
          actions={actionItems}
        />
      )}
    </div>
  );
};
