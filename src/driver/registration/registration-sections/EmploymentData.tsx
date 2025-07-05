import { SelectForm } from "../../../global/SelectForm.tsx";
import { useContext } from "react";
import {
  documentsStatuses,
  driverPositions,
} from "../../../utils/registration/driver/driver-registration-utils.ts";
import { DriverRegistrationContext } from "../../../context/DriverRegistrationContext.ts";

export const EmploymentData = () => {
  const context = useContext(DriverRegistrationContext)!;
  const driverRegistrationData = context.registrationData;
  const setDriverRegistrationData = context.setRegistrationData;

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
