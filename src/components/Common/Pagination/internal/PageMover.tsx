import previousIcon from "../../../../assets/global/previous.svg";
import * as React from "react";
import { useState } from "react";
import {
  HOVER_BACKGROUND_NORMAL_COLOR,
  HOVER_BORDER_NORMAL_COLOR,
} from "../../../../tailwind/tailwind-colors-vars.ts";
import { SYSTEM_FONT_NORMAL } from "../../../../tailwind/tailwind-font-vars.ts";

export const PageMover: React.FC<{
  activeIcon: string;
  inactiveIcon: string;
  label: string;
  action: () => void;
}> = ({ activeIcon, inactiveIcon, label, action }) => {
  const [icon, setIcon] = useState(previousIcon);
  return (
    <div
      onMouseEnter={() => setIcon(activeIcon)}
      onMouseLeave={() => setIcon(inactiveIcon)}
      onClick={action}
      className={`flex flex-row items-center justify-center gap-x-1 border-[0.09rem] rounded-[0.2rem] border-[#cccccc] px-2 py-1 w-[6rem] text-[#808588] hover:cursor-pointer ${HOVER_BORDER_NORMAL_COLOR} ${HOVER_BACKGROUND_NORMAL_COLOR} hover:text-white`}
    >
      <img className="w-4 h-4" src={icon} alt="previous-icon" />
      <p className={`text-[0.8rem] ${SYSTEM_FONT_NORMAL}`}>{label}</p>
    </div>
  );
};
