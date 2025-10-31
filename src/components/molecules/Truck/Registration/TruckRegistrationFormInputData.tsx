import { InputForm } from "../../../atoms/InputForm/InputForm.tsx";
import { setTruckDataField } from "../../../../utils/truck/truck-utils.ts";
import {
  BLANK_STRING,
  ZERO,
} from "../../../../constants/common/global-constants.ts";
import * as React from "react";
import type {
  TruckRegistrationData,
  TruckRegistrationError,
} from "../../../../types/internal/truck/truck-registration-types.ts";

export const TruckRegistrationFormInputData: React.FC<{
  truckData: TruckRegistrationData;
  setTruckData: React.Dispatch<React.SetStateAction<TruckRegistrationData>>;
  truckErrorData: TruckRegistrationError;
}> = ({ truckData, setTruckData, truckErrorData }) => {
  return (
    <div className="flex items-center flex-col h-fit mt-[10rem]">
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-row gap-[3rem]">
          <InputForm
            label="Truck Number"
            placeholder="R12-3456"
            type="text"
            inputFieldValue={truckData.truckNumber}
            isMandatory={true}
            errorMessage={truckErrorData.truckNumber}
            saveInputData={(truckNumber: string) =>
              setTruckDataField(setTruckData, "truckNumber", truckNumber)
            }
          />
          <InputForm
            label="VIN Number"
            placeholder="1FTFW1E50JKC12345"
            type="text"
            inputFieldValue={truckData.vinNumber}
            isMandatory={true}
            errorMessage={truckErrorData.vinNumber}
            saveInputData={(vinNumber: string) =>
              setTruckDataField(setTruckData, "vinNumber", vinNumber)
            }
          />
          <InputForm
            label="Model"
            placeholder="Ford"
            type="text"
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
            inputFieldValue={truckData.truckYear.toString()}
            isMandatory={false}
            errorMessage={truckErrorData.truckYear}
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
            inputFieldValue={truckData.weight.toString()}
            isMandatory={false}
            errorMessage={truckErrorData.weight}
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
    </div>
  );
};
