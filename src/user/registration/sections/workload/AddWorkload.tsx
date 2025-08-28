import { useContext } from "react";
import { WorkloadItem } from "./WorkloadItem.tsx";
import { Add } from "../../../../button/Add.tsx";
import { UserRegistrationContext } from "../../../../context/UserRegistrationContext.ts";
import { prepopulateWorkload } from "../../../../utils/user/user-registration.ts";
import { getWorkloadCompanyErrorMessage } from "../../../../utils/user/user-registration-errors.ts";

export const AddWorkload = () => {
  const context = useContext(UserRegistrationContext)!;
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row items-center gap-x-3">
        <Add onClick={() => prepopulateWorkload(context.setRegistrationData)} />
        <p className="font-roboto-400">Add Workload</p>
      </div>
      <div className="flex flex-col gap-y-15">
        {context.registrationData.workloads.map((workloadData) => (
          <WorkloadItem
            workloadData={workloadData}
            errorMessage={getWorkloadCompanyErrorMessage(
              context.registrationDataError,
              workloadData,
            )}
          />
        ))}
      </div>
    </div>
  );
};
