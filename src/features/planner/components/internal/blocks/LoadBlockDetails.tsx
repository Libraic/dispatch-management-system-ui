import {
  SYSTEM_FONT_BOLD,
  SYSTEM_FONT_THIN,
} from "#/tailwind/tailwind-font-vars";
import React from "react";
import type { LoadData } from "#/types/internal/planner/planner-types";
import { GoogleIcon } from "#/ui/GoogleIcon/GoogleIcon";

export const LoadBlockDetails: React.FC<{
  textColor: string;
  load: LoadData;
  startLocation: string;
  endLocation: string;
  width: number;
}> = ({ textColor, load, startLocation, endLocation, width }) => {
  const fullBlock = (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <GoogleIcon code="inventory_2" size={1.25} fontColor="#6b7280" />
        <div>
          <p className="text-center text-[0.6rem]">{load.broker}</p>
          <p className={`${SYSTEM_FONT_BOLD} text-[0.7rem]`}>{startLocation}</p>
        </div>
      </div>

      <div className="flex-1 flex items-center mx-2 min-w-0">
        <div className="flex-1 h-[0.05rem] bg-current opacity-50" />
        <span
          className={`text-[0.8rem] opacity-50 ${SYSTEM_FONT_THIN} mb-[0.081rem]`}
        >
          ›
        </span>
      </div>
      <div className="flex items-center gap-2">
        <GoogleIcon code="location_on" size={1.25} fontColor="#6b7280" />
        <div>
          <p
            className={`text-center border-[0.05rem] rounded-[0.2rem] text-[0.6rem] ${textColor} ${SYSTEM_FONT_BOLD}`}
          >
            {load.loadStatus}
          </p>
          <p className={`${SYSTEM_FONT_BOLD} text-[0.7rem]`}>{endLocation}</p>
        </div>
      </div>
    </div>
  );

  const statusAndBrokerBlock = (
    <div className="flex items-center justify-center w-full flex-col gap-y-2">
      <p
        className={`border-[0.05rem] rounded-[0.2rem] text-[0.6rem] p-[0.1rem] ${textColor} ${SYSTEM_FONT_BOLD}`}
      >
        {load.loadStatus}
      </p>
      <div
        className={`flex justify-center items-center gap-x-6 ${SYSTEM_FONT_BOLD} text-[0.7rem]`}
      >
        <p>{startLocation}</p>
        <p className={`${SYSTEM_FONT_THIN} text-[0.55rem]`}>|</p>
        <p>{endLocation}</p>
      </div>
    </div>
  );

  const statusOnlyBlock = (
    <div className="flex items-center justify-center w-full flex-col overflow-hidden whitespace-nowrap">
      <p
        className={`border-[0.05rem] rounded-[0.2rem] text-[0.6rem] p-[0.1rem] ${textColor} ${SYSTEM_FONT_BOLD}`}
      >
        {load.loadStatus}
      </p>
    </div>
  );

  if (width >= 17) {
    return fullBlock;
  }

  if (width <= 9) {
    return statusOnlyBlock;
  }

  return statusAndBrokerBlock;
};
