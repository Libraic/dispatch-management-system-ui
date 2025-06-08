import { MONTHS } from "../utils/global-constants.ts";
import * as React from "react";
import { getAvailableYears } from "../utils/util-functions.ts";
import { SelectForm } from "./SelectForm.tsx";
import type { DateObject } from "../types/global.ts";

export const DateForm: React.FC<{
  dateObject: DateObject;
  endingYear: number;
}> = ({ dateObject, endingYear }) => {
  return (
    <div className="flex flex-row gap-x-10 mb-5">
      <SelectForm
        label="Year"
        formWidth="w-[5rem]"
        initialValue={dateObject.year}
        data={getAvailableYears(endingYear)}
        setElement={(year: string) => dateObject.setYear(parseInt(year))}
      />
      <SelectForm
        label="Month"
        formWidth="w-[7rem]"
        initialValue={dateObject.month}
        data={MONTHS}
        setElement={(month: string) => dateObject.setMonth(parseInt(month))}
      />
      <SelectForm
        label="Day"
        formWidth="w-[5rem]"
        initialValue={dateObject.day}
        data={dateObject.days}
        setElement={(day: string) => dateObject.setDay(parseInt(day))}
      />
    </div>
  );
};
