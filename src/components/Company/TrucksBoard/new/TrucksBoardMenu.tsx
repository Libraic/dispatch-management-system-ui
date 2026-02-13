import React from "react";
import { CalendarIconWrapper } from "../../../Common/Calendar/internal/CalendarIconWrapper.tsx";

export const TrucksBoardMenu: React.FC<{
  extractWeekFromCalendar: (date: Date[]) => void;
}> = ({ extractWeekFromCalendar }) => {
  return (
    <div className="flex justify-end mb-[1rem]">
      <div>
        <CalendarIconWrapper
          extractWeekFromCalendar={extractWeekFromCalendar}
        />
      </div>
    </div>
  );
};
