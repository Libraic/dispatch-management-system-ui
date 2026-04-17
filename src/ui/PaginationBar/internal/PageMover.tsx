import * as React from "react";
import {
  HOVER_BACKGROUND_NORMAL_COLOR,
  HOVER_BORDER_NORMAL_COLOR,
} from "#/tailwind/tailwind-colors-vars";
import { SYSTEM_FONT_NORMAL } from "#/tailwind/tailwind-font-vars";

type PageMoverProps = {
  icon: React.ReactNode;
  label: string;
  action: () => void;
};

export const PageMover: React.FC<PageMoverProps> = ({
  icon,
  label,
  action,
}) => {
  return (
    <div
      onClick={action}
      className={`flex flex-row items-center justify-center gap-x-1 border-[0.09rem] rounded-[0.2rem] border-[#cccccc] px-2 py-1 w-[6rem] text-[#808588] hover:cursor-pointer ${HOVER_BORDER_NORMAL_COLOR} ${HOVER_BACKGROUND_NORMAL_COLOR} hover:text-white`}
    >
      {icon}
      <p className={`text-[0.8rem] ${SYSTEM_FONT_NORMAL}`}>{label}</p>
    </div>
  );
};
