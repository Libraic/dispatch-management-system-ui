import * as React from "react";
import { useDateObject } from "../../../../hooks/useDateObject.ts";
import { usePrepopulateDate } from "../../../../hooks/usePrepopulateDate.ts";
import { UserRegistrationContext } from "../../../../context/UserRegistrationContext.ts";
import { DateSelector } from "../../../../global/input-forms/DateSelector.tsx";

export const BirthData = () => {
  const context = React.useContext(UserRegistrationContext)!;
  const { registrationData, setRegistrationData } = context;
  const dateObject = useDateObject(
    registrationData.birthDate.day,
    registrationData.birthDate.month,
    registrationData.birthDate.year,
  );
  usePrepopulateDate(setRegistrationData, dateObject, "birthDate");

  return <DateSelector label="Birth Date" date={dateObject} />;
};
