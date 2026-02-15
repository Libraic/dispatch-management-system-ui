import React from "react";
import { TextualInputForm } from "../../../Common/InputForm/public/TextualInputForm.tsx";
import { setObjectStringField } from "../../../../utils/registration/registration-utils.ts";
import type {
  MileageData,
  MileageDataError,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import type { StateData } from "../../../../types/internal/common/props-types.ts";

export const MileageFormLoadLocations: React.FC<{
  mileageStateData: StateData<MileageData, MileageDataError>;
}> = ({ mileageStateData }) => {
  return (
    <div className="flex flex-row gap-x-5">
      <TextualInputForm
        label="Pick Up"
        placeholder="Los Angeles, CA"
        inputFieldValue={mileageStateData.data.pickUpLocation}
        saveInputData={(pickUpLocation: string) =>
          setObjectStringField(
            mileageStateData.setData,
            "pickUpLocation",
            pickUpLocation,
          )
        }
        isMandatory={true}
        errorMessage={mileageStateData.error.pickUpLocationError}
      />
      <TextualInputForm
        label="Delivery"
        placeholder="Chicago, IL"
        inputFieldValue={mileageStateData.data.deliveryLocation}
        saveInputData={(deliveryLocation: string) =>
          setObjectStringField(
            mileageStateData.setData,
            "deliveryLocation",
            deliveryLocation,
          )
        }
        isMandatory={true}
        errorMessage={mileageStateData.error.deliveryLocationError}
      />
    </div>
  );
};
