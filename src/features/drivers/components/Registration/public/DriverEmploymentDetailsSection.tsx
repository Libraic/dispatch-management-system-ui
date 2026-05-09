import { SelectorField } from "#/ui/Selectors/SelectorField";
import { useContext } from "react";
import {
  documentsStatuses,
  driverPositions,
} from "#/features/drivers/mappers/driverRegistration.mapper";
import { DriverRegistrationContext } from "#/features/drivers/context/DriverRegistrationContext";
import { LiveSearchInputField } from "#/ui/LiveSearchInputField/public/LiveSearchInputField/LiveSearchInputField";
import type { Renderable } from "#/types/internal/classes/Renderable";
import { City } from "#/types/internal/classes/City";
import { Entity } from "#/types/api/common/api-query-types";
import { BLANK_STRING } from "#/constants/common/global-constants";

export const DriverEmploymentDetailsSection = () => {
  const context = useContext(DriverRegistrationContext)!;
  const driverRegistrationData = context.registrationData;
  const setDriverRegistrationData = context.setRegistrationData;

  return (
    <div className="flex flex-col gap-y-20">
      <div className="flex flex-row gap-x-20 justify-center">
        <SelectorField
          label="Docs Status"
          initialValue={driverRegistrationData.documentsStatus}
          data={documentsStatuses}
          setElement={(documentsStatus: string) =>
            setDriverRegistrationData({
              ...driverRegistrationData,
              documentsStatus: documentsStatus,
            })
          }
          tailwindProperties={{ width: "w-[10rem]" }}
        />
        <SelectorField
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
      <LiveSearchInputField
        label="Location"
        placeholder="Los Angeles, CA"
        value={driverRegistrationData.location ?? BLANK_STRING}
        saveData={(location: Renderable) =>
          setDriverRegistrationData({
            ...driverRegistrationData,
            location: location.renderOnForm(),
          })
        }
        entityType={Entity.CITY}
        constructor={City}
        tailwindProperties={{ width: "w-[14.2rem]" }}
      />
    </div>
  );
};
