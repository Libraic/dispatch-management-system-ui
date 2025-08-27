import { PageHeader } from "../../../../global/PageHeader.tsx";
import { EmploymentDate } from "./EmploymentDate.tsx";
import { EmployeeStatus } from "./EmployeeStatus.tsx";

export const EmploymentInformation = () => {
  return (
    <div>
      <PageHeader
        header="Employment Information"
        subheader="Data related to the employment"
      />
      <div className="flex flex-col gap-y-15">
        <EmploymentDate />
        <EmployeeStatus />
      </div>
    </div>
  );
};
