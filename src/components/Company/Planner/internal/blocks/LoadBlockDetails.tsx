import {
  SYSTEM_FONT_BOLD,
  SYSTEM_FONT_THIN,
} from "../../../../../tailwind/tailwind-font-vars.ts";
import { Svg } from "../../../../Common/Icon/Svg.tsx";
import React from "react";
import type { LoadData } from "../../../../../types/internal/planner/planner-types.ts";

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
        <Svg
          activeColor="#6b7280"
          size={20}
          svgPath="M450-177.23v-285.54L200-607.54v278.62q0 3.07 1.54 5.77 1.54 2.69 4.61 4.61L450-177.23Zm60 0 243.85-141.31q3.07-1.92 4.61-4.61 1.54-2.7 1.54-5.77v-278.62L510-462.77v285.54Zm-30-337.23 247-142.77-240.85-139.31q-3.07-1.92-6.15-1.92-3.08 0-6.15 1.92L233-657.23l247 142.77ZM176.16-265.85q-17.08-9.84-26.62-26.3-9.54-16.47-9.54-36.16v-303.38q0-19.69 9.54-36.16 9.54-16.46 26.62-26.3l267.69-154.08q17.07-9.85 36.15-9.85t36.15 9.85l267.69 154.08q17.08 9.84 26.62 26.3 9.54 16.47 9.54 36.16v303.38q0 19.69-9.54 36.16-9.54 16.46-26.62 26.3L516.15-111.77q-17.07 9.85-36.15 9.85t-36.15-9.85L176.16-265.85ZM480-480Z"
        />
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
        <Svg
          activeColor="#6b7280"
          size={20}
          svgPath="M314.31-129.08Q250-158.15 250-204.23q0-21.31 16.04-40.08t44.35-32.23l47.23 42.85q-12.85 5.15-27.01 12.84-14.15 7.7-19.38 16.23 9.92 17.93 59.04 31.27Q419.38-160 480-160q60.23 0 109.85-13.35 49.61-13.34 59.54-31.27-5.08-9.15-20.5-16.84-15.43-7.69-29.27-12.85l46.61-43.46q30.69 14.08 47.23 32.85Q710-226.15 710-204.23q0 46.08-64.31 75.15Q581.38-100 480-100t-165.69-29.08ZM481-295q99.38-75.31 149.19-149.19Q680-518.08 680-590.92q0-103.54-64.81-156.31Q550.38-800 480-800q-70 0-135 52.77t-65 156.31q0 68.15 49.19 141.23Q378.38-376.61 481-295Zm-1 75q-131-97.85-195.5-190.08Q220-502.31 220-590.92q0-66.77 23.58-117 23.58-50.23 60.88-84.12 37.31-33.88 83.66-50.92Q434.46-860 480-860q45.54 0 91.88 17.04 46.35 17.04 83.66 50.92 37.3 33.89 60.88 84.12 23.58 50.23 23.58 117 0 88.61-64.5 180.84T480-220Zm0-304.23q29.92 0 51.11-21 21.2-21 21.2-51.31 0-29.92-21.2-51.11-21.19-21.2-51.11-21.2-29.54 0-50.92 21.2-21.39 21.19-21.39 51.11 0 30.31 21.39 51.31 21.38 21 50.92 21Zm0-72.31Z"
        />
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
