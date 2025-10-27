import * as React from "react";
import { useContext } from "react";
import type { WorkloadRegistrationData } from "../../../../../../types/internal/user/user-registration-types.ts";
import { UserRegistrationContext } from "../../../../../../context/UserRegistrationContext";
import { LiveSearchInputForm } from "../../../../LiveSearch/LiveSearchInputForm";
import {
  alterWorkloadCommission,
  alterWorkloads,
  cleanWorkload,
  deleteWorkload,
} from "../../../../../../utils/user/user-registration-utils.ts";
import type { Renderable } from "../../../../../../types/internal/classes/Renderable.ts";
import { InputForm } from "../../../../../atoms/InputForm/InputForm";
import { Delete } from "../../../../../atoms/Button/Delete";
import { Company } from "../../../../../../types/internal/classes/Company.ts";
import { LiveSearchKey } from "../../../../../../types/internal/live-search/live-search-data.ts";

export const UserWorkload: React.FC<{
  workloadData: WorkloadRegistrationData;
  errorMessage: string;
}> = ({ workloadData, errorMessage }) => {
  const context = useContext(UserRegistrationContext)!;
  const setRegistrationData = context.setRegistrationData;
  return (
    <div
      key={workloadData.workloadId}
      className="flex flex-row items-center gap-x-10"
    >
      <LiveSearchInputForm
        label="Company"
        placeholder="Microsoft"
        value={workloadData.companyName}
        searchKey={LiveSearchKey.COMPANY}
        errorText={errorMessage}
        saveData={(companyData: Renderable) =>
          alterWorkloads(setRegistrationData, companyData, workloadData)
        }
        cleanData={() => cleanWorkload(setRegistrationData, workloadData)}
        constructor={Company}
      />
      <InputForm
        label="Commission (%)"
        placeholder="5.5"
        type="number"
        name="Commission"
        inputFieldValue={workloadData.commission.toString()}
        errorMessage=""
        saveInputData={(value: string) =>
          alterWorkloadCommission(setRegistrationData, workloadData, value)
        }
      />
      <Delete
        onClick={() => deleteWorkload(setRegistrationData, workloadData)}
      />
    </div>
  );
};
