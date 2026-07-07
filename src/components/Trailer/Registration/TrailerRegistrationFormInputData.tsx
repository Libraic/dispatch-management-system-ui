import { TextualInputField } from "#/ui/InputField/components/public/TextualInputField";
import { setTrailerDataField } from "#/utils/trailer/trailer-utils";
import { BLANK_STRING, ZERO } from "#/constants/common/global-constants";
import type {
  TrailerRegistrationData,
  TrailerRegistrationError,
} from "#/types/internal/trailer/trailer-registration-types";
import * as React from "react";

export const TrailerRegistrationFormInputData: React.FC<{
  trailerData: TrailerRegistrationData;
  setTrailerData: React.Dispatch<React.SetStateAction<TrailerRegistrationData>>;
  trailerErrorData: TrailerRegistrationError;
}> = ({ trailerData, setTrailerData, trailerErrorData }) => {
  return (
    <div className="flex items-center flex-col h-fit mt-[10rem]">
      <div className="flex flex-row gap-[3rem]">
        <TextualInputField
          label="Trailer Number"
          placeholder="R12-3456"
          inputFieldValue={trailerData.trailerNumber}
          isMandatory={true}
          errorMessage={trailerErrorData.trailerNumber}
          saveInputData={(trailerNumber: string) =>
            setTrailerDataField(setTrailerData, "trailerNumber", trailerNumber)
          }
        />
        <TextualInputField
          label="VIN Number"
          placeholder="1FTFW1E50JKC12345"
          inputFieldValue={trailerData.vinNumber}
          isMandatory={true}
          errorMessage={trailerErrorData.vinNumber}
          saveInputData={(vinNumber: string) =>
            setTrailerDataField(setTrailerData, "vinNumber", vinNumber)
          }
        />
        <TextualInputField
          label="Trailer Year"
          placeholder="2020"
          inputFieldValue={trailerData.trailerYear}
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
        <TextualInputField
          label="Trailer Make"
          placeholder="Great Dane"
          inputFieldValue={trailerData.trailerMake}
          isMandatory={false}
          errorMessage={""}
          saveInputData={(trailerMake: string) =>
            setTrailerDataField(setTrailerData, "trailerMake", trailerMake)
          }
        />
        <TextualInputField
          label="Equipment Type"
          placeholder="Flatbed"
          inputFieldValue={trailerData.equipmentType}
          isMandatory={true}
          errorMessage={""}
          saveInputData={(equipmentType: string) =>
            setTrailerDataField(setTrailerData, "equipmentType", equipmentType)
          }
        />
        <TextualInputField
          label="Equipment Size (ft)"
          placeholder="48"
          inputFieldValue={trailerData.equipmentSize}
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
        <TextualInputField
          label="Pallet Capacity"
          placeholder="24"
          inputFieldValue={trailerData.palletCapacity}
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
        <TextualInputField
          label="Max Weight (lbs)"
          placeholder="10000"
          inputFieldValue={trailerData.maxWeight}
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
        <TextualInputField
          label="Tire Size"
          placeholder="295/75R22.5"
          inputFieldValue={trailerData.tireSize}
          isMandatory={false}
          saveInputData={(tireSize: string) =>
            setTrailerDataField(setTrailerData, "tireSize", tireSize)
          }
        />
      </div>
    </div>
  );
};
