import { IconButton } from "../../Button/IconButton.tsx";
import calendarUnfocusedIcon from "../../../../assets/planner/calendar-unfocused.svg";
import calendarFocusedIcon from "../../../../assets/planner/calendar-focused.svg";
import * as React from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { Calendar } from "../public/Calendar.tsx";
import { CalendarUnitTypes } from "../../../../types/internal/calendar/calendar-types.ts";
import { useActivator } from "../../../../hooks/useActivator.ts";

export const CalendarIconWrapper: React.FC<{
  extractWeekFromCalendar: (date: Date[]) => void;
}> = ({ extractWeekFromCalendar }) => {
  const calendarActivator = useActivator();
  const calendarRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative" ref={calendarRef}>
      <IconButton
        unfocusedResource={calendarUnfocusedIcon}
        focusedResource={calendarFocusedIcon}
        action={async () => calendarActivator.change()}
        information="Select timeline"
      />
      {calendarActivator.isActive() &&
        createPortal(
          <Calendar
            unitType={CalendarUnitTypes.WEEK}
            parentRef={calendarRef}
            calendarActivator={calendarActivator}
            timePeriodExtractor={extractWeekFromCalendar}
          />,
          document.body,
        )}
    </div>
  );
};
