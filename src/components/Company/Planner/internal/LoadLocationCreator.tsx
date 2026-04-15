import { IconButton } from "../../../Common/Button/IconButton.tsx";
import type { StateData } from "../../../../types/internal/common/props-types.ts";
import type {
  LoadData,
  LoadDataError,
} from "../../../../types/internal/planner/planner-types.ts";
import React from "react";
import { SYSTEM_FONT_LIGHT } from "../../../../tailwind/tailwind-font-vars.ts";
import { getBlankLocation } from "../../../../utils/planner/load-utils.ts";
import { GoogleIcon } from "../../../../shared/components/GoogleIcon/GoogleIcon.tsx";

export const LoadLocationCreator: React.FC<{
  loadStateData: StateData<LoadData, LoadDataError>;
}> = ({ loadStateData }) => {
  return (
    <div className="flex flex-row items-center gap-x-[1rem]">
      <IconButton
        icon={<GoogleIcon code="add_circle" />}
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
