import { useEffect, useState } from "react";
import type { DateObject } from "../types/global.ts";

export const useDateObject = (
  defaultDay: number,
  defaultMonth: number,
  defaultYear: number,
): DateObject => {
  const [month, setMonth] = useState(defaultMonth);
  const [day, setDay] = useState(defaultDay);
  const [year, setYear] = useState(defaultYear);
  const [days, setDays] = useState<number[]>([]);
  useEffect(() => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const updatedDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setDays(updatedDays);
    if (day > daysInMonth) {
      setDay(1);
    }
  }, [day, month, year]);
  return {
    day,
    month,
    year,
    days,
    setDay,
    setMonth,
    setYear,
  };
};
