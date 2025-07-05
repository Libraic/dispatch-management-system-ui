import { useContext } from "react";
import { setObjectStringField } from "../../../utils/registration/registration-utils.ts";
import { InputForm } from "../../../global/InputForm.tsx";
import { SelectForm } from "../../../global/SelectForm.tsx";
import {
  trailerLengths,
  trailerTypes,
} from "../../../utils/registration/driver/driver-registration-utils.ts";
import { DriverRegistrationContext } from "../../../context/DriverRegistrationContext.ts";

export const TruckDetailsSection = () => {
  const context = useContext(DriverRegistrationContext)!;
  const driverRegistrationData = context.registrationData;
  const driverRegistrationError = context.registrationDataError;
  const setDriverRegistrationData = context.setRegistrationData;
  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-x-20">
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
      <div className="flex flex-row gap-x-20 mt-20">
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
      </div>
    </div>
  );
};
