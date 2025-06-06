import { MONTHS } from "../utils/global-constants.ts";
import { useEffect, useState } from "react";
import { getAvailableYears } from "../utils/util-functions.ts";
import { inputFormLabelStyle, inputFormStyle } from "../utils/tailwind.ts";

export const BirthDateForm = () => {
  const [month, setMonth] = useState(1);
  const [days, setDays] = useState<number[]>([]);
  const [day, setDay] = useState(1);
  const [year, setYear] = useState(2007);

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
      <div>
        <p className={inputFormLabelStyle}>Year</p>
        <select
          className={`${inputFormStyle} w-[5rem]`}
          onChange={(e) => setYear(parseInt(e.target.value))}
        >
          {getAvailableYears(2007).map((year, index) => (
            <option key={index} value={index + 1}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className={inputFormLabelStyle}>Month</p>
        <select
          className={`${inputFormStyle} w-[5rem]`}
          onChange={(e) => setMonth(parseInt(e.target.value))}
        >
          {MONTHS.map((name, index) => (
            <option key={index} value={index + 1}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className={inputFormLabelStyle}>Day</p>
        <select className={`${inputFormStyle} w-[3rem]`}>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
