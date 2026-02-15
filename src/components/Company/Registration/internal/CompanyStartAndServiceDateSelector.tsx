import { DateSelectorOld } from "../../../Common/Selector/DateSelectorOld.tsx";
import { useContext } from "react";
import { useDateObject } from "../../../../hooks/useDateObject.ts";
import { usePrepopulateDate } from "../../../../hooks/usePrepopulateDate.ts";
import { getCurrentYearData } from "../../../../utils/global/date-utils.ts";
import { CompanyRegistrationContext } from "../../../../context/CompanyRegistrationContext.ts";

export const CompanyStartAndServiceDateSelector = () => {
  const setCompanyRegistrationData = useContext(
    CompanyRegistrationContext,
  )!.setRegistrationData;
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
      <DateSelectorOld label="Service Date" date={currentDateObject} />
      <DateSelectorOld label="Start Date" date={currentDateObject} />
    </div>
  );
};
