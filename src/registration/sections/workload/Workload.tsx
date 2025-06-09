import { RegistrationSectionHeader } from "../../RegistrationSectionHeader.tsx";
import { AddWorkload } from "./AddWorkload.tsx";
import * as React from "react";
import { useEffect, useState } from "react";
import type { RegistrationData } from "../../../types/authentication.ts";
import { fetchCompanies } from "../../../service/companyService.ts";
import type { CompanyData } from "../../../types/api-types.ts";

export const Workload: React.FC<{
  registrationData: RegistrationData;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
}> = ({ registrationData, setRegistrationData }) => {
  const [companies, setCompanies] = useState<CompanyData[]>([]);

  useEffect(() => {
    fetchCompanies()
      .then((data) => setCompanies(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <RegistrationSectionHeader
        header="Workload"
        subheader="The working area of the employee"
      />
      <AddWorkload
        registrationData={registrationData}
        setRegistrationData={setRegistrationData}
        companies={companies}
      />
    </div>
  );
};
