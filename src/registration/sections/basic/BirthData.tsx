import { SectionDivision } from "../SectionDivision.tsx";
import { DateForm } from "../../../global/DateForm.tsx";
import * as React from "react";
import { useDateObject } from "../../../hooks/useDateObject.ts";
import { LAST_ADMITTABLE_BIRTH_YEAR } from "../../../utils/global-constants.ts";
import { usePrepopulateDate } from "../../../hooks/usePrepopulateDate.ts";
import { RegistrationContext } from "../../../context/RegistrationContext.ts";

export const BirthData = () => {
  const context = React.useContext(RegistrationContext)!;
  const { registrationData, setRegistrationData } = context;
  const [isBirthDataExpanded, setIsBirthDataExpanded] = React.useState(true);
  const dateObject = useDateObject(
    registrationData.birthDate.day,
    registrationData.birthDate.month,
    registrationData.birthDate.year,
  );
  usePrepopulateDate(setRegistrationData, dateObject, "birthDate");

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
