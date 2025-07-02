import type { ReactNode } from "react";

export type YearData = {
  day: number;
  month: number;
  year: number;
};

export type DateObject = {
  day: number;
  month: number;
  year: number;
  days: number[];
  setDay: (day: number) => void;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
};

export type Pagination = {
  getNextUrl: () => string | null;
  setNextUrl: (url: string | null) => void;
  shouldLoadNext: () => boolean;
  setLoadNext: (loadNext: boolean) => void;
};

export type SelectFormData<T extends ReactNode, D extends string | number> = {
  label: string;
  initialValue: D;
  data: T[];
  pagination?: Pagination;
  setElement: (value: string) => void;
};
