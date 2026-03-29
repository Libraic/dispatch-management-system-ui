import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  HOVER_BACKGROUND_SOLID_COLOR,
  BACKGROUND_NORMAL_COLOR,
} from "../../../../tailwind/tailwind-colors-vars.ts";
import { SYSTEM_FONT_NORMAL } from "../../../../tailwind/tailwind-font-vars.ts";

export const NavigableButton: React.FC<{
  navigationAddress: string;
  label: string;
  icon: string;
}> = ({ navigationAddress, label, icon }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(navigationAddress)}
      className={`flex flex-row items-center ${SYSTEM_FONT_NORMAL} px-3 py-1 rounded-[0.25rem] hover:cursor-pointer ${BACKGROUND_NORMAL_COLOR} ${HOVER_BACKGROUND_SOLID_COLOR} text-white text-[0.85rem] hover:border-none gap-x-[0.5rem]`}
    >
      <img className="w-6 h-6" src={icon} alt="table-icon" />
      <p>{label}</p>
    </div>
  );
};
