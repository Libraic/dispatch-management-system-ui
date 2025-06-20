import { useContext } from "react";
import { WorkloadItem } from "./WorkloadItem.tsx";
import { Add } from "../../../button/Add.tsx";
import { RegistrationContext } from "../../../context/RegistrationContext.ts";
import { prepopulateWorkload } from "../../../utils/registration-utils.ts";

export const AddWorkload = () => {
  const context = useContext(RegistrationContext)!;
  const companies = context.companies;
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row items-center gap-x-3">
        <Add
          onClick={() =>
            prepopulateWorkload(context.setRegistrationData, companies[0].uuid)
          }
        />
        <p className="font-roboto-400">Add Workload</p>
      </div>
      <div className="flex flex-col gap-y-15">
        {context.registrationData.workloads.map((workloadData) => (
          <WorkloadItem workloadData={workloadData} />
        ))}
      </div>
    </div>
  );
};
