import { createPortal } from "react-dom";
import { Calendar } from "../organisms/Calendar/Calendar.tsx";
import { CalendarUnitTypes } from "../../types/internal/calendar/calendar-types.ts";
import * as React from "react";
import { useRef } from "react";
import { TRAILING_ZERO } from "../../constants/common/global-constants.ts";
import { useActivator } from "../../hooks/useActivator.ts";

export const DayPicker: React.FC<{
  date: Date;
  setDate: (date: Date) => void;
}> = ({ date, setDate }) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarActivator = useActivator();

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, TRAILING_ZERO);
    const month = String(date.getMonth() + 1).padStart(2, TRAILING_ZERO);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div
      ref={calendarRef}
      onClick={calendarActivator.change}
      className="flex items-center justify-center w-[8.5rem] h-[2.6rem] bg-gray-50 border-1 border-pale-blue rounded-[0.4rem] font-plus-jakarta-sans font-thin text-[0.85rem] hover:bg-light-blue hover:cursor-pointer hover:text-white hover:border-0"
    >
      <p className="select-none">{formatDate(date)}</p>
      {calendarActivator.isActive() &&
        createPortal(
          <Calendar
            unitType={CalendarUnitTypes.DAY}
            parentRef={calendarRef}
            calendarActivator={calendarActivator}
            timePeriodExtractor={(date: Date[]) => {
              setDate(date[0]);
            }}
          />,
          document.body,
        )}
    </div>
  );
};
