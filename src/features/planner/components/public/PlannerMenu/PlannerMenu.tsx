import React from "react";
import { CalendarIconWrapper } from "#/ui/Calendar/public/CalendarIconWrapper";
import { useTime } from "#/features/planner/components/public/PlannerMenu/useTime";

type PlannerMenuProps = {
  extractWeekFromCalendar: (date: Date[]) => void;
  timezone: string;
};

const getTime = (zonedParts: { hour: number; minute: number }) => {
  const { hour, minute } = zonedParts;

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour > 12 ? hour - 12 : hour;

  return `${String(hour12).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
};

export const PlannerMenu: React.FC<PlannerMenuProps> = ({
  extractWeekFromCalendar,
  timezone,
}) => {
  const zonedParts = useTime(timezone);

  return (
    <div className="flex items-center justify-between mb-[1rem]">
      <div>
        <div className="w-fit border-1 border-gray-400 px-2 rounded-md tracking-tight font-bold select-none">
          <p>{getTime(zonedParts)}</p>
        </div>
      </div>
      <div>
        <CalendarIconWrapper
          extractWeekFromCalendar={extractWeekFromCalendar}
        />
      </div>
    </div>
  );
};
