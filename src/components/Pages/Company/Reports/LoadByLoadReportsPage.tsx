import { ReportContainer } from "../../../Common/Reports/ReportContainer.tsx";
import { ReportTableContainer } from "../../../Common/Reports/ReportTableContainer.tsx";
import { ReportTable } from "../../../Common/Reports/ReportTable.tsx";
import { ReportTableMenu } from "../../../Common/Reports/ReportTableMenu.tsx";
import { useState } from "react";
import {
  DEFAULT_DATE_LOCALE,
  MONTHS,
} from "../../../../constants/date/date-constants.ts";
import { SelectForm } from "../../../Common/Selector/SelectForm.tsx";
import { formatDate } from "../../../../utils/date/date-utils.ts";
import { DOT } from "../../../../constants/common/global-constants.ts";
import {
  BACKGROUND_BLUE_GREY_COLOR,
  BACKGROUND_PALE_BLUE,
  OUTLINE_PALE_BLUE,
  TEXT_SOLID_GRAY,
} from "../../../../tailwind/tailwind-colors-vars.ts";

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

export const LoadByLoadReportsPage = () => {
  const [currentMonth, setCurrentMonth] = useState<string>(
    new Date().toLocaleString(DEFAULT_DATE_LOCALE, { month: "long" }),
  );
  const days = getDateStringsOfMonth(currentMonth);
  const data = [
    "Bejani Tsirdava",
    "Lane",
    "Miles",
    "Price",
    "$/Mile",
    "Signature",
    "Week Gross",
    "Miles/Week",
    "Week $/Mile",
  ];

  return (
    <ReportContainer>
      <ReportTableContainer>
        <ReportTableMenu>
          <SelectForm
            initialValue={currentMonth}
            data={Object.keys(MONTHS)}
            setElement={setCurrentMonth}
          />
        </ReportTableMenu>
        <ReportTable>
          <thead>
            <tr>
              <th></th>
              <th className="w-[8rem]"></th>
              {days.map((day, index) => (
                <th
                  key={`${index}-${day}`}
                  className={`w-[8rem] text-center p-2 ${BACKGROUND_PALE_BLUE} font-plus-jakarta-sans font-thin ${TEXT_SOLID_GRAY} text-[0.85rem]`}
                >
                  <p>{day}</p>
                </th>
              ))}
            </tr>
          </thead>

          <tbody
            className={`font-roboto font-light ${BACKGROUND_BLUE_GREY_COLOR}`}
          >
            {data.map((info, index) => (
              <tr key={`${index}-${info}`}>
                {index === 0 && (
                  <td
                    rowSpan={data.length}
                    className={`p-3 outline-2 -outline-offset-1 ${OUTLINE_PALE_BLUE} sticky left-0 z-100`}
                  >
                    <p
                      className="flex items-center justify-center text-center text-[1rem] w-[1rem]"
                      style={{
                        transform: "rotate(-90deg)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {data[0]}
                    </p>
                  </td>
                )}
                {index > 0 && (
                  <td
                    className={`p-[0.55rem] outline-2 -outline-offset-1 ${OUTLINE_PALE_BLUE} font-normal sticky left-[2.5rem]`}
                  >
                    <p className="text-[0.9rem]">{info}</p>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </ReportTable>
      </ReportTableContainer>
    </ReportContainer>
  );
};
