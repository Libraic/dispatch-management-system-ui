import * as React from "react";
import {
  BACKGROUND_NORMAL_COLOR,
  BORDER_NORMAL_COLOR,
  HOVER_BACKGROUND_NORMAL_COLOR,
  HOVER_BORDER_NORMAL_COLOR,
  TEXT_NORMAL_COLOR,
} from "#/tailwind/tailwind-colors-vars";

type DriverRegistrationSectionProps = {
  sectionTitle: string;
  sectionIndex: number;
  isLast: boolean;
  isWithErrors: boolean;
  isActive: boolean;
  activateSection: (section: string) => void;
};

export const DriverRegistrationSection: React.FC<
  DriverRegistrationSectionProps
> = ({
  sectionTitle,
  sectionIndex,
  isLast,
  isWithErrors,
  isActive,
  activateSection,
}) => {
  const textColor = !isActive
    ? isWithErrors
      ? "text-error-red"
      : TEXT_NORMAL_COLOR
    : "text-white";
  const backgroundColor = isActive
    ? isWithErrors
      ? "bg-error-red"
      : BACKGROUND_NORMAL_COLOR
    : "bg-white";
  return (
    <>
      <div
        onClick={() => activateSection(sectionTitle)}
        className={`
          flex justify-center items-center w-9 h-9 
          rounded-[50%] border-[0.1rem] cursor-pointer 
          ${isWithErrors ? "border-error-red" : BORDER_NORMAL_COLOR} 
          ${isWithErrors ? "hover:border-error-red" : HOVER_BORDER_NORMAL_COLOR} 
          ${backgroundColor} 
          ${isWithErrors ? "hover:bg-error-red" : HOVER_BACKGROUND_NORMAL_COLOR} 
          ${textColor} hover:text-white transition-all ease-in duration-100
        `}
      >
        <p className={`font-medium text-[1rem]`}>{sectionIndex}</p>
      </div>
      <p
        className={`
          font-normal text-standard-size text-center 
          ${isWithErrors ? "text-error-red" : TEXT_NORMAL_COLOR}
        `}
      >
        {sectionTitle}
      </p>
      {isLast && (
        <div
          className={`
            w-[8rem] border-[0.063rem]  
            ${isWithErrors ? "border-error-red" : BORDER_NORMAL_COLOR}
          `}
        ></div>
      )}
    </>
  );
};
