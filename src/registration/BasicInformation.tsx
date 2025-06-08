import type {
  RegistrationData,
  RegistrationDataError,
} from "../types/authentication.ts";
import * as React from "react";
import { RegistrationSectionHeader } from "./RegistrationSectionHeader.tsx";
import { AccountData } from "./AccountData.tsx";
import { BirthData } from "./BirthData.tsx";

export const BasicInformation: React.FC<{
  registrationData: RegistrationData;
  registrationDataError: RegistrationDataError;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
}> = ({ registrationData, registrationDataError, setRegistrationData }) => {
  return (
    <>
      <RegistrationSectionHeader
        header="Basic Information"
        subheader="The personal data of the employee"
      />
      <AccountData
        registrationData={registrationData}
        registrationDataError={registrationDataError}
        setRegistrationData={setRegistrationData}
      />
      <BirthData
        registrationData={registrationData}
        setRegistrationData={setRegistrationData}
      />
    </>
  );
};
