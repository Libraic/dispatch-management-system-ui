import { TextualInputField } from "../../Common/InputForm/public/TextualInputField.tsx";
import { setTruckDataField } from "../../../utils/truck/truck-utils.ts";
import {
  BLANK_STRING,
  ZERO,
} from "../../../constants/common/global-constants.ts";
import * as React from "react";
import type {
  TruckRegistrationData,
  TruckRegistrationError,
} from "../../../types/internal/truck/truck-registration-types.ts";

export const TruckRegistrationFormInputData: React.FC<{
  truckData: TruckRegistrationData;
  setTruckData: React.Dispatch<React.SetStateAction<TruckRegistrationData>>;
  truckErrorData: TruckRegistrationError;
}> = ({ truckData, setTruckData, truckErrorData }) => {
  return (
    <div className="flex items-center flex-col h-fit mt-[10rem]">
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-row gap-[3rem]">
          <TextualInputField
            label="Truck Number"
            placeholder="R12-3456"
            inputFieldValue={truckData.truckNumber}
            isMandatory={true}
            errorMessage={truckErrorData.truckNumber}
            saveInputData={(truckNumber: string) =>
              setTruckDataField(setTruckData, "truckNumber", truckNumber)
            }
          />
          <TextualInputField
            label="VIN Number"
            placeholder="1FTFW1E50JKC12345"
            inputFieldValue={truckData.vinNumber}
            isMandatory={true}
            errorMessage={truckErrorData.vinNumber}
            saveInputData={(vinNumber: string) =>
              setTruckDataField(setTruckData, "vinNumber", vinNumber)
            }
          />
          <TextualInputField
            label="Model"
            placeholder="Ford"
            inputFieldValue={truckData.model}
            isMandatory={false}
            errorMessage={""}
            saveInputData={(model: string) =>
              setTruckDataField(setTruckData, "model", model)
            }
          />
        </div>
        <div className="flex flex-row gap-[3rem] items-center justify-center">
          <TextualInputField
            label="Truck Year"
            placeholder="2025"
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
          <TextualInputField
            label="Truck Make"
            placeholder="F-150"
            inputFieldValue={truckData.truckMake}
            isMandatory={false}
            saveInputData={(truckMake: string) =>
              setTruckDataField(setTruckData, "truckMake", truckMake)
            }
          />
        </div>
        <div className="flex flex-row gap-[3rem] items-center justify-center">
          <TextualInputField
            label="Fuel Type"
            placeholder="Diesel"
            inputFieldValue={truckData.fuelType}
            isMandatory={false}
            saveInputData={(fuelType: string) =>
              setTruckDataField(setTruckData, "fuelType", fuelType)
            }
          />
          <TextualInputField
            label="Color"
            placeholder="White"
            inputFieldValue={truckData.color}
            isMandatory={false}
            saveInputData={(color: string) =>
              setTruckDataField(setTruckData, "color", color)
            }
          />
          <TextualInputField
            label="Weight (lbs)"
            placeholder="10000"
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
