import expandedIcon from "../../assets/registration/sections/expanded-portion.svg";
import contractedIcon from "../../assets/registration/sections/contracted-portion.svg";
import * as React from "react";
import { colorTransitionStyle } from "../../utils/tailwind.ts";

export const SectionDivision: React.FC<{
  division: string;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ division, isExpanded, setIsExpanded }) => {
  const textColor = isExpanded ? "text-black" : "text-[#999999]";
  const activeIcon = isExpanded ? expandedIcon : contractedIcon;
  return (
    <div className="flex flex-col gap-x-1 mb-5">
      <div className="flex flex-row items-center gap-x-1">
        <img
          className={`w-4 cursor-pointer transition-transform duration-300 ${
            isExpanded ? "rotate-90" : "rotate-0"
          }`}
          src={activeIcon}
          alt="contract"
          onClick={() => setIsExpanded((prev) => !prev)}
        />
        <p
          className={`font-roboto-400 text-[1rem] ${textColor} ${colorTransitionStyle}`}
        >
          {division}
        </p>
      </div>
      <p
        className={`font-roboto-200 m-0 p-0 tracking-tight ${textColor} ${colorTransitionStyle}`}
      >
        _______________________________________________________________________________________________________________________________________________________________
      </p>
    </div>
  );
};
