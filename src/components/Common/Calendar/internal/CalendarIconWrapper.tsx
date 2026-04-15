import { IconButton } from "../../Button/IconButton.tsx";
import * as React from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { Calendar } from "../public/Calendar.tsx";
import { CalendarUnitTypes } from "../../../../types/internal/calendar/calendar-types.ts";
import { useActivator } from "../../../../hooks/useActivator.ts";
import { GoogleIcon } from "../../../../shared/components/GoogleIcon/GoogleIcon.tsx";

export const CalendarIconWrapper: React.FC<{
  extractWeekFromCalendar: (date: Date[]) => void;
}> = ({ extractWeekFromCalendar }) => {
  const calendarActivator = useActivator();
  const calendarRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative" ref={calendarRef}>
      <IconButton
        icon={<GoogleIcon code="calendar_month" />}
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
