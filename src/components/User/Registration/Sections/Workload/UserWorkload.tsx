import * as React from "react";
import { useContext } from "react";
import type { WorkloadRegistrationData } from "../../../../../types/internal/user/user-registration-types.ts";
import { UserRegistrationContext } from "../../../../../context/UserRegistrationContext.ts";
import { LiveSearchInputForm } from "../../../../Common/LiveSearch/public/LiveSearchInputForm.tsx";
import {
  alterWorkloadCommission,
  alterWorkloads,
  cleanWorkload,
  deleteWorkload,
} from "../../../../../utils/user/user-registration-utils.ts";
import type { Renderable } from "../../../../../types/internal/classes/Renderable.ts";
import { TextualInputForm } from "../../../../Common/InputForm/public/TextualInputForm.tsx";
import { DeleteButton } from "../../../../Common/Button/DeleteButton.tsx";
import { Company } from "../../../../../types/internal/classes/Company.ts";
import { Entity } from "../../../../../types/api/common/api-query-types.ts";

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
        entityType={Entity.COMPANY}
        errorMessage={errorMessage}
        saveData={(companyData: Renderable) =>
          alterWorkloads(setRegistrationData, companyData, workloadData)
        }
        cleanData={() => cleanWorkload(setRegistrationData, workloadData)}
        constructor={Company}
      />
      <TextualInputForm
        label="Commission (%)"
        placeholder="5.5"
        inputFieldValue={workloadData.commission.toString()}
        errorMessage=""
        saveInputData={(value: string) =>
          alterWorkloadCommission(setRegistrationData, workloadData, value)
        }
      />
      <DeleteButton
        onClick={() => deleteWorkload(setRegistrationData, workloadData)}
      />
    </div>
  );
};
