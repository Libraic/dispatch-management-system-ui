import { usePrepopulateDate } from "../../../../../hooks/usePrepopulateDate.ts";
import * as React from "react";
import { DateSelector } from "../../../../Common/Selector/DateSelector.tsx";
import { useDateObject } from "../../../../../hooks/useDateObject.ts";
import { UserRegistrationContext } from "../../../../../context/UserRegistrationContext.ts";

export const UserBirthData = () => {
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
