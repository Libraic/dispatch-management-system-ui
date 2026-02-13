import React, { useEffect, useState } from "react";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import { DispatchCalendarCell } from "./DispatchCalendarCell.tsx";
import chevronRightIcon from "../../../../assets/trucks-board/chevron-right.svg";
import chevronDownIcon from "../../../../assets/trucks-board/chevron-down.svg";
import type { DispatcherMileageData } from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import type { Activator } from "../../../../hooks/useActivator.ts";
import { SYSTEM_FONT_LIGHT } from "../../../../tailwind/tailwind-font-vars.ts";

export const TrucksBoardDispatcherRow: React.FC<{
  days: string[];
  dispatcherMileageData: DispatcherMileageData;
  expander: Activator;
}> = ({ days, dispatcherMileageData, expander }) => {
  const [activeIcon, setActiveIcon] = useState(BLANK_STRING);

  useEffect(() => {
    if (dispatcherMileageData.driverMileageDataList.length === 0) {
      setActiveIcon(BLANK_STRING);
    } else {
      const icon = expander.isActive() ? chevronDownIcon : chevronRightIcon;
      setActiveIcon(icon);
    }
  }, [expander, dispatcherMileageData.driverMileageDataList.length]);

  return (
    <div className="relative flex flex-row">
      {activeIcon !== BLANK_STRING && (
        <img
          src={activeIcon}
          alt="chevron-right"
          className="absolute w-7 h-7 z-[999] mt-[1.08rem] left-[0.5rem] hover:cursor-pointer"
          onClick={() => {
            setActiveIcon((prev) => {
              return prev === chevronRightIcon
                ? chevronDownIcon
                : chevronRightIcon;
            });
            expander.change();
          }}
        />
      )}
      <div
        className={`grid grid-cols-[15rem_15rem_9rem_17.04rem_repeat(14,5rem)] items-center h-[4rem] bg-blue-grey border-l-1 border-b-1 border-gray-400 w-[55%] flex-shrink-0`}
      >
        <div
          className={`flex items-center px-10 ${SYSTEM_FONT_LIGHT} text-[0.95rem] h-full border-r-1 border-b-1 border-gray-400`}
        >
          {dispatcherMileageData.dispatcher &&
            dispatcherMileageData.dispatcher.renderOnForm()}
        </div>
        <div className="h-full border-r-1 border-gray-400"></div>
        <div
          className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full border-r-1 border-gray-400`}
        >
          {dispatcherMileageData.totalRevenue === 0
            ? BLANK_STRING
            : dispatcherMileageData.totalRevenue}
        </div>
        <div
          className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full border-gray-400`}
        >
          {dispatcherMileageData.totalMiles === 0
            ? BLANK_STRING
            : dispatcherMileageData.totalMiles}
        </div>
        {days.map((day) => (
          <DispatchCalendarCell
            key={day}
            day={day}
            isEditable={false}
            styles={`border-r-0 border-t-0 last:border-r-1 h-[4rem] bg-blue-grey`}
          />
        ))}
      </div>
    </div>
  );
};
