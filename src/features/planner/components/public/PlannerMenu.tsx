import React from "react";
import { CalendarIconWrapper } from "#/ui/Calendar/public/CalendarIconWrapper";

type PlannerMenuProps = {
  extractWeekFromCalendar: (date: Date[]) => void;
};

export const PlannerMenu: React.FC<PlannerMenuProps> = ({
  extractWeekFromCalendar,
}) => {
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
