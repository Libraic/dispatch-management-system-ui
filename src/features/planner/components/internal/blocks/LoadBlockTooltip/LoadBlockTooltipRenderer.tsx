import { createPortal } from "react-dom";
import { LoadBlockTooltip } from "#/features/planner/components/internal/blocks/LoadBlockTooltip/LoadBlockTooltip";
import { LOAD_STATUS_COLORS } from "#/features/planner/components/internal/blocks/LoadBlock/LoadBlock.constants";
import React from "react";
import type {
  LoadData,
  LoadLocationData,
} from "#/types/internal/planner/planner-types";
import { getLoadBlockTooltipData } from "#/features/planner/components/internal/blocks/LoadBlockTooltip/LoadBlockTooltip.utils";

type LoadBlockTooltipRendererProps = {
  tooltipPos: {
    top: number;
    left: number;
  } | null;
  load: LoadData;
  firstLocation: LoadLocationData;
  lastLocation: LoadLocationData;
  driverFullName: string;
};

export const LoadBlockTooltipRenderer: React.FC<
  LoadBlockTooltipRendererProps
> = ({ tooltipPos, load, firstLocation, lastLocation, driverFullName }) => {
  const data = getLoadBlockTooltipData(
    driverFullName,
    load,
    firstLocation,
    lastLocation,
  );

  return (
    tooltipPos &&
    createPortal(
      <div
        className="fixed z-[9999] pointer-events-none"
        style={{ top: tooltipPos.top, left: tooltipPos.left }}
      >
        <LoadBlockTooltip
          loadNumber={load.loadNumber}
          loadStatus={load.loadStatus}
          loadStatusColor={LOAD_STATUS_COLORS[load.loadStatus].textColor}
          borderColor={LOAD_STATUS_COLORS[load.loadStatus].borderColor}
          backgroundColor={LOAD_STATUS_COLORS[load.loadStatus].backgroundColor}
          data={data}
        />
      </div>,
      document.body,
    )
  );
};
