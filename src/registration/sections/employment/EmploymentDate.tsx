import { SectionDivision } from "../SectionDivision.tsx";
import { DateForm } from "../../../global/DateForm.tsx";
import { useState } from "react";
import { useDateObject } from "../../../hooks/useDateObject.ts";
import { usePrepopulateDate } from "../../../hooks/usePrepopulateDate.ts";
import { UserRegistrationContext } from "../../../context/UserRegistrationContext.ts";
import * as React from "react";

export const EmploymentDate = () => {
  const context = React.useContext(UserRegistrationContext)!;
  const { registrationData, setRegistrationData } = context;
  const [isEmploymentDataExpanded, setIsEmploymentDataExpanded] =
    useState(true);
  const dateObject = useDateObject(
    registrationData.employmentDate.day,
    registrationData.employmentDate.month,
    registrationData.employmentDate.year,
  );
  usePrepopulateDate(setRegistrationData, dateObject, "employmentDate");

  return (
    <>
      <SectionDivision
        division="Employment Date"
        isExpanded={isEmploymentDataExpanded}
        setIsExpanded={setIsEmploymentDataExpanded}
      />
      {isEmploymentDataExpanded && (
        <div className="flex gap-x-10 mb-5">
          <DateForm
            dateObject={dateObject}
            endingYear={new Date().getFullYear()}
          />
        </div>
      )}
    </>
  );
};
