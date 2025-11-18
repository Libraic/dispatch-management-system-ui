import type { DayOfMonth } from "../../types/internal/date/date-types.ts";

export const getFallbackMonth = (days: DayOfMonth[], currentMonth: number) => {
  if (!days[0].currentMonth) {
    return currentMonth === 0 ? 11 : currentMonth - 1;
  }

  if (!days[days.length - 1].currentMonth) {
    return currentMonth === 11 ? 0 : currentMonth + 1;
  }

  return currentMonth;
};

export const getFallbackYear = (
  days: DayOfMonth[],
  currentYear: number,
  fallbackMonth: number,
) => {
  if (!days[0].currentMonth) {
    return fallbackMonth === 0 ? currentYear - 1 : currentYear;
  }

  if (!days[days.length - 1].currentMonth) {
    return fallbackMonth === 11 ? currentYear + 1 : currentYear;
  }

  return currentYear;
};
