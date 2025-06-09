import type { RegistrationData } from "../../../types/authentication.ts";
import * as React from "react";
import type { CompanyData } from "../../../types/api-types.ts";
import addWorkloadIcon from "../../../assets/add.svg";
import addWorkloadHoveredIcon from "../../../assets/add-hovered.svg";
import { WorkloadItem } from "./WorkloadItem.tsx";

export const AddWorkload: React.FC<{
  registrationData: RegistrationData;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  companies: CompanyData[];
}> = ({ registrationData, setRegistrationData, companies }) => {
  const [activeIcon, setActiveIcon] = React.useState(addWorkloadIcon);

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row items-center gap-x-3">
        <div className="w-6 h-6 flex items-center justify-center">
          <img
            className="w-full h-full transition-transform duration-200 ease-in-out hover:scale-110 cursor-pointer"
            src={activeIcon}
            alt="add-company-icon"
            onMouseEnter={() => setActiveIcon(addWorkloadHoveredIcon)}
            onMouseLeave={() => setActiveIcon(addWorkloadIcon)}
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
        </div>
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
