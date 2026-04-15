import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  BACKGROUND_NORMAL_COLOR,
  HOVER_BACKGROUND_SOLID_COLOR,
} from "../../../../tailwind/tailwind-colors-vars.ts";
import { SYSTEM_FONT_NORMAL } from "../../../../tailwind/tailwind-font-vars.ts";
import { GoogleIcon } from "../../../../shared/components/GoogleIcon/GoogleIcon.tsx";

export const NavigableButton: React.FC<{
  navigationAddress: string;
  label: string;
  iconCode: string;
}> = ({ navigationAddress, label, iconCode }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(navigationAddress)}
      className={`flex flex-row items-center ${SYSTEM_FONT_NORMAL} px-3 py-1 rounded-[0.25rem] hover:cursor-pointer ${BACKGROUND_NORMAL_COLOR} ${HOVER_BACKGROUND_SOLID_COLOR} text-white text-[0.85rem] hover:border-none gap-x-[0.5rem]`}
    >
      <GoogleIcon code={iconCode} size={1.62} fontColor="#fff" />
      <p>{label}</p>
    </div>
  );
};
