import { DateSelector } from "../../../molecules/Selector/DateSelector.tsx";
import * as React from "react";
import { useDateObject } from "../../../../hooks/useDateObject.ts";
import { usePrepopulateDate } from "../../../../hooks/usePrepopulateDate.ts";
import { getCurrentYearData } from "../../../../utils/date/date-utils.ts";
import type { CompanyRegistrationData } from "../../../../types/internal/company/company-registration-data.ts";

export const CompanyStartAndServiceDates: React.FC<{
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
      <DateSelector label="Service Date" date={currentDateObject} />
      <DateSelector label="Start Date" date={currentDateObject} />
    </div>
  );
};
