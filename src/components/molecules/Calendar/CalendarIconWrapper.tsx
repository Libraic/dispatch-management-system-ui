import { IconButton } from "../../atoms/Button/IconButton.tsx";
import calendarUnfocusedIcon from "../../../assets/trucks-board/calendar-unfocused.svg";
import calendarFocusedIcon from "../../../assets/trucks-board/calendar-focused.svg";
import * as React from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { Calendar } from "../../organisms/Calendar/Calendar.tsx";
import { CalendarUnitTypes } from "../../../types/internal/calendar/calendar-types.ts";

export const CalendarIconWrapper: React.FC<{
  extractWeekFromCalendar: (date: Date[]) => void;
}> = ({ extractWeekFromCalendar }) => {
  const [isCalendarActive, setIsCalendarActive] = React.useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative" ref={calendarRef}>
      <IconButton
        unfocusedResource={calendarUnfocusedIcon}
        focusedResource={calendarFocusedIcon}
        action={async () => setIsCalendarActive((prev) => !prev)}
        information="Select timeline"
      />
      {isCalendarActive &&
        createPortal(
          <Calendar
            unitType={CalendarUnitTypes.WEEK}
            parentRef={calendarRef}
            isCalendarActive={isCalendarActive}
            setIsCalendarActive={setIsCalendarActive}
            timePeriodExtractor={extractWeekFromCalendar}
          />,
          document.body,
        )}
    </div>
  );
};
