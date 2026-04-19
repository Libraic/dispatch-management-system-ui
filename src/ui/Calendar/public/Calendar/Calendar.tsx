import { MONTHS, WEEKDAYS } from "#/constants/date/date-constants";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  getDaysOfMonthGroupedByWeek,
  getListOfNYears,
} from "#/utils/global/date-utils";
import { CalendarTimeUnitSelector } from "#/ui/Calendar/internal/CalendarTimeUnitSelector";
import { CalendarBody } from "#/ui/Calendar/internal/CalendarBody";
import { useOnClickOutside } from "#/hooks/useClickOutside";
import type { DayOfMonth } from "#/types/internal/time/date-types";
import type {
  CalendarProps,
  CalendarTimeline,
} from "#/ui/Calendar/public/Calendar/Calendar.types";
import { getDatesForTheTimeline } from "#/ui/Calendar/public/Calendar/Calendar.utils";

export const Calendar: React.FC<CalendarProps> = ({
  unitType,
  parentRef,
  calendarActivator,
  timePeriodExtractor,
}) => {
  const now = new Date();
  const [timeline, setTimeline] = useState<CalendarTimeline>({
    year: now.getFullYear().toString(),
    month: now.toLocaleString("en-US", { month: "long" }),
    activeWeek: -1,
  });
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  useEffect(() => {
    if (parentRef.current) {
      setTop(parentRef.current.getBoundingClientRect().top + 30);
      setLeft(parentRef.current.getBoundingClientRect().left - 265);
    }
  }, [parentRef]);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const yearExpanderRef = useRef<HTMLDivElement | null>(null);
  const monthExpanderRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(wrapperRef, () => calendarActivator.deactivate(), [
    parentRef,
    yearExpanderRef,
    monthExpanderRef,
  ]);

  const timePeriodExtractorTemplateFunction = (days: DayOfMonth[]) => {
    const dates = getDatesForTheTimeline(timeline, days, unitType);
    timePeriodExtractor(dates);
    calendarActivator.deactivate();
  };

  if (!calendarActivator.isActive()) {
    return null;
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
      onClick={(e) => e.stopPropagation()}
      className={`absolute z-9999 bg-white/20 backdrop-blur-lg w-[17.25rem] h-fit border-[0.08rem] border-gray-300 rounded-[0.35rem] px-2 py-1 font-normal`}
    >
      <div className="flex flex-row items-center gap-x-10 text-[0.9rem]">
        <CalendarTimeUnitSelector
          label={timeline.month.slice(0, 3)}
          selectedValue={timeline.month}
          values={Object.keys(MONTHS)}
          top={top + 2}
          left={left + 35}
          expanderRef={monthExpanderRef}
          setValue={(month: string) =>
            setTimeline((prev) => ({ ...prev, month: month }))
          }
        />
        <CalendarTimeUnitSelector
          selectedValue={timeline.year}
          values={getListOfNYears(12)}
          top={top + 2}
          left={left + 108}
          expanderRef={yearExpanderRef}
          setValue={(year: string) =>
            setTimeline((prev) => ({ ...prev, year: year }))
          }
        />
      </div>
      <div className="flex flex-row items-center justify-between gap-x-2 font-light text-[0.7rem] pt-4">
        {WEEKDAYS.map((weekday, index) => (
          <p key={index}>{weekday.slice(0, 3).toUpperCase()}</p>
        ))}
      </div>
      <CalendarBody
        unitType={unitType}
        daysOfMonthGroupedByWeek={getDaysOfMonthGroupedByWeek(
          MONTHS[timeline.month],
          parseInt(timeline.year),
        )}
        activeWeek={timeline.activeWeek}
        setActiveWeekByIndex={(activeWeek: number) =>
          setTimeline((prev) => ({ ...prev, activeWeek: activeWeek }))
        }
        timePeriodExtractorFunction={timePeriodExtractorTemplateFunction}
      />
    </div>
  );
};
