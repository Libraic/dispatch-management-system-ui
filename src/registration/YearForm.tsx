import { MONTHS } from "../utils/global-constants.ts";
import { useEffect, useState } from "react";
import { getAvailableYears } from "../utils/util-functions.ts";
import { SelectForm } from "./SelectForm.tsx";
import * as React from "react";

export const YearForm: React.FC<{ endingYear: number }> = ({
  endingYear,
}) => {
  const [month, setMonth] = useState(1);
  const [days, setDays] = useState<number[]>([]);
  const [day, setDay] = useState(1);
  const [year, setYear] = useState(endingYear);

  useEffect(() => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const updatedDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setDays(updatedDays);
    if (day > daysInMonth) {
      setDay(1);
    }
  }, [year, month, day]);

  return (
    <div className="flex flex-row gap-x-10 mb-5">
      <SelectForm
        label="Month"
        formWidth="w-[5rem]"
        data={getAvailableYears(endingYear)}
        setElement={setYear}
      />
      <SelectForm
        label="Month"
        formWidth="w-[5rem]"
        data={MONTHS}
        setElement={setMonth}
      />
      <SelectForm
        label="Day"
        formWidth="w-[5rem]"
        data={days}
        setElement={setDay}
      />
    </div>
  );
};
