import * as React from "react";
import {
  BACKGROUND_NORMAL_COLOR,
  BORDER_NORMAL_COLOR,
  HOVER_BACKGROUND_NORMAL_COLOR,
  HOVER_BORDER_NORMAL_COLOR,
  TEXT_NORMAL_COLOR,
} from "#/shared/constants/tailwind/tailwindColors.constants";
import { BLANK_STRING } from "#/constants/common/global-constants";

type DriverRegistrationSectionProps = {
  sectionTitle: string;
  sectionIndex: number;
  isLast: boolean;
  hasErrors: boolean;
  isActive: boolean;
  isFocused: boolean;
  focusSection: (section: string) => void;
};

export const DriverRegistrationSection: React.FC<
  DriverRegistrationSectionProps
> = ({
  sectionTitle,
  sectionIndex,
  isLast,
  hasErrors,
  isActive,
  isFocused,
  focusSection,
}) => {
  const textColor = !isActive
    ? "text-gray-400"
    : isFocused
      ? "text-white"
      : hasErrors
        ? "text-error-red"
        : TEXT_NORMAL_COLOR;
  const backgroundColor = !isActive
    ? "bg-white"
    : isFocused
      ? hasErrors
        ? "bg-error-red"
        : BACKGROUND_NORMAL_COLOR
      : "bg-white";
  return (
    <>
      <div
        onClick={() => focusSection(sectionTitle)}
        className={`
          flex justify-center items-center w-9 h-9 
          rounded-[50%] border-[0.1rem] select-none
          ${!isActive ? BLANK_STRING : "cursor-pointer"}
          ${hasErrors ? "border-error-red" : isActive ? BORDER_NORMAL_COLOR : "border-gray-400"} 
          ${!isActive ? "hover:border-gray-400" : hasErrors ? "hover:border-error-red" : HOVER_BORDER_NORMAL_COLOR} 
          ${backgroundColor} 
          ${!isActive ? "bg-white" : hasErrors ? "hover:bg-error-red" : HOVER_BACKGROUND_NORMAL_COLOR} 
          ${!isActive ? "text-gray-400" : textColor} 
          ${!isActive ? "hover-text-gray-400" : "hover:text-white"}
        `}
      >
        <p className={`font-medium text-[1rem]`}>{sectionIndex}</p>
      </div>
      <p
        className={`
          font-normal text-[0.9rem] text-center select-none
          ${!isActive ? "text-gray-400" : hasErrors ? "text-error-red" : TEXT_NORMAL_COLOR}
        `}
      >
        {sectionTitle}
      </p>
      {isLast && (
        <div
          className={`
            w-[8rem] border-[0.063rem]  
            ${!isActive ? "border-gray-400" : hasErrors ? "border-error-red" : BORDER_NORMAL_COLOR}
          `}
        ></div>
      )}
    </>
  );
};
