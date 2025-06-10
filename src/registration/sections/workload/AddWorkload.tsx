import type { RegistrationData } from "../../../types/authentication.ts";
import * as React from "react";
import type { CompanyData } from "../../../types/api-types.ts";
import { WorkloadItem } from "./WorkloadItem.tsx";
import { Add } from "../../../button/Add.tsx";

export const AddWorkload: React.FC<{
  registrationData: RegistrationData;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  companies: CompanyData[];
}> = ({ registrationData, setRegistrationData, companies }) => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row items-center gap-x-3">
        <Add
          onClick={() =>
            setRegistrationData((prev) => ({
              ...prev,
              workload: [
                ...prev.workload,
                {
                  workloadId: Date.now().toString(),
                  companyId: companies[0].uuid,
                  commission: 0.0,
                },
              ],
            }))
          }
        />
        <p className="font-roboto-400">Add Workload</p>
      </div>

      <div className="flex flex-col gap-y-15">
        {registrationData.workload.map((item) => (
          <WorkloadItem
            setRegistrationData={setRegistrationData}
            item={item}
            companies={companies}
          />
        ))}
      </div>
    </div>
  );
};
