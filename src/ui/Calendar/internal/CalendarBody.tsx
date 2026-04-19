import {
  BACKGROUND_PALE_BLUE,
  BORDER_PALE_BLUE,
  HOVER_BACKGROUND_PALE_BLUE,
  TEXT_SOLID_GRAY,
} from "#/shared/constants/tailwind/tailwindColors.constants";
import * as React from "react";
import {
  type CalendarUnitType,
  CalendarUnitTypes,
  type WeekIndexer,
} from "#/ui/Calendar/public/Calendar/Calendar.types";
import type { DayOfMonth } from "#/types/internal/time/date-types";

type CalendarBodyProps = {
  unitType: CalendarUnitType;
  daysOfMonthGroupedByWeek: WeekIndexer;
  activeWeek: number;
  setActiveWeekByIndex: (weekIndex: number) => void;
  timePeriodExtractorFunction: (days: DayOfMonth[]) => void;
};

export const CalendarBody: React.FC<CalendarBodyProps> = ({
  unitType,
  daysOfMonthGroupedByWeek,
  activeWeek,
  setActiveWeekByIndex,
  timePeriodExtractorFunction,
}) => {
  const today = new Date();
  const dayOfMonth = today.getDate();

  return (
    <div className="flex flex-col items-center font-light text-[0.7rem] pt-4 gap-y-5">
      {Array.from(
        { length: Object.keys(daysOfMonthGroupedByWeek).length },
        (_, i) => {
          const week = daysOfMonthGroupedByWeek[i];
          return (
            <div
              key={i}
              className={`flex flex-row items-center gap-x-[0.85rem] hover:cursor-pointer font-normal ${activeWeek === i && unitType === CalendarUnitTypes.WEEK && BACKGROUND_PALE_BLUE} rounded-[0.2rem] h-[1.85rem]`}
              onClick={() => {
                if (unitType === CalendarUnitTypes.WEEK) {
                  timePeriodExtractorFunction(week);
                }
              }}
              onMouseEnter={() => setActiveWeekByIndex(i)}
              onMouseLeave={() => setActiveWeekByIndex(-1)}
            >
              {week.map((weekday, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (unitType === CalendarUnitTypes.DAY) {
                      timePeriodExtractorFunction([
                        {
                          ...weekday,
                          weekNumber: i,
                        },
                      ]);
                    }
                  }}
                  className={`flex items-center justify-center ${unitType === CalendarUnitTypes.DAY && HOVER_BACKGROUND_PALE_BLUE} ${activeWeek === i && unitType === CalendarUnitTypes.WEEK && BACKGROUND_PALE_BLUE} ${weekday !== undefined && !weekday.currentMonth ? "text-gray-400" : "text-black"} ${activeWeek === i && TEXT_SOLID_GRAY} ${weekday.day === dayOfMonth && weekday.currentMonth && `${BORDER_PALE_BLUE} border-[0.1rem]`} rounded-[0.6rem] w-6 h-6`}
                >
                  <p className="text-center">{weekday.day}</p>
                </div>
              ))}
            </div>
          );
        },
      )}
    </div>
  );
};
