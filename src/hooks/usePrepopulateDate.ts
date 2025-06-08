import * as React from "react";
import { useEffect } from "react";
import type { RegistrationData } from "../types/authentication.ts";
import type { DateObject } from "../types/global.ts";

export const usePrepopulateDate = (
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>,
  dateObject: DateObject,
  field: keyof RegistrationData,
) => {
  useEffect(() => {
    setRegistrationData((prev) => ({
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
    setRegistrationData,
  ]);
};
