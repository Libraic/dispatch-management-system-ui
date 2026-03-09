import { SelectForm } from "../../../Common/Selector/SelectForm.tsx";
import type {
  LocationLabel,
  MileageData,
  MileageDataError,
  MileageLocationData,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import React from "react";
import type { StateData } from "../../../../types/internal/common/props-types.ts";

const data: LocationLabel[] = ["Pick Up", "Delivery"];

export const MileageLocationLabel: React.FC<{
  mileageStateData: StateData<MileageData, MileageDataError>;
  mileageLocation: MileageLocationData;
}> = ({ mileageStateData, mileageLocation }) => {
  return (
    <div>
      <SelectForm
        initialValue={mileageLocation.label}
        data={data}
        setElement={(newLabel) => {
          mileageStateData.setData((prevData) => ({
            ...prevData,
            locations: prevData.locations.map((location) =>
              mileageLocation.uuid !== location.uuid
                ? location
                : {
                    ...location,
                    label: newLabel as LocationLabel,
                  },
            ),
          }));
        }}
      />
    </div>
  );
};
