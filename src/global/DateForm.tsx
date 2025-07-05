import * as React from "react";
import { getAvailableYears, MONTHS } from "../utils/date.ts";
import { SelectForm } from "./SelectForm.tsx";
import type { DateObject } from "../types/global.ts";

export const DateForm: React.FC<{
  dateObject: DateObject;
  endingYear: number;
}> = ({ dateObject, endingYear }) => {
  return (
    <div className="flex flex-row gap-x-8 mb-5 items-center">
      <SelectForm
        label="Year"
        initialValue={dateObject.year}
        data={getAvailableYears(endingYear)}
        setElement={(year: string) => dateObject.setYear(parseInt(year))}
      />
      <SelectForm
        label="Month"
        initialValue={MONTHS[dateObject.month - 1]}
        data={MONTHS}
        setElement={(month: string) => {
          dateObject.setMonth(MONTHS.indexOf(month) + 1);
        }}
      />
      <SelectForm
        label="Day"
        initialValue={dateObject.day}
        data={dateObject.days}
        setElement={(day: string) => dateObject.setDay(parseInt(day))}
      />
    </div>
  );
};
