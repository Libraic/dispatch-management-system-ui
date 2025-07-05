import { SelectForm } from "../../global/SelectForm.tsx";
import * as React from "react";
import type { DriverRegistrationData } from "../../types/registration/driver/driver-registration-types.ts";
import {
  documentsStatuses,
  driverPositions,
} from "../../utils/registration/driver/driver-registration-utils.ts";

export const EmploymentData: React.FC<{
  driverRegistrationData: DriverRegistrationData;
  setDriverRegistrationData: React.Dispatch<
    React.SetStateAction<DriverRegistrationData>
  >;
}> = ({ driverRegistrationData, setDriverRegistrationData }) => {
  return (
    <div className="flex flex-row gap-x-20">
      <SelectForm
        label="Documents Status"
        initialValue={driverRegistrationData.documentsStatus}
        data={documentsStatuses}
        setElement={(documentsStatus: string) =>
          setDriverRegistrationData({
            ...driverRegistrationData,
            documentsStatus: documentsStatus,
          })
        }
      />
      <SelectForm
        label="Position"
        initialValue={driverRegistrationData.position}
        data={driverPositions}
        setElement={(driverPosition: string) =>
          setDriverRegistrationData({
            ...driverRegistrationData,
            position: driverPosition,
          })
        }
      />
    </div>
  );
};
