import { IconButton } from "../../organisms/Company/TrucksBoard/IconButton.tsx";
import calendarUnfocusedIcon from "../../../assets/trucks-board/calendar-unfocused.svg";
import calendarFocusedIcon from "../../../assets/trucks-board/calendar-focused.svg";
import * as React from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { WeekCalendar } from "../../organisms/Calendar/WeekCalendar.tsx";

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
          <WeekCalendar
            parentRef={calendarRef}
            isCalendarActive={isCalendarActive}
            setIsCalendarActive={setIsCalendarActive}
            extractWeekFromCalendar={extractWeekFromCalendar}
          />,
          document.body,
        )}
    </div>
  );
};
