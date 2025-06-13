import { RegistrationSectionHeader } from "../../RegistrationSectionHeader.tsx";
import { EmploymentDate } from "./EmploymentDate.tsx";
import * as React from "react";
import { EmployeeStatus } from "./EmployeeStatus.tsx";

export const EmploymentInformation = () => {
  return (
    <div>
      <RegistrationSectionHeader
        header="Employment Information"
        subheader="Data related to the employment"
      />
      <EmploymentDate />
      <EmployeeStatus />
    </div>
  );
};
