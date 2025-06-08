import { SectionDivision } from "../SectionDivision.tsx";
import { DateForm } from "../../../global/DateForm.tsx";
import * as React from "react";
import { useEffect } from "react";
import type { RegistrationData } from "../../../types/authentication.ts";
import { useDateObject } from "../../../hooks/useDateObject.ts";
import { LAST_ADMITTABLE_BIRTH_YEAR } from "../../../utils/global-constants.ts";

export const BirthData: React.FC<{
  registrationData: RegistrationData;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
}> = ({ registrationData, setRegistrationData }) => {
  const [isBirthDataExpanded, setIsBirthDataExpanded] = React.useState(true);
  const dateObject = useDateObject(
    registrationData.birthDate.day,
    registrationData.birthDate.month,
    registrationData.birthDate.year,
  );
  useEffect(() => {
    setRegistrationData((prev) => ({
      ...prev,
      birthDate: {
        day: dateObject.day,
        month: dateObject.month,
        year: dateObject.year,
      },
    }));
  }, [dateObject.day, dateObject.month, dateObject.year, setRegistrationData]);

  return (
    <>
      <SectionDivision
        division="Birth Data"
        isExpanded={isBirthDataExpanded}
        setIsExpanded={setIsBirthDataExpanded}
      />
      {isBirthDataExpanded && (
        <div className="flex gap-x-11 mb-5">
          <DateForm
            dateObject={dateObject}
            endingYear={LAST_ADMITTABLE_BIRTH_YEAR}
          />
        </div>
      )}
    </>
  );
};
