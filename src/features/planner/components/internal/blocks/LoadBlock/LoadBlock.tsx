import React, { useContext } from "react";
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
import { LoadBlockDetails } from "#/features/planner/components/internal/blocks/LoadBlockDetails/LoadBlockDetails";
import { useLoadPosition } from "#/features/planner/hooks/useLoadPosition";
import { useLoadBlock } from "#/features/planner/hooks/useLoadBlock";
import {
  getFirstPickUpLocation,
  getLastDeliveryLocation,
} from "#/features/planner/utils/loads.utils";
import { Z_INDEX_LOW_PRECEDENCE } from "#/shared/constants/tailwind/tailwindLayout.constants";
import { useMode } from "#/features/planner/components/internal/blocks/LoadBlock/useMode";
import type { LoadBlockProps } from "#/features/planner/components/internal/blocks/LoadBlock/LoadBlock.types";
import { LoadBlockTooltipRenderer } from "#/features/planner/components/internal/blocks/LoadBlockTooltip/LoadBlockTooltipRenderer";
import { useTooltip } from "#/features/planner/components/internal/blocks/LoadBlockTooltip/useTooltip";

export const LoadBlock: React.FC<LoadBlockProps> = ({
  driverLoadData,
  load,
}) => {
  const context = useContext(DispatchingContext)!;
  const { startingPoint, width } = useLoadPosition(
    load,
    context.days,
    context.timezone,
  );

  const { updateStatus, deleteLoad } = useLoadBlock(load, driverLoadData);

  const loadFormActivator = useActivator();
  const contextMenu = useContextMenu();

  const actionItems: ContextMenuActionItem[] = [
    ...getChangeStatusOptions(updateStatus),
    getDeleteOption(deleteLoad),
  ];

  const firstLocation = getFirstPickUpLocation(load.locations)!;
  const lastLocation = getLastDeliveryLocation(load.locations)!;

  const { modeRef, childRef, mode, isExpanded, setIsExpanded } = useMode();

  const { blockRef, tooltipRef, openTooltip, closeTooltip, tooltipPos } =
    useTooltip();

  return (
    <div
      ref={(el) => {
        blockRef.current = el;
        modeRef.current = el;
      }}
      className="absolute top-2 h-[3.6rem] pointer-events-auto"
      onClick={() => {
        if (contextMenu.isActive()) {
          contextMenu.close();
        }

        if (tooltipPos === null) {
          openTooltip();
        } else {
          closeTooltip();
        }
      }}
      onDoubleClick={() => {
        closeTooltip();
        setIsExpanded(false);
        loadFormActivator.change();
      }}
      onContextMenu={(e) => {
        if (!loadFormActivator.isActive()) {
          contextMenu.open(e);
        }
      }}
      style={{
        left: `${startingPoint}rem`,
        width: isExpanded
          ? mode !== "full"
            ? "18rem"
            : "fit-content"
          : `${width}rem`,
      }}
    >
      <div
        onMouseEnter={() => {
          if (mode !== "full") {
            setIsExpanded(true);
          }
        }}
        onMouseLeave={() => {
          setIsExpanded(false);
        }}
        className={`
          relative h-full px-3 rounded-r-lg rounded-l-[0.2rem] w-full
          ${LOAD_STATUS_COLORS[load.loadStatus].backgroundColor}
          flex items-center justify-between shadow-sm
          cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis
          font-normal text-[0.8rem]
          ${isExpanded ? Z_INDEX_LOW_PRECEDENCE : "z-0"}
          border-l-3 ${LOAD_STATUS_COLORS[load.loadStatus].borderColor}
        `}
      >
        <LoadBlockDetails
          textColor={LOAD_STATUS_COLORS[load.loadStatus].textColor}
          load={load}
          startLocation={firstLocation.location}
          endLocation={lastLocation.location}
          childRef={childRef}
          mode={mode}
        />
      </div>

      <LoadBlockTooltipRenderer
        tooltipRef={tooltipRef}
        tooltipPos={tooltipPos}
        load={load}
        firstLocation={firstLocation}
        lastLocation={lastLocation}
        driverFullName={driverLoadData.driver.fullName}
      />

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
