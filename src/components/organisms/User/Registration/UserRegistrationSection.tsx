import * as React from "react";
import { useState } from "react";

import errorIcon from "../../../../assets/registration/section-in-progress-error.svg";
import { BACKGROUND_SOLID_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";

const getBackgroundColor = (
  isSectionActive: boolean,
  isSectionWithErrors: boolean,
  isSectionHovered: boolean,
) => {
  if (!isSectionActive && !isSectionHovered && !isSectionWithErrors) {
    return "bg-solid-black";
  }

  if (isSectionWithErrors) {
    if (isSectionHovered || isSectionActive) {
      return "bg-error-red";
    }

    return "bg-solid-black";
  }

  return BACKGROUND_SOLID_COLOR;
};

export const UserRegistrationSection: React.FC<{
  sectionTitle: string;
  isSectionActive: boolean;
  isSectionError: boolean;
  activateSection: () => void;
}> = ({ sectionTitle, isSectionActive, isSectionError, activateSection }) => {
  const [isHovered, setIsHovered] = useState(false);
  const backgroundColor = getBackgroundColor(
    isSectionActive,
    isSectionError,
    isHovered,
  );
  const hoverBackgroundColor = `hover:${backgroundColor}`;
  return (
    <div
      className={`flex justify-between items-center ${backgroundColor} ${hoverBackgroundColor} cursor-pointer rounded-xl min-h-6 w-40 transition-colors ease-in duration-100 px-2`}
      onClick={activateSection}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className={`font-lato font-bold text-[0.9rem] text-white`}>
        {sectionTitle}
      </p>
      {isSectionError && !isHovered && !isSectionActive && (
        <img className="w-4 h-4" src={errorIcon} alt="error-icon" />
      )}
    </div>
  );
};
