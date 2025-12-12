import * as React from "react";
import { COLOR_TRANSITION_STYLE } from "../../../tailwind/tailwind.ts";
import {
  BORDER_SOLID_COLOR,
  HOVER_BORDER_SOLID_COLOR,
  HOVER_BACKGROUND_SOLID_COLOR,
} from "../../../tailwind/tailwind-colors-vars.ts";

export const SubmitButton: React.FC<{
  actionText: string;
  action: (e: React.FormEvent) => void;
}> = ({ actionText, action }) => {
  return (
    <button
      className={`min-w-[5rem] border-1 ${BORDER_SOLID_COLOR} rounded-3xl text-black bg-white  text-[1rem] py-[0.2rem] px-[0.4rem] ${HOVER_BACKGROUND_SOLID_COLOR} ${HOVER_BORDER_SOLID_COLOR} hover:text-white hover:cursor-pointer font-roboto font-medium ${COLOR_TRANSITION_STYLE}`}
      onClick={action}
    >
      {actionText}
    </button>
  );
};
