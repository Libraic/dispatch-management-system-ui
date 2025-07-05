import incompleteSectionIcon from "../../assets/registration/sections/section-in-progress.svg";
import incompleteSectionErrorIcon from "../../assets/registration/sections/section-in-progress-error.svg";
import completedSectionIcon from "../../assets/registration/sections/completed-section.svg";
import * as React from "react";

export const UserRegistrationSection: React.FC<{
  sectionTitle: string;
  setFocusedSection: () => void;
  isSectionComplete: boolean;
  isSectionActive: boolean;
  isSectionError: boolean;
  isSectionFocused: boolean;
}> = ({
  sectionTitle,
  setFocusedSection,
  isSectionComplete,
  isSectionActive,
  isSectionError,
  isSectionFocused,
}) => {
  const icon = isSectionComplete
    ? completedSectionIcon
    : isSectionError
      ? incompleteSectionErrorIcon
      : incompleteSectionIcon;
  const iconStylesClass = isSectionComplete
    ? "w-[1rem] h-[1rem]"
    : "w-[0.85rem] h-[0.85rem]";
  const cursor = isSectionActive
    ? "hover:cursor-pointer"
    : "hover:cursor-not-allowed";
  const textColor = isSectionActive ? "text-white" : "text-[#999999]";
  const backgroundColor = isSectionFocused ? "bg-solid-blue" : "bg-[#212327]";
  return (
    <div
      className={`${backgroundColor} flex justify-between items-center hover:bg-solid-blue ${cursor} rounded-xl min-h-6 w-40 transition-colors ease-in duration-200 pl-2 pr-2`}
      onClick={setFocusedSection}
    >
      <p className={`font-lato font-bold text-[0.9rem] ${textColor}`}>
        {sectionTitle}
      </p>
      {isSectionActive && (
        <img className={iconStylesClass} src={icon} alt="Section icon" />
      )}
    </div>
  );
};
