import addFocusedIcon from "../../../../assets/trucks-board/add-focused.svg";
import addUnfocusedIcon from "../../../../assets/trucks-board/add-unfocused.svg";
import { IconButton } from "../../../Common/Button/IconButton.tsx";
import type { StateData } from "../../../../types/internal/common/props-types.ts";
import type {
  LoadData,
  LoadDataError,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import React from "react";
import { getBlankLocation } from "../../../../utils/trucks-board/trucks-board-utils.ts";
import { SYSTEM_FONT_LIGHT } from "../../../../tailwind/tailwind-font-vars.ts";

export const LoadLocationCreator: React.FC<{
  loadStateData: StateData<LoadData, LoadDataError>;
}> = ({ loadStateData }) => {
  return (
    <div className="flex flex-row items-center gap-x-[1rem]">
      <IconButton
        unfocusedResource={addUnfocusedIcon}
        focusedResource={addFocusedIcon}
        action={() => {
          loadStateData.setData((prevData) => ({
            ...prevData,
            locations: [
              ...prevData.locations,
              getBlankLocation(
                new Date(
                  prevData.locations[
                    prevData.locations.length - 1
                  ].date.getTime() +
                    24 * 60 * 60 * 1000,
                ),
                prevData.locations.length,
              ),
            ],
          }));
        }}
      />
      <p className={`${SYSTEM_FONT_LIGHT} text-[0.9rem] tracking-wide`}>
        Add Location
      </p>
    </div>
  );
};
