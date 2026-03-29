import React, { useEffect, useState } from "react";
import { BLANK_STRING } from "../../../../../constants/common/global-constants.ts";
import chevronRightIcon from "../../../../../assets/planner/chevron-right.svg";
import chevronDownIcon from "../../../../../assets/planner/chevron-down.svg";
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

export const PlannerDispatcherRow: React.FC<{
  dispatchingRelation: DispatchingRelation;
  expander: Activator;
}> = ({ dispatchingRelation, expander }) => {
  const [activeIcon, setActiveIcon] = useState(BLANK_STRING);

  useEffect(() => {
    if (dispatchingRelation.workforceUnits.length === 0) {
      setActiveIcon(BLANK_STRING);
    } else {
      const icon = expander.isActive() ? chevronDownIcon : chevronRightIcon;
      setActiveIcon(icon);
    }
  }, [expander, dispatchingRelation.workforceUnits.length]);

  const handleOnClickFn = () => {
    setActiveIcon((prev) => {
      return prev === chevronRightIcon ? chevronDownIcon : chevronRightIcon;
    });
    expander.change();
  };

  return (
    <div className="relative flex flex-row">
      {activeIcon !== BLANK_STRING && (
        <img
          src={activeIcon}
          alt="chevron-right"
          className="absolute w-7 h-7 z-[999] mt-[1.3rem] pr-[0.5rem] left-[0.5rem] hover:cursor-pointer"
          onClick={handleOnClickFn}
        />
      )}
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
          className={`border-r-1 ${TABLE_BORDER_BASE_COLOR} w-[112rem] h-full`}
        ></div>
      </div>
    </div>
  );
};
