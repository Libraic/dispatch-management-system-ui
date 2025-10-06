import { InputForm } from "../../../global/input-forms/InputForm.tsx";
import * as React from "react";
import type {
  TruckRegistrationData,
  TruckRegistrationError,
} from "../../../types/assets/asset-data.ts";
import { setTruckDataField } from "../../../utils/assets/truck-utils.ts";
import {
  BLANK_STRING,
  ZERO,
} from "../../../utils/constants/global-constants.ts";

export const TruckCreationForm: React.FC<{
  truckData: TruckRegistrationData;
  truckRegistrationErrors: TruckRegistrationError;
  setTruckData: React.Dispatch<React.SetStateAction<TruckRegistrationData>>;
}> = ({ truckData, truckRegistrationErrors, setTruckData }) => {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-row gap-[3rem]">
        <InputForm
          label="Truck Number"
          placeholder="R12-3456"
          type="text"
          name="truck-number"
          inputFieldValue={truckData.truckNumber}
          isMandatory={true}
          errorMessage={truckRegistrationErrors.truckNumber}
          saveInputData={(truckNumber: string) =>
            setTruckDataField(setTruckData, "truckNumber", truckNumber)
          }
        />
        <InputForm
          label="VIN Number"
          placeholder="1FTFW1E50JKC12345"
          type="text"
          name="vin-number"
          inputFieldValue={truckData.vinNumber}
          isMandatory={true}
          errorMessage={truckRegistrationErrors.vinNumber}
          saveInputData={(vinNumber: string) =>
            setTruckDataField(setTruckData, "vinNumber", vinNumber)
          }
        />
        <InputForm
          label="Model"
          placeholder="Ford"
          type="text"
          name="model"
          inputFieldValue={truckData.model}
          isMandatory={false}
          errorMessage={""}
          saveInputData={(model: string) =>
            setTruckDataField(setTruckData, "model", model)
          }
        />
      </div>
      <div className="flex flex-row gap-[3rem] items-center justify-center">
        <InputForm
          label="Truck Year"
          placeholder="2025"
          type="number"
          name="truck-year"
          inputFieldValue={truckData.truckYear.toString()}
          isMandatory={false}
          errorMessage={truckRegistrationErrors.truckYear}
          saveInputData={(truckYear: string) =>
            setTruckDataField(
              setTruckData,
              "truckYear",
              truckYear !== BLANK_STRING ? parseInt(truckYear) : ZERO,
            )
          }
        />
        <InputForm
          label="Truck Make"
          placeholder="F-150"
          type="text"
          name="truck-make"
          inputFieldValue={truckData.truckMake}
          isMandatory={false}
          errorMessage={""}
          saveInputData={(truckMake: string) =>
            setTruckDataField(setTruckData, "truckMake", truckMake)
          }
        />
      </div>
      <div className="flex flex-row gap-[3rem] items-center justify-center">
        <InputForm
          label="Fuel Type"
          placeholder="Diesel"
          type="text"
          name="fuel-type"
          inputFieldValue={truckData.fuelType}
          isMandatory={false}
          errorMessage={""}
          saveInputData={(fuelType: string) =>
            setTruckDataField(setTruckData, "fuelType", fuelType)
          }
        />
        <InputForm
          label="Color"
          placeholder="White"
          type="text"
          name="color"
          inputFieldValue={truckData.color}
          isMandatory={false}
          errorMessage={""}
          saveInputData={(color: string) =>
            setTruckDataField(setTruckData, "color", color)
          }
        />
        <InputForm
          label="Weight (lbs)"
          placeholder="10000"
          type="text"
          name="weight"
          inputFieldValue={truckData.weight.toString()}
          isMandatory={false}
          errorMessage={truckRegistrationErrors.weight}
          saveInputData={(weight: string) =>
            setTruckDataField(
              setTruckData,
              "weight",
              weight !== BLANK_STRING ? parseFloat(weight) : ZERO,
            )
          }
        />
      </div>
    </div>
  );
};
