import * as React from "react";
import { useDateObject } from "../../../../hooks/useDateObject.ts";
import { usePrepopulateDate } from "../../../../hooks/usePrepopulateDate.ts";
import { UserRegistrationContext } from "../../../../context/UserRegistrationContext.ts";
import { DatePick } from "../../../../global/DatePick.tsx";

export const EmploymentDate = () => {
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
      <DatePick label="Employment Date" date={dateObject} />
    </div>
  );
};
