import { RegistrationSectionHeader } from "../../RegistrationSectionHeader.tsx";
import { EmploymentDate } from "./EmploymentDate.tsx";
import * as React from "react";
import type { RegistrationData } from "../../../types/authentication.ts";
import { EmployeeStatus } from "./EmployeeStatus.tsx";

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
      <EmploymentDate
        registrationData={registrationData}
        setRegistrationData={setRegistrationData}
      />
      <EmployeeStatus
        registrationData={registrationData}
        setRegistrationData={setRegistrationData}
      />
    </div>
  );
};
