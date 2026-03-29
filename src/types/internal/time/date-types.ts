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

export type DayOfMonth = {
  day: number;
  currentMonth: boolean;
  weekNumber?: number;
};
