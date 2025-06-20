import { SelectForm } from "../../../global/SelectForm.tsx";
import { InputForm } from "../../../global/InputForm.tsx";
import * as React from "react";
import { useContext } from "react";
import { Delete } from "../../../button/Delete.tsx";
import { RegistrationContext } from "../../../context/RegistrationContext.ts";
import type { WorkloadData } from "../../../types/registration/registration-data.ts";
import {
  alterWorkloadCommission,
  alterWorkloads,
  deleteWorkload,
} from "../../../utils/registration-utils.ts";

export const WorkloadItem: React.FC<{
  workloadData: WorkloadData;
}> = ({ workloadData }) => {
  const context = useContext(RegistrationContext)!;
  const companies = context.companies;
  const pagination = context.pagination;
  const setRegistrationData = context.setRegistrationData;
  return (
    <div
      key={workloadData.workloadId}
      className="flex flex-row items-center gap-x-10"
    >
      <SelectForm
        label="Company"
        formWidth="w-35"
        initialValue={
          companies.find((c) => c.uuid === workloadData.companyId)?.name ?? ""
        }
        data={companies.map((company) => company.name)}
        pagination={pagination}
        setElement={(selectedName: string) =>
          alterWorkloads(
            setRegistrationData,
            companies,
            workloadData,
            selectedName,
          )
        }
      />
      <InputForm
        label="Commission (%)"
        placeholder="5.5"
        type="number"
        name="Commission"
        inputFieldValue={workloadData.commission.toString()}
        isMandatory={false}
        errorText=""
        saveData={(value: string) =>
          alterWorkloadCommission(setRegistrationData, workloadData, value)
        }
      />
      <Delete
        onClick={() => deleteWorkload(setRegistrationData, workloadData)}
      />
    </div>
  );
};
