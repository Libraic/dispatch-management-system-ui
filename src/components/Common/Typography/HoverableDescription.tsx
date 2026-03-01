import * as React from "react";
import errorIcon from "../../../assets/global/error.svg";
import { SYSTEM_FONT_LIGHT } from "../../../tailwind/tailwind-font-vars.ts";

export const HoverableDescription: React.FC<{
  message: string;
  icon?: string;
}> = ({ message, icon }) => {
  return (
    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-[10000]">
      <div className="flex flex-row items-center justify-center w-fit bg-gray-100 rounded-xl opacity-90 p-2 shadow-lg backdrop-blur-sm whitespace-nowrap">
        {icon && (
          <img src={errorIcon} alt="error-icon" className="w-4 h-4 mr-1" />
        )}
        <p className={`${SYSTEM_FONT_LIGHT} text-black text-[0.6rem]`}>
          {message}
        </p>
      </div>
    </div>
  );
};
