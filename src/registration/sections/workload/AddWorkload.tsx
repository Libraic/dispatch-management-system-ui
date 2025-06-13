import { useContext } from "react";
import { WorkloadItem } from "./WorkloadItem.tsx";
import { Add } from "../../../button/Add.tsx";
import { RegistrationContext } from "../../../context/RegistrationContext.ts";

export const AddWorkload = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error("Context is undefined");
  }
  const companies = context.companies;
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row items-center gap-x-3">
        <Add
          onClick={() =>
            context.setRegistrationData((prev) => ({
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
        {context.registrationData.workload.map((item) => (
          <WorkloadItem item={item} />
        ))}
      </div>
    </div>
  );
};
