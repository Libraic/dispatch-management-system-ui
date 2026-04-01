import { createPortal } from "react-dom";
import { Calendar } from "../Calendar/public/Calendar.tsx";
import { CalendarUnitTypes } from "../../../types/internal/calendar/calendar-types.ts";
import * as React from "react";
import { useRef } from "react";
import { useActivator } from "../../../hooks/useActivator.ts";
import { formatDate } from "../../../utils/global/date-utils.ts";
import { SYSTEM_FONT_THIN } from "../../../tailwind/tailwind-font-vars.ts";

export const DayPicker: React.FC<{
  date: Date;
  setDate: (date: Date) => void;
}> = ({ date, setDate }) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarActivator = useActivator();

  return (
    <div
      ref={calendarRef}
      onClick={calendarActivator.change}
      className={`flex items-center justify-center w-[8.5rem] h-[2.6rem] bg-gray-50 border-1 border-pale-blue rounded-[0.4rem] ${SYSTEM_FONT_THIN} text-[0.85rem] hover:bg-light-blue hover:cursor-pointer hover:text-white hover:border-0`}
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
