import { SelectForm } from "../../../global/SelectForm.tsx";
import { InputForm } from "../../../global/InputForm.tsx";
import * as React from "react";
import { useContext } from "react";
import type { WorkloadData } from "../../../types/authentication.ts";
import { Delete } from "../../../button/Delete.tsx";
import { RegistrationContext } from "../../../context/RegistrationContext.ts";

export const WorkloadItem: React.FC<{
  item: WorkloadData;
}> = ({ item }) => {
  const context = useContext(RegistrationContext)!;
  const companies = context.companies;
  const pagination = context.pagination;
  return (
    <div key={item.workloadId} className="flex flex-row items-center gap-x-10">
      <SelectForm
        label="Company"
        formWidth="w-35"
        initialValue={
          companies.find((c) => c.uuid === item.companyId)?.name ?? ""
        }
        data={companies.map((company) => company.name)}
        pagination={pagination}
        setElement={(selectedName: string) => {
          const selectedCompany = companies.find(
            (c) => c.name === selectedName,
          );
          if (selectedCompany) {
            context.setRegistrationData((prev) => ({
              ...prev,
              workload: prev.workload.map((w) =>
                w.workloadId === item.workloadId
                  ? { ...w, companyId: selectedCompany.uuid }
                  : w,
              ),
            }));
          }
        }}
      />
      <InputForm
        label="Commission (%)"
        placeholder="5.5"
        type="number"
        name="Commission"
        inputFieldValue={item.commission.toString()}
        isMandatory={false}
        errorText=""
        saveData={(value: string) => {
          context.setRegistrationData((prev) => ({
            ...prev,
            workload: prev.workload.map((w) =>
              w.workloadId === item.workloadId
                ? { ...w, commission: parseFloat(value) }
                : w,
            ),
          }));
        }}
      />
      <Delete
        onClick={() =>
          context.setRegistrationData((prev) => ({
            ...prev,
            workload: prev.workload.filter(
              (w) => w.workloadId !== item.workloadId,
            ),
          }))
        }
      />
    </div>
  );
};
