import * as React from "react";
import { useEffect } from "react";
import type { DateObject } from "../types/internal/time/date-types.ts";

export const usePrepopulateDate = <T>(
  setterFunction: React.Dispatch<React.SetStateAction<T>>,
  dateObject: DateObject,
  field: keyof T,
) => {
  useEffect(() => {
    setterFunction((prev) => ({
      ...prev,
      [field]: {
        day: dateObject.day,
        month: dateObject.month,
        year: dateObject.year,
      },
    }));
  }, [
    dateObject.day,
    dateObject.month,
    dateObject.year,
    field,
    setterFunction,
  ]);
};
