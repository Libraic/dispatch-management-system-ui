import * as React from "react";
import { UserRegistrationContext } from "../../../../../context/UserRegistrationContext.ts";
import { useDateObject } from "../../../../../hooks/useDateObject.ts";
import { usePrepopulateDate } from "../../../../../hooks/usePrepopulateDate.ts";
import { DateSelector } from "../../../../Common/Selector/DateSelector.tsx";

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
      <DateSelector label="Employment Date" date={dateObject} />
    </div>
  );
};
