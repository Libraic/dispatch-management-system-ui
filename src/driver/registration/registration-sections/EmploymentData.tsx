import { SelectForm } from "../../../global/SelectForm.tsx";
import { useContext } from "react";
import {
  documentsStatuses,
  driverPositions,
} from "../../../utils/registration/driver/driver-registration-utils.ts";
import { DriverRegistrationContext } from "../../../context/DriverRegistrationContext.ts";
import { LocationSelector } from "../../../global/LocationSelector.tsx";

export const EmploymentData = () => {
  const context = useContext(DriverRegistrationContext)!;
  const driverRegistrationData = context.registrationData;
  const setDriverRegistrationData = context.setRegistrationData;

  return (
    <div className="flex flex-col gap-y-20">
      <div className="flex flex-row gap-x-20 justify-center">
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
      <LocationSelector
        currentState={driverRegistrationData.state}
        currentCity={driverRegistrationData.city}
        setState={(state: string) =>
          setDriverRegistrationData((prev) => ({
            ...prev,
            state,
          }))
        }
        setCity={(city: string) =>
          setDriverRegistrationData((prev) => ({
            ...prev,
            city,
          }))
        }
      />
    </div>
  );
};
