import { InputForm } from "../../../global/input-forms/InputForm.tsx";
import type { SetStateAction } from "react";
import * as React from "react";
import type {
  TrailerRegistrationData,
  TrailerRegistrationError,
} from "../../../types/assets/asset-data.ts";
import { setTrailerDataField } from "../../../utils/assets/trailer-utils.ts";
import {
  BLANK_STRING,
  ZERO,
} from "../../../utils/constants/global-constants.ts";

export const TrailerCreationForm: React.FC<{
  trailerData: TrailerRegistrationData;
  trailerRegistrationErrors: TrailerRegistrationError;
  setTrailerData: React.Dispatch<SetStateAction<TrailerRegistrationData>>;
}> = ({ trailerData, trailerRegistrationErrors, setTrailerData }) => {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-row gap-[3rem]">
        <InputForm
          label="Trailer Number"
          placeholder="R12-3456"
          type="text"
          name="trailer-number"
          inputFieldValue={trailerData.trailerNumber}
          isMandatory={true}
          errorMessage={trailerRegistrationErrors.trailerNumber}
          saveInputData={(trailerNumber: string) =>
            setTrailerDataField(setTrailerData, "trailerNumber", trailerNumber)
          }
        />
        <InputForm
          label="VIN Number"
          placeholder="1FTFW1E50JKC12345"
          type="text"
          name="vin-number"
          inputFieldValue={trailerData.vinNumber}
          isMandatory={true}
          errorMessage={trailerRegistrationErrors.vinNumber}
          saveInputData={(vinNumber: string) =>
            setTrailerDataField(setTrailerData, "vinNumber", vinNumber)
          }
        />
        <InputForm
          label="Trailer Year"
          placeholder="2020"
          type="number"
          name="trailer-year"
          inputFieldValue={trailerData.trailerYear.toString()}
          isMandatory={false}
          errorMessage={trailerRegistrationErrors.trailerYear}
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
          name="trailer-make"
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
          name="equipement-type"
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
          name="equipment-size"
          inputFieldValue={trailerData.equipmentSize.toString()}
          isMandatory={true}
          errorMessage={trailerRegistrationErrors.equipmentSize}
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
          name="pallet-capacity"
          inputFieldValue={trailerData.palletCapacity.toString()}
          isMandatory={false}
          errorMessage={trailerRegistrationErrors.palletCapacity}
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
          name="max-weight"
          inputFieldValue={trailerData.maxWeight.toString()}
          isMandatory={true}
          errorMessage={trailerRegistrationErrors.maxWeight}
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
          name="tire-size"
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
