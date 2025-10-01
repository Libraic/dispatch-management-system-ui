import type { YearData } from "../../types/global.ts";
import { TRAILING_ZERO } from "../constants/global-constants.ts";

export const LAST_ADMITTABLE_BIRTH_YEAR = 2007;
export const DEFAULT_BIRTH_DATE: YearData = {
  day: 1,
  month: 1,
  year: LAST_ADMITTABLE_BIRTH_YEAR,
};

export const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

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

  for (let j = 0; j < 3; ++j) {
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

  return [result, ...results];
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

/**
 * Calculates a date in ISO 8601 format (YYYY-MM-DD) based on a specified start date, week offset, and day offset.
 *
 * @param {Date} monday - The starting date, typically representing the first day of a week (e.g., Monday).
 * @param {number} weekIndex - The number of weeks to offset from the starting date. Can be positive or negative, depending
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
