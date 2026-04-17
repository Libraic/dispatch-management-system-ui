import { IconButton } from "#/ui/Buttons/IconButton";
import * as React from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { Calendar } from "#/ui/Calendar/public/Calendar/Calendar";
import { useActivator } from "#/hooks/useActivator";
import { GoogleIcon } from "#/ui/GoogleIcon/GoogleIcon";
import { CalendarUnitTypes } from "#/ui/Calendar/public/Calendar/Calendar.types";

type CalendarIconWrapperProps = {
  extractWeekFromCalendar: (date: Date[]) => void;
};

export const CalendarIconWrapper: React.FC<CalendarIconWrapperProps> = ({
  extractWeekFromCalendar,
}) => {
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
