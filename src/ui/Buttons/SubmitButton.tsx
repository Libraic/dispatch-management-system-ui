import * as React from "react";
import {
  BORDER_SOLID_COLOR,
  HOVER_BACKGROUND_SOLID_COLOR,
  HOVER_BORDER_SOLID_COLOR,
} from "#/tailwind/tailwind-colors-vars";
import { SYSTEM_FONT_MEDIUM } from "#/tailwind/tailwind-font-vars";

type SubmitButtonProps = {
  actionText: string;
  action: (e: React.FormEvent) => void;
  isInteractable?: boolean;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  actionText,
  action,
  isInteractable,
}) => {
  const interactable = isInteractable ?? true;
  return (
    <button
      className={`min-w-[5rem] border-1 ${BORDER_SOLID_COLOR} rounded-3xl text-black bg-white  text-[1rem] py-[0.2rem] px-[0.4rem] ${HOVER_BACKGROUND_SOLID_COLOR} ${HOVER_BORDER_SOLID_COLOR} hover:text-white ${interactable ? "hover:cursor-pointer" : "hover:cursor-not-allowed"} ${SYSTEM_FONT_MEDIUM} transition-all ease-in duration-150`}
      onClick={(e: React.FormEvent) => {
        if (interactable) {
          action(e);
        }
      }}
    >
      {actionText}
    </button>
  );
};
