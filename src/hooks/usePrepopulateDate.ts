import * as React from "react";
import { useEffect } from "react";
import type { DateObject } from "../types/global.ts";
import type { RegistrationData } from "../types/registration/registration-data.ts";

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
