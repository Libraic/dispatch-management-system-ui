import { InputForm } from "../../Common/InputForm/public/InputForm.tsx";
import { setTrailerDataField } from "../../../utils/trailer/trailer-utils.ts";
import {
  BLANK_STRING,
  ZERO,
} from "../../../constants/common/global-constants.ts";
import type {
  TrailerRegistrationData,
  TrailerRegistrationError,
} from "../../../types/internal/trailer/trailer-registration-types.ts";
import * as React from "react";

export const TrailerRegistrationFormInputData: React.FC<{
  trailerData: TrailerRegistrationData;
  setTrailerData: React.Dispatch<React.SetStateAction<TrailerRegistrationData>>;
  trailerErrorData: TrailerRegistrationError;
}> = ({ trailerData, setTrailerData, trailerErrorData }) => {
  return (
    <div className="flex items-center flex-col h-fit mt-[10rem]">
      <div className="flex flex-row gap-[3rem]">
        <InputForm
          label="Trailer Number"
          placeholder="R12-3456"
          type="text"
          inputFieldValue={trailerData.trailerNumber}
          isMandatory={true}
          errorMessage={trailerErrorData.trailerNumber}
          saveInputData={(trailerNumber: string) =>
            setTrailerDataField(setTrailerData, "trailerNumber", trailerNumber)
          }
        />
        <InputForm
          label="VIN Number"
          placeholder="1FTFW1E50JKC12345"
          type="text"
          inputFieldValue={trailerData.vinNumber}
          isMandatory={true}
          errorMessage={trailerErrorData.vinNumber}
          saveInputData={(vinNumber: string) =>
            setTrailerDataField(setTrailerData, "vinNumber", vinNumber)
          }
        />
        <InputForm
          label="Trailer Year"
          placeholder="2020"
          type="number"
          inputFieldValue={trailerData.trailerYear.toString()}
          isMandatory={false}
          errorMessage={trailerErrorData.trailerYear}
          saveInputData={(trailerYear: string) =>
            setTrailerDataField(
              setTrailerData,
              "trailerYear",
              trailerYear !== BLANK_STRING ? parseInt(trailerYear) : ZERO,
            )
          }
        />
      </div>
      <div className="flex flex-row gap-[3rem] items-center justify-center">
        <InputForm
          label="Trailer Make"
          placeholder="Great Dane"
          type="text"
          inputFieldValue={trailerData.trailerMake}
          isMandatory={false}
          errorMessage={""}
          saveInputData={(trailerMake: string) =>
            setTrailerDataField(setTrailerData, "trailerMake", trailerMake)
          }
        />
        <InputForm
          label="Equipment Type"
          placeholder="Flatbed"
          type="text"
          inputFieldValue={trailerData.equipmentType}
          isMandatory={true}
          errorMessage={""}
          saveInputData={(equipmentType: string) =>
            setTrailerDataField(setTrailerData, "equipmentType", equipmentType)
          }
        />
        <InputForm
          label="Equipment Size (ft)"
          placeholder="48"
          type="number"
          inputFieldValue={trailerData.equipmentSize.toString()}
          isMandatory={true}
          errorMessage={trailerErrorData.equipmentSize}
          saveInputData={(equipmentSize: string) =>
            setTrailerDataField(
              setTrailerData,
              "equipmentSize",
              equipmentSize !== BLANK_STRING ? parseInt(equipmentSize) : ZERO,
            )
          }
        />
      </div>
      <div className="flex flex-row gap-[3rem] items-center justify-center">
        <InputForm
          label="Pallet Capacity"
          placeholder="24"
          type="number"
          inputFieldValue={trailerData.palletCapacity.toString()}
          isMandatory={false}
          errorMessage={trailerErrorData.palletCapacity}
          saveInputData={(palletCapacity: string) =>
            setTrailerDataField(
              setTrailerData,
              "palletCapacity",
              palletCapacity !== BLANK_STRING ? parseInt(palletCapacity) : ZERO,
            )
          }
        />
        <InputForm
          label="Max Weight (lbs)"
          placeholder="10000"
          type="number"
          inputFieldValue={trailerData.maxWeight.toString()}
          isMandatory={true}
          errorMessage={trailerErrorData.maxWeight}
          saveInputData={(maxWeight: string) =>
            setTrailerDataField(
              setTrailerData,
              "maxWeight",
              maxWeight !== BLANK_STRING ? parseInt(maxWeight) : ZERO,
            )
          }
        />
        <InputForm
          label="Tire Size"
          placeholder="295/75R22.5"
          type="text"
          inputFieldValue={trailerData.tireSize}
          isMandatory={false}
          errorMessage={""}
          saveInputData={(tireSize: string) =>
            setTrailerDataField(setTrailerData, "tireSize", tireSize)
          }
        />
      </div>
    </div>
  );
};
