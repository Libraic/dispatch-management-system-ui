import {
  type CalendarTimeline,
  type CalendarUnitType,
  CalendarUnitTypes,
} from "#/ui/Calendar/public/Calendar/Calendar.types";
import type { DayOfMonth } from "#/types/internal/time/date-types";

export const getDatesForTheTimeline = (
  timeline: CalendarTimeline,
  days: DayOfMonth[],
  unitType: CalendarUnitType,
) => {
  const currentYear = parseInt(timeline.year);
  const currentMonth = new Date(`${timeline.month} 1, 2000`).getMonth();
  const fallbackMonth = getFallbackMonth(days, currentMonth);
  const fallbackYear = getFallbackYear(days, currentYear, fallbackMonth);
  const dates = [];
  if (unitType === CalendarUnitTypes.WEEK) {
    for (const day of days) {
      const date = day.currentMonth
        ? new Date(currentYear, currentMonth, day.day)
        : new Date(fallbackYear, fallbackMonth, day.day);
      dates.push(date);
    }
  } else if (unitType === CalendarUnitTypes.DAY) {
    const day = days[0];
    const date = day.currentMonth
      ? new Date(currentYear, currentMonth, day.day)
      : new Date(fallbackYear, fallbackMonth, day.day);
    dates.push(date);
  }
  return dates;
};

const getFallbackMonth = (days: DayOfMonth[], currentMonth: number) => {
  if (shouldMoveBackward(days)) {
    return currentMonth === 0 ? 11 : currentMonth - 1;
  }

  if (shouldMoveForward(days)) {
    return currentMonth === 11 ? 0 : currentMonth + 1;
  }

  return currentMonth;
};

const getFallbackYear = (
  days: DayOfMonth[],
  currentYear: number,
  fallbackMonth: number,
) => {
  if (shouldMoveBackward(days)) {
    return fallbackMonth === 11 ? currentYear - 1 : currentYear;
  }

  if (shouldMoveForward(days)) {
    return fallbackMonth === 0 ? currentYear + 1 : currentYear;
  }

  return currentYear;
};

const shouldMoveBackward = (days: DayOfMonth[]) => {
  const len = days.length;
  return (
    (len === 1 && days[0].weekNumber === 0 && !days[0].currentMonth) ||
    (len > 1 && !days[0].currentMonth)
  );
};

const shouldMoveForward = (days: DayOfMonth[]) => {
  const len = days.length;
  return (
    (len === 1 && days[0].weekNumber! > 0 && !days[0].currentMonth) ||
    (len > 1 && !days[days.length - 1].currentMonth)
  );
};
