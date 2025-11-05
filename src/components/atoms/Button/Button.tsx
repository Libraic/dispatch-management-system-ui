import * as React from "react";
import {
  BORDER_NORMAL_COLOR,
  HOVER_BACKGROUND_SOLID_COLOR,
} from "../../../tailwind/tailwind-colors-vars.ts";

export const Button: React.FC<{
  label: string;
  action: () => void;
}> = ({ label, action }) => {
  return (
    <button
      onClick={action}
      className={`font-lato font-normal px-4 py-2 rounded-lg hover:cursor-pointer ${BORDER_NORMAL_COLOR} border-1 ${HOVER_BACKGROUND_SOLID_COLOR} hover:text-white transition-all ease-in duration-150 hover:border-none`}
    >
      {label}
    </button>
  );
};
