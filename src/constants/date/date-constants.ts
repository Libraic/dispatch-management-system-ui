import type { YearData } from "../../types/internal/date/date-types.ts";

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

export const MONTHS: Record<string, number> = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};
