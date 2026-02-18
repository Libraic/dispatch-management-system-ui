import React from "react";
import { setObjectStringField } from "../../../../utils/registration/registration-utils.ts";
import type {
  MileageData,
  MileageDataError,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import type { StateData } from "../../../../types/internal/common/props-types.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import { LiveSearchInputForm } from "../../../Common/LiveSearch/public/LiveSearchInputForm.tsx";
import { Entity } from "../../../../types/api/common/api-query-types.ts";
import { City } from "../../../../types/internal/classes/City.ts";
import type { Renderable } from "../../../../types/internal/classes/Renderable.ts";

export const MileageFormLoadLocations: React.FC<{
  mileageStateData: StateData<MileageData, MileageDataError>;
}> = ({ mileageStateData }) => {
  return (
    <div className="flex flex-row gap-x-5">
      <LiveSearchInputForm
        label="Pick Up"
        placeholder="Los Angeles, CA"
        value={mileageStateData.data.pickUpLocation ?? BLANK_STRING}
        saveData={(city: Renderable) =>
          setObjectStringField(
            mileageStateData.setData,
            "pickUpLocation",
            city.renderOnForm(),
          )
        }
        cleanData={() =>
          setObjectStringField(
            mileageStateData.setData,
            "pickUpLocation",
            BLANK_STRING,
          )
        }
        entityType={Entity.CITY}
        constructor={City}
      />
      <LiveSearchInputForm
        label="Delivery"
        placeholder="Chicago, IL"
        value={mileageStateData.data.deliveryLocation ?? BLANK_STRING}
        saveData={(city: Renderable) =>
          setObjectStringField(
            mileageStateData.setData,
            "deliveryLocation",
            city.renderOnForm(),
          )
        }
        cleanData={() =>
          setObjectStringField(
            mileageStateData.setData,
            "deliveryLocation",
            BLANK_STRING,
          )
        }
        entityType={Entity.CITY}
        constructor={City}
      />
    </div>
  );
};
