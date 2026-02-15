import { usePrepopulateDate } from "../../../../../hooks/usePrepopulateDate.ts";
import * as React from "react";
import { DateSelectorOld } from "../../../../Common/Selector/DateSelectorOld.tsx";
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

  return <DateSelectorOld label="Birth Date" date={dateObject} />;
};
