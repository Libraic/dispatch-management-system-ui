import { createPortal } from "react-dom";
import { Calendar } from "#/ui/Calendar/public/Calendar/Calendar";
import * as React from "react";
import { useRef } from "react";
import { useActivator } from "#/hooks/useActivator";
import { formatDate } from "#/utils/global/date-utils";
import { CalendarUnitTypes } from "#/ui/Calendar/public/Calendar/Calendar.types";

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
      className={`flex items-center justify-center w-[8.5rem] h-[2.6rem] bg-gray-50 border-1 border-pale-blue rounded-[0.4rem] font-thin text-[0.85rem] hover:bg-light-blue hover:cursor-pointer hover:text-white hover:border-0`}
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
