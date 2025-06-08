import { SectionDivision } from "./SectionDivision.tsx";
import { DateForm } from "./DateForm.tsx";
import * as React from "react";
import { useEffect, useState } from "react";
import type { RegistrationData } from "../types/authentication.ts";
import { useDateObject } from "../hooks/useDateObject.ts";

export const EmploymentData: React.FC<{
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
  useEffect(() => {
    setRegistrationData((prev) => ({
      ...prev,
      employmentDate: {
        day: dateObject.day,
        month: dateObject.month,
        year: dateObject.year,
      },
    }));
  }, [dateObject.day, dateObject.month, dateObject.year, setRegistrationData]);

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
