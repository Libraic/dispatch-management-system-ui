import incompleteSectionIcon from "../assets/incomplete-section.svg";
import * as React from "react";

export const RegistrationSection: React.FC<{
  sectionTitle: string;
  activateSection: () => void;
}> = ({ sectionTitle, activateSection }) => {
  return (
    <div
      className="flex justify-between items-center hover:bg-[#e7e8ee] hover:cursor-pointer rounded-xl min-h-6 w-40 transition-colors ease-in duration-200 pl-2 pr-2"
      onClick={activateSection}
    >
      <p className="text-[0.8rem] font-inter-300">{sectionTitle}</p>
      <img
        className="w-2.75 h-2.75"
        src={incompleteSectionIcon}
        alt="Incomplete Profile"
      />
    </div>
  );
};
