import incompleteSectionIcon from "../assets/incomplete-section.svg";
import incompleteSectionErrorIcon from "../assets/incomplete-section-error.svg";
import completedSectionIcon from "../assets/completed-section.svg";
import * as React from "react";

export const RegistrationSection: React.FC<{
  sectionTitle: string;
  setFocusedSection: () => void;
  isSectionComplete: boolean;
  isSectionActive: boolean;
  isSectionError: boolean;
}> = ({
  sectionTitle,
  setFocusedSection,
  isSectionComplete,
  isSectionActive,
  isSectionError,
}) => {
  const icon = isSectionComplete
    ? completedSectionIcon
    : isSectionError
      ? incompleteSectionErrorIcon
      : incompleteSectionIcon;
  const iconStylesClass = isSectionComplete
    ? "w-[1rem] h-[1rem]"
    : "w-[0.75rem] h-[0.75rem]";
  const textColor = isSectionActive ? "text-black" : "text-[#999999]";
  return (
    <div
      className="flex justify-between items-center hover:bg-[#e7e8ee] hover:cursor-pointer rounded-xl min-h-6 w-40 transition-colors ease-in duration-200 pl-2 pr-2"
      onClick={setFocusedSection}
    >
      <p className={`text-standard-size font-inter-300 ${textColor}`}>
        {sectionTitle}
      </p>
      {isSectionActive && (
        <img className={iconStylesClass} src={icon} alt="Section icon" />
      )}
    </div>
  );
};
