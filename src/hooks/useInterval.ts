import { useState } from "react";

export type IntervalData = {
  getStartDate: () => Date;
  getEndDate: () => Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
};

export const useInterval = (): IntervalData => {
  const currentYear = new Date().getFullYear();
  const [firstDay, setFirstDay] = useState(new Date(currentYear, 0, 1));
  const [lastDay, setLastDay] = useState(new Date(currentYear, 11, 31));

  return {
    getStartDate: () => firstDay,
    getEndDate: () => lastDay,
    setStartDate: (date: Date) => setFirstDay(date),
    setEndDate: (date: Date) => setLastDay(date),
  };
};
