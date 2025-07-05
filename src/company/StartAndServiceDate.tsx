import { DatePick } from "../global/DatePick.tsx";
import * as React from "react";
import { useDateObject } from "../hooks/useDateObject.ts";
import { usePrepopulateDate } from "../hooks/usePrepopulateDate.ts";
import { getCurrentYearData } from "../utils/date.ts";
import type { CompanyRegistrationData } from "../types/registration/company/company-registration-data.ts";

export const StartAndServiceDate: React.FC<{
  setCompanyRegistrationData: React.Dispatch<
    React.SetStateAction<CompanyRegistrationData>
  >;
}> = ({ setCompanyRegistrationData }) => {
  const currentYearData = getCurrentYearData();
  const currentDateObject = useDateObject(
    currentYearData.day,
    currentYearData.month,
    currentYearData.year,
  );
  usePrepopulateDate(
    setCompanyRegistrationData,
    currentDateObject,
    "serviceDate",
  );
  usePrepopulateDate(
    setCompanyRegistrationData,
    currentDateObject,
    "startDate",
  );

  return (
    <div className="flex flex-row gap-x-10 items-center">
      <DatePick label="Service Date" date={currentDateObject} />
      <DatePick label="Start Date" date={currentDateObject} />
    </div>
  );
};
