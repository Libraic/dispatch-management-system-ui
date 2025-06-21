import type { YearData } from "../types/global.ts";

export const LAST_ADMITTABLE_BIRTH_YEAR = 2007;
export const DEFAULT_BIRTH_DATE: YearData = {
  day: 1,
  month: 1,
  year: LAST_ADMITTABLE_BIRTH_YEAR,
};
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getAvailableYears = (lastYear: number): number[] => {
  const availableYears = [];
  for (let i = 0; i < 50; ++i) {
    availableYears.push(lastYear - i);
  }

  return availableYears;
};

export const convertDateToLittleEndian = (date: YearData) => {
  const day = date.day < 10 ? `0${date.day}` : date.day;
  const month = date.month < 10 ? `0${date.month}` : date.month;
  return `${day}-${month}-${date.year}`;
};
