import type { YearData } from "../../types/global.ts";
import { BLANK_SPACE, DOT } from "../constants/global-constants.ts";

export const LAST_ADMITTABLE_BIRTH_YEAR = 2007;
export const DEFAULT_BIRTH_DATE: YearData = {
  day: 1,
  month: 1,
  year: LAST_ADMITTABLE_BIRTH_YEAR,
};

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const CURRENT_YEAR = new Date().getFullYear();

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
      result.push(`${WEEKDAYS[i]} ${month}.${day}.${year}`);
    }
    results.push(result);
  }

  return results;
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

export const convertMileageDayToLittleEndianDate = (day: string) => {
  const date = day.split(BLANK_SPACE)[1];
  const monthAndDay = date.split(DOT);
  return `${monthAndDay[1]}-${monthAndDay[0]}-${CURRENT_YEAR}`;
};
