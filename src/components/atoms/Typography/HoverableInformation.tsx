import * as React from "react";
import errorIcon from "../../../assets/global/error.svg";

export const HoverableInformation: React.FC<{
  message: string;
  icon?: string;
  topPosition?: string;
  leftPosition?: string;
  minWidth?: string;
}> = ({ message, icon, topPosition, leftPosition, minWidth }) => {
  const top = topPosition ? topPosition : "top-full";
  const left = leftPosition ? leftPosition : "left-1/2";
  const width = minWidth ? minWidth : "min-w-[10rem]";
  return (
    <div
      className={`absolute ${top} ${left} -translate-x-1/2 mt-2 ${width} rounded-xl text-center text-[0.8rem] p-1 z-10 shadow-lg backdrop-blur-sm bg-white/30`}
    >
      <div className="flex flex-row items-center justify-center gap-x-1">
        {icon && <img src={errorIcon} alt="error-icon" className="w-4 h-4" />}
        <p className="font-lato font-light">{message}</p>
      </div>
    </div>
  );
};
