import { UserRegistrationContext } from "../../../../../../context/UserRegistrationContext";
import { Add } from "../../../../../atoms/Button/Add";
import { prepopulateWorkload } from "../../../../../../utils/user/user-registration-utils.ts";
import { useContext } from "react";
import { getWorkloadCompanyErrorMessage } from "../../../../../../utils/user/user-registration-errors-utils.ts";
import { UserWorkload } from "./UserWorkload.tsx";

export const UserWorkloads = () => {
  const context = useContext(UserRegistrationContext)!;
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row items-center gap-x-3">
        <Add onClick={() => prepopulateWorkload(context.setRegistrationData)} />
        <p className="font-roboto-400">Add Workload</p>
      </div>
      <div className="flex flex-col gap-y-15">
        {context.registrationData.workloads.map((workloadData) => (
          <UserWorkload
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
