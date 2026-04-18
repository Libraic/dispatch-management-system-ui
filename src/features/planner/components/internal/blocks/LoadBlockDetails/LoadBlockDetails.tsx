import { SYSTEM_FONT_BOLD } from "#/tailwind/tailwind-font-vars";
import React from "react";
import { GoogleIcon } from "#/ui/GoogleIcon/GoogleIcon";
import { BLANK_STRING } from "#/constants/common/global-constants";
import { LoadStatusRenderer } from "#/features/planner/components/internal/blocks/LoadBlockDetails/LoadStatusRenderer";
import type { LoadData } from "#/types/internal/planner/planner-types";
import type { DisplayMode } from "#/features/planner/components/internal/blocks/LoadBlock/LoadBlock.types";

type LoadBlockDetailsProps = {
  textColor: string;
  load: LoadData;
  startLocation: string;
  endLocation: string;
  inputMode?: DisplayMode;
  childRef: React.RefObject<HTMLDivElement | null>;
  mode: DisplayMode;
};

export const LoadBlockDetails: React.FC<LoadBlockDetailsProps> = ({
  textColor,
  load,
  startLocation,
  endLocation,
  childRef,
  mode,
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        ref={childRef}
        className={`
          flex items-center w-full 
          ${
            mode !== "full"
              ? "absolute opacity-0 pointer-events-none"
              : BLANK_STRING
          }
        `}
      >
        <div className="flex items-center gap-2">
          <GoogleIcon code="inventory_2" size={1.25} fontColor="#6b7280" />
          <div>
            <p className="text-center text-[0.6rem]">{load.broker}</p>
            <p className={`${SYSTEM_FONT_BOLD} text-[0.7rem]`}>
              {startLocation}
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center mx-2">
          <GoogleIcon
            code="line_end_arrow_notch"
            size={1.5}
            weight={200}
            fontColor="#6b7280"
          />
        </div>

        <div className="flex items-center gap-2">
          <GoogleIcon code="location_on" size={1.25} fontColor="#6b7280" />
          <div className="flex items-center justify-center flex-col">
            <LoadStatusRenderer
              loadStatus={load.loadStatus}
              textColor={textColor}
            />
            <p className={`${SYSTEM_FONT_BOLD} text-[0.7rem]`}>{endLocation}</p>
          </div>
        </div>
      </div>

      {mode === "compact" && (
        <div className="flex flex-col justify-center items-center w-full text-[0.7rem]">
          <LoadStatusRenderer
            loadStatus={load.loadStatus}
            textColor={textColor}
          />
          <span className={`truncate ${SYSTEM_FONT_BOLD}`}>
            {startLocation}
          </span>

          <span className={`truncate ${SYSTEM_FONT_BOLD}`}>{endLocation}</span>
        </div>
      )}

      {mode === "minimal" && (
        <div className="flex justify-center items-center w-full text-[0.7rem]">
          <LoadStatusRenderer
            loadStatus={load.loadStatus}
            textColor={textColor}
          />
        </div>
      )}

      {mode === "hidden" && null}
    </div>
  );
};
