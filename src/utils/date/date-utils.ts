import { TRAILING_ZERO } from "../../constants/common/global-constants.ts";
import type {
  DayOfMonth,
  YearData,
} from "../../types/internal/date/date-types.ts";
import type { WeekIndexer } from "../../types/internal/calendar/calendar-types.ts";

/**
 * Generates a two-dimensional array representing dates for a week, along with adjacent weeks,
 * formatted as ISO strings. It includes the current week, the two preceding weeks, and the next week.
 *
 * @param {Date} date - The reference date from which the week is calculated.
 * @returns {string[][]} A 2D array of ISO-formatted date strings. Each subarray represents a week,
 * starting with the week following the reference week, the current week, and the two preceding weeks.
 */
export const getWeekWithNames = (date: Date): string[][] => {
  const dayOfWeek = date.getDay() === 0 ? 6 : date.getDay() - 1;
  const monday = new Date(date);
  monday.setDate(monday.getDate() - dayOfWeek);
  const results: string[][] = [];

  for (let j = 2; j >= 0; --j) {
    const result: string[] = [];
    for (let i = 0; i < 7; i++) {
      result.push(getDateInIsoFormat(monday, -j, i));
    }
    results.push(result);
  }

  const result: string[] = [];
  for (let i = 0; i < 7; i++) {
    result.push(getDateInIsoFormat(monday, 1, i));
  }

  return [...results, result];
};

export const convertDateToLittleEndian = (date: YearData) => {
  const day = date.day < 10 ? `${TRAILING_ZERO}${date.day}` : date.day;
  const month = date.month < 10 ? `${TRAILING_ZERO}${date.month}` : date.month;
  return `${day}-${month}-${date.year}`;
};

export const getCurrentYearData = (): YearData => {
  const date = new Date();
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};

export const getListOfNYears = (n: number): string[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: n }, (_, i) => (currentYear - i).toString());
};

export const getDaysOfMonthGroupedByWeek = (
  month: number,
  year: number,
): WeekIndexer => {
  const result: WeekIndexer = {
    0: new Array(7).fill(undefined),
  };
  const daysInMonth = new Date(year, month, 0).getDate();
  let currentWeek = 0;
  let currentDayOfWeek = new Date(year, month - 1, 1).getDay();
  for (let day = 1; day <= daysInMonth; day++) {
    const index = currentDayOfWeek == 0 ? 6 : currentDayOfWeek - 1;
    result[currentWeek][index] = { day: day, currentMonth: true };
    if (currentDayOfWeek === 0 && day !== daysInMonth) {
      // If the first day is undefined, then it means we have days in the current week
      // that belong to the previous month. We need to fill the last week with days from the previous month.
      // We perform this check only for the first week, as we know for sure the next weeks (except the last one)
      // will definitely have days from the current month.
      if (currentWeek === 0 && result[currentWeek][0] === undefined) {
        backfillDates(result[currentWeek], month, year);
      }
      currentWeek++;
      result[currentWeek] = new Array(7).fill(undefined);
    }
    currentDayOfWeek = (currentDayOfWeek + 1) % 7;
  }

  const lastWeek = result[currentWeek];
  // If the last day is undefined, then it means we have days in the current week
  // that belong to the next month. We need to fill the last week with days from the next month.
  if (lastWeek[6] === undefined) {
    frontFillDates(lastWeek, month, year);
  }

  return result;
};

/**
 * Populates the undefined days in the provided array with dates from the previous month.
 * The "backfill" process assigns day numbers starting from the last day of the previous month.
 * These backfilled days are marked as not belonging to the current month.
 *
 * @param {DayOfMonth[]} days - The array of days to be processed, where some entries may be undefined.
 * @param {number} month - The month for which the backfill is being performed (1-indexed, where 1 = January, 12 = December).
 * @param {number} year - The year corresponding to the given month.
 */
const backfillDates = (days: DayOfMonth[], month: number, year: number) => {
  let backfillStartIndex = getFirstUndefinedDayDownwards(days);
  let dayOfMonth = getDateByMonthAndYear(month, year, 0).getDate();
  while (backfillStartIndex >= 0) {
    days[backfillStartIndex] = {
      day: dayOfMonth,
      currentMonth: false,
    };
    --backfillStartIndex;
    --dayOfMonth;
  }
};

/**
 * Populates the undefined days in the provided array with dates from the next month.
 * The "frontfill" process assigns day numbers starting from the first day of the next month.
 * These front-filled days are marked as not belonging to the current month.
 *
 * @param {DayOfMonth[]} days - The array of days to be processed, where some entries may be undefined.
 * @param {number} month - The month for which the backfill is being performed (1-indexed, where 1 = January, 12 = December).
 * @param {number} year - The year corresponding to the given month.
 */
const frontFillDates = (days: DayOfMonth[], month: number, year: number) => {
  let frontFillStartIndex = getFirstUndefinedDayUpwards(days);
  let idx = 1;
  while (frontFillStartIndex < 7) {
    const date = getDateByMonthAndYear(month, year, idx);
    days[frontFillStartIndex] = {
      day: date.getDate(),
      currentMonth: false,
    };
    ++frontFillStartIndex;
    ++idx;
  }
};

const getDateByMonthAndYear = (
  currentMonth: number,
  currentYear: number,
  day: number,
) => {
  if (currentMonth === 1) {
    return new Date(currentYear - 1, 11, day);
  }

  if (currentMonth === 12) {
    return new Date(currentYear + 1, 0, day);
  }

  return new Date(currentYear, currentMonth - 1, day);
};

const getFirstUndefinedDayDownwards = (days: DayOfMonth[]) => {
  for (let i = days.length - 1; i >= 0; --i) {
    if (days[i] === undefined) {
      return i;
    }
  }

  return -1;
};

const getFirstUndefinedDayUpwards = (days: DayOfMonth[]) => {
  for (let i = 0; i < days.length; ++i) {
    if (days[i] === undefined) {
      return i;
    }
  }

  return -1;
};

/**
 * Calculates a date in ISO 8601 format (YYYY-MM-DD) based on a specified start date, week offset, and day offset.
 *
 * @param {Date} monday - The starting date, typically representing the first day of a week (e.g., Monday).
 * @param {number} weekIndex - The number of weeks to offset from the starting date. Can be positive or negative, depending on
 * if you want it to be a future week (+) or a previous week (-).
 * @param {number} dayIndex - The number of days to offset from the start of the calculated week. Typically ranges from 0 to 6.
 * @returns {string} The calculated date in ISO 8601 format (YYYY-MM-DD).
 */
const getDateInIsoFormat = (
  monday: Date,
  weekIndex: number,
  dayIndex: number,
): string => {
  const currentDay = new Date(monday);
  currentDay.setDate(monday.getDate() + 7 * weekIndex + dayIndex);
  const month = String(currentDay.getMonth() + 1).padStart(2, TRAILING_ZERO);
  const day = String(currentDay.getDate()).padStart(2, TRAILING_ZERO);
  const year = String(currentDay.getFullYear());
  return `${year}-${month}-${day}`;
};
