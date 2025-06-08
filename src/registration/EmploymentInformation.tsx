import { RegistrationSectionHeader } from "./RegistrationSectionHeader.tsx";
import { EmploymentData } from "./EmploymentData.tsx";
import * as React from "react";
import type { RegistrationData } from "../types/authentication.ts";

export const EmploymentInformation: React.FC<{
  registrationData: RegistrationData;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
}> = ({ registrationData, setRegistrationData }) => {
  return (
    <div>
      <RegistrationSectionHeader
        header="Employment Information"
        subheader="Data related to the employment"
      />
      <EmploymentData
        registrationData={registrationData}
        setRegistrationData={setRegistrationData}
      />
    </div>
  );
};
