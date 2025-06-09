import { SelectForm } from "../../../global/SelectForm.tsx";
import { InputForm } from "../../../global/InputForm.tsx";
import removeWorkloadFocused from "../../../assets/remove-focused.svg";
import removeWorkloadUnfocused from "../../../assets/remove-unfocused.svg";
import * as React from "react";
import type {
  RegistrationData,
  WorkloadData,
} from "../../../types/authentication.ts";
import type { CompanyData } from "../../../types/api-types.ts";

export const WorkloadItem: React.FC<{
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  item: WorkloadData;
  companies: CompanyData[];
}> = ({ setRegistrationData, item, companies }) => {
  const [removeActiveIcon, setRemoveActiveIcon] = React.useState(
    removeWorkloadUnfocused,
  );

  return (
    <div key={item.workloadId} className="flex flex-row items-center gap-x-10">
      <SelectForm
        label="Company"
        formWidth="w-35"
        initialValue={
          companies.find((c) => c.uuid === item.companyId)?.name ?? ""
        }
        data={companies.map((company) => company.name)}
        setElement={(selectedName: string) => {
          const selectedCompany = companies.find(
            (c) => c.name === selectedName,
          );
          if (selectedCompany) {
            setRegistrationData((prev) => ({
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
          setRegistrationData((prev) => ({
            ...prev,
            workload: prev.workload.map((w) =>
              w.workloadId === item.workloadId
                ? { ...w, commission: parseFloat(value) }
                : w,
            ),
          }));
        }}
      />
      <img
        className="hover:cursor-pointer mt-6"
        onClick={() =>
          setRegistrationData((prev) => ({
            ...prev,
            workload: prev.workload.filter(
              (w) => w.workloadId !== item.workloadId,
            ),
          }))
        }
        onMouseEnter={() => setRemoveActiveIcon(removeWorkloadFocused)}
        onMouseLeave={() => setRemoveActiveIcon(removeWorkloadUnfocused)}
        src={removeActiveIcon}
        alt="remove-workload"
      />
    </div>
  );
};
