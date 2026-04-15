import React, { useEffect, useState } from "react";
import type { DispatchingRelation } from "../../../../../types/internal/planner/planner-types.ts";
import type { Activator } from "../../../../../hooks/useActivator.ts";
import { SYSTEM_FONT_LIGHT } from "../../../../../tailwind/tailwind-font-vars.ts";
import {
  divide,
  formatCurrency,
  formatNumber,
} from "../../../../../utils/global/number-utils.ts";
import { TABLE_BORDER_BASE_COLOR } from "../../../../../tailwind/tailwind-colors-vars.ts";
import {
  PLANNER_GRID_LAYOUT,
  PLANNER_ROW_HEIGHT,
  PLANNER_TEXT_SIZE,
} from "../../../../../constants/planner/planner-constants.ts";
import { formatPhoneNumber } from "../../../../../utils/global/input-form-utils.ts";
import { Z_INDEX_NORMAL_PRECEDENCE } from "../../../../../tailwind/tailwind-layout-vars.ts";
import { GoogleIcon } from "../../../../../shared/components/GoogleIcon/GoogleIcon.tsx";

export const DispatcherRow: React.FC<{
  dispatchingRelation: DispatchingRelation;
  expander: Activator;
}> = ({ dispatchingRelation, expander }) => {
  const [iconLabel, setIconLabel] = useState("chevron_right");

  useEffect(() => {
    const icon = expander.isActive() ? "keyboard_arrow_down" : "chevron_right";
    setIconLabel(icon);
  }, [expander]);

  const handleOnClickFn = () => {
    setIconLabel((prev) => {
      return prev === "chevron_right" ? "keyboard_arrow_down" : "chevron_right";
    });
    expander.change();
  };

  return (
    <div className="relative flex flex-row w-full">
      <div
        className={`absolute ${Z_INDEX_NORMAL_PRECEDENCE} mt-[1.5rem] left-[0.4rem] hover:cursor-pointer`}
        onClick={handleOnClickFn}
      >
        <GoogleIcon code={iconLabel} size={1.5} />
      </div>
      <div
        className={`grid ${PLANNER_GRID_LAYOUT} ${PLANNER_TEXT_SIZE} items-center ${PLANNER_ROW_HEIGHT} border-b-1 ${TABLE_BORDER_BASE_COLOR} bg-gray-200/85`}
      >
        <div
          className={`flex flex-col items-center justify-center ${SYSTEM_FONT_LIGHT} h-full border-x-1 ${TABLE_BORDER_BASE_COLOR} hover:cursor-pointer select-none`}
          onClick={handleOnClickFn}
        >
          <p>
            {dispatchingRelation.dispatcher &&
              dispatchingRelation.dispatcher.name}
          </p>
          <p className="text-gray-500">
            {dispatchingRelation.dispatcher &&
              formatPhoneNumber(dispatchingRelation.dispatcher.phoneNumber)}
          </p>
        </div>
        <div
          className={`flex items-center justify-center ${SYSTEM_FONT_LIGHT} h-full border-r-1 ${TABLE_BORDER_BASE_COLOR}`}
        >
          {formatCurrency(dispatchingRelation.totalRevenue)}
        </div>
        <div
          className={`flex items-center justify-center ${SYSTEM_FONT_LIGHT} h-full border-r-1 ${TABLE_BORDER_BASE_COLOR}`}
        >
          {formatNumber(dispatchingRelation.totalMiles)}
        </div>
        <div
          className={`flex items-center justify-center ${SYSTEM_FONT_LIGHT} h-full border-r-1 ${TABLE_BORDER_BASE_COLOR}`}
        >
          {formatCurrency(
            divide(
              dispatchingRelation.totalRevenue,
              dispatchingRelation.totalMiles,
            ),
          )}
        </div>
        <div
          className={`border-r-1 ${TABLE_BORDER_BASE_COLOR} w-[126rem] h-full`}
        ></div>
      </div>
    </div>
  );
};
