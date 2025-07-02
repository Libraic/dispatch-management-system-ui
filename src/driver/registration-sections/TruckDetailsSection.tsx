import * as React from "react";
import type {
  DriverRegistrationData,
  DriverRegistrationError,
} from "../../types/registration/driver/driver-registration-types.ts";
import { setObjectStringField } from "../../utils/registration/registration-utils.ts";
import { InputForm } from "../../global/InputForm.tsx";
import { SelectForm } from "../../global/SelectForm.tsx";
import {
  trailerLengths,
  trailerTypes,
} from "../../utils/registration/driver/driver-registration-utils.ts";

export const TruckDetailsSection: React.FC<{
  driverRegistrationData: DriverRegistrationData;
  driverRegistrationError: DriverRegistrationError;
  setDriverRegistrationData: React.Dispatch<
    React.SetStateAction<DriverRegistrationData>
  >;
}> = ({
  driverRegistrationData,
  driverRegistrationError,
  setDriverRegistrationData,
}) => {
  return (
    <div>
      <div className="flex flex-row gap-x-20">
        <InputForm
          label="Truck Number"
          placeholder="105"
          type="text"
          name="name"
          inputFieldValue={driverRegistrationData.truckNumber}
          isMandatory={true}
          errorMessage={driverRegistrationError.truckNumber}
          saveInputData={(truckNumber: string) =>
            setObjectStringField(
              setDriverRegistrationData,
              "truckNumber",
              truckNumber,
            )
          }
        />
        <InputForm
          label="Trailer Number"
          placeholder="888"
          type="text"
          name="name"
          inputFieldValue={driverRegistrationData.trailerNumber}
          isMandatory={true}
          errorMessage={driverRegistrationError.trailerNumber}
          saveInputData={(trailerNumber: string) =>
            setObjectStringField(
              setDriverRegistrationData,
              "trailerNumber",
              trailerNumber,
            )
          }
        />
        <InputForm
          label="Max Legal Weight Capacity (in lbs)"
          placeholder="47000"
          type="number"
          name="name"
          inputFieldValue={driverRegistrationData.maxLegalWeightCapacity}
          isMandatory={true}
          errorMessage={driverRegistrationError.maxLegalWeightCapacity}
          saveInputData={(maxLegalWeightCapacity: string) =>
            setObjectStringField(
              setDriverRegistrationData,
              "maxLegalWeightCapacity",
              maxLegalWeightCapacity,
            )
          }
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-x-20 mt-10">
        <SelectForm
          label="Trailer"
          initialValue={driverRegistrationData.trailerType}
          data={trailerTypes}
          setElement={(trailerType: string) =>
            setDriverRegistrationData({
              ...driverRegistrationData,
              trailerType: trailerType,
            })
          }
        />
        <SelectForm
          label="Length (ft)"
          initialValue={driverRegistrationData.trailerLength}
          data={trailerLengths}
          setElement={(trailerLength: string) =>
            setDriverRegistrationData({
              ...driverRegistrationData,
              trailerLength: trailerLength,
            })
          }
        />
      </div>
    </div>
  );
};
