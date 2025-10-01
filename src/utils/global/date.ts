import type { YearData } from "../../types/global.ts";

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

export const getWeekWithNames = (date: Date): string[][] => {
  const dayOfWeek = date.getDay() === 0 ? 6 : date.getDay() - 1;
  const monday = new Date(date);
  monday.setDate(monday.getDate() - dayOfWeek);
  const results: string[][] = [];

  for (let j = 0; j < 3; ++j) {
    const result: string[] = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() - 7 * j + i);
      const month = String(currentDay.getMonth() + 1).padStart(2, "0");
      const day = String(currentDay.getDate()).padStart(2, "0");
      const year = String(currentDay.getFullYear());
      result.push(`${year}-${month}-${day}`);
    }
    results.push(result);
  }

  const result: string[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(monday);
    currentDay.setDate(monday.getDate() + 7 + i);
    const month = String(currentDay.getMonth() + 1).padStart(2, "0");
    const day = String(currentDay.getDate()).padStart(2, "0");
    const year = String(currentDay.getFullYear());
    result.push(`${year}-${month}-${day}`);
  }
  return [result, ...results];
};

export const convertDateToLittleEndian = (date: YearData) => {
  const day = date.day < 10 ? `0${date.day}` : date.day;
  const month = date.month < 10 ? `0${date.month}` : date.month;
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
