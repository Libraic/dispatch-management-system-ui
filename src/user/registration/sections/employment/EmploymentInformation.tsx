import { PageHeader } from "../../../../global/PageHeader.tsx";
import { EmploymentDate } from "./EmploymentDate.tsx";
import { EmployeeStatus } from "./EmployeeStatus.tsx";
import { EMPLOYMENT_INFORMATION_HEADER } from "../../../../utils/constants/headers.ts";

export const EmploymentInformation = () => {
  return (
    <div>
      <PageHeader headerInfo={EMPLOYMENT_INFORMATION_HEADER} />
      <div className="flex flex-col gap-y-15">
        <EmploymentDate />
        <EmployeeStatus />
      </div>
    </div>
  );
};
