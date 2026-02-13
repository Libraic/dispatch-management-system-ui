import {
  BACKGROUND_PALE_BLUE,
  TEXT_SOLID_GRAY,
} from "../../../../tailwind/tailwind-colors-vars.ts";
import React from "react";
import {
  DEFAULT_DATE_LOCALE,
  MONTHS,
} from "../../../../constants/date/date-constants.ts";
import { formatDate } from "../../../../utils/date/date-utils.ts";
import { DOT } from "../../../../constants/common/global-constants.ts";
import { SYSTEM_FONT_THIN } from "../../../../tailwind/tailwind-font-vars.ts";

const getDisplayDate = (date: Date) => {
  const formattedDate = formatDate(date);
  const tokens = formattedDate.replace(/-/g, DOT).split(DOT);
  const dayAndMonth = tokens[0] + DOT + tokens[1];
  const weekday = date.toLocaleString(DEFAULT_DATE_LOCALE, { weekday: "long" });
  return `${dayAndMonth} ${weekday.substring(0, 3)}`;
};

const getDateStringsOfMonth = (monthName: string) => {
  const year = new Date().getFullYear();
  const month = MONTHS[monthName] - 1;
  const lastDay = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: lastDay }, (_, i) =>
    getDisplayDate(new Date(year, month, i + 1)),
  );
};

export const LoadByLoadTableHeader: React.FC<{ currentMonth: string }> = ({
  currentMonth,
}) => {
  const days = getDateStringsOfMonth(currentMonth);
  return (
    <thead>
      <tr>
        <th></th>
        <th className="w-[8rem]"></th>
        {days.map((day, index) => (
          <th
            key={`${index}-${day}`}
            className={`w-[8rem] text-center p-2 ${BACKGROUND_PALE_BLUE} ${SYSTEM_FONT_THIN} ${TEXT_SOLID_GRAY} text-[0.85rem]`}
          >
            <p>{day}</p>
          </th>
        ))}
      </tr>
    </thead>
  );
};
