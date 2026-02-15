import * as React from "react";
import { UserRegistrationContext } from "../../../../../context/UserRegistrationContext.ts";
import { useDateObject } from "../../../../../hooks/useDateObject.ts";
import { usePrepopulateDate } from "../../../../../hooks/usePrepopulateDate.ts";
import { DateSelectorOld } from "../../../../Common/Selector/DateSelectorOld.tsx";

export const UserEmploymentDate = () => {
  const context = React.useContext(UserRegistrationContext)!;
  const { registrationData, setRegistrationData } = context;
  const dateObject = useDateObject(
    registrationData.employmentDate.day,
    registrationData.employmentDate.month,
    registrationData.employmentDate.year,
  );
  usePrepopulateDate(setRegistrationData, dateObject, "employmentDate");

  return (
    <div className="w-fit">
      <DateSelectorOld label="Employment Date" date={dateObject} />
    </div>
  );
};
