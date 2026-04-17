import { IconButton } from "#/ui/Buttons/IconButton";
import { useContext } from "react";
import { SYSTEM_FONT_LIGHT } from "#/tailwind/tailwind-font-vars";
import { getBlankLocation } from "#/utils/planner/load-utils";
import { GoogleIcon } from "#/ui/GoogleIcon/GoogleIcon";
import { LoadContext } from "#/features/planner/context/LoadContext";

export const LoadLocationCreator = () => {
  const loadContext = useContext(LoadContext)!!;
  return (
    <div className="flex flex-row items-center gap-x-[1rem]">
      <IconButton
        icon={<GoogleIcon code="add_circle" />}
        action={() => {
          loadContext.setLoadData((prevData) => ({
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
