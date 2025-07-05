import { InputForm } from "../../../global/InputForm.tsx";
import * as React from "react";
import { useContext } from "react";
import { Delete } from "../../../button/Delete.tsx";
import { UserRegistrationContext } from "../../../context/UserRegistrationContext.ts";
import type { WorkloadData } from "../../../types/registration/user/user-registration-data.ts";
import {
  alterWorkloadCommission,
  alterWorkloads,
  cleanWorkload,
  deleteWorkload,
} from "../../../utils/registration/user/user-registration.ts";
import { LiveSearchInputForm } from "../../../global/LiveSearchInputForm.tsx";
import { LiveSearchEndpoints } from "../../../types/forms.ts";
import type { CompanyData } from "../../../types/api/registration-api.ts";

export const WorkloadItem: React.FC<{
  workloadData: WorkloadData;
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
        endpoint={LiveSearchEndpoints.COMPANY}
        searchField="name"
        isMandatory={false}
        errorText={errorMessage}
        saveData={(companyData: CompanyData) =>
          alterWorkloads(setRegistrationData, companyData, workloadData)
        }
        cleanData={() => cleanWorkload(setRegistrationData, workloadData)}
        renderResult={(companyData: CompanyData) => companyData.name}
        getKey={(companyData: CompanyData) => companyData.uuid}
      />
      <InputForm
        label="Commission (%)"
        placeholder="5.5"
        type="number"
        name="Commission"
        inputFieldValue={workloadData.commission.toString()}
        isMandatory={false}
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
