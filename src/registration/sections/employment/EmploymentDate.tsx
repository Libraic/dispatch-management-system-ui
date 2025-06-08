import { SectionDivision } from "../SectionDivision.tsx";
import { DateForm } from "../../../global/DateForm.tsx";
import * as React from "react";
import { useState } from "react";
import type { RegistrationData } from "../../../types/authentication.ts";
import { useDateObject } from "../../../hooks/useDateObject.ts";
import { usePrepopulateDate } from "../../../hooks/usePrepopulateDate.ts";

export const EmploymentDate: React.FC<{
  registrationData: RegistrationData;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
}> = ({ registrationData, setRegistrationData }) => {
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
        division="Employment Data"
        isExpanded={isEmploymentDataExpanded}
        setIsExpanded={setIsEmploymentDataExpanded}
      />
      {isEmploymentDataExpanded && (
        <div className="flex gap-x-11 mb-5">
          <DateForm
            dateObject={dateObject}
            endingYear={new Date().getFullYear()}
          />
        </div>
      )}
    </>
  );
};
