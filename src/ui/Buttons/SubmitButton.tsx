import * as React from "react";
import {
  BORDER_SOLID_COLOR,
  HOVER_BACKGROUND_NORMAL_COLOR,
  HOVER_BORDER_NORMAL_COLOR,
} from "#/shared/constants/tailwind/tailwindColors.constants";
import type { TailwindProperties } from "#/types/internal/style";

type SubmitButtonProps = {
  actionText: string;
  action: (e: React.FormEvent) => void;
  isInteractable?: boolean;
  tailwindProperties?: TailwindProperties;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  actionText,
  action,
  isInteractable,
  tailwindProperties,
}) => {
  const interactable = isInteractable ?? true;
  return (
    <button
      className={`
        min-w-[5rem] border-1 py-[0.3rem] px-[0.4rem]
        ${tailwindProperties?.borderColor ?? BORDER_SOLID_COLOR} 
        ${tailwindProperties?.backgroundColor ?? "bg-white"}
        rounded-lg
        ${tailwindProperties?.textColor ?? "text-black"}
        text-[1rem] hover:text-white font-medium
        ${tailwindProperties?.hoverBackgroundColor ?? HOVER_BACKGROUND_NORMAL_COLOR} 
        ${tailwindProperties?.hoverBorderColor ?? HOVER_BORDER_NORMAL_COLOR}
        ${interactable ? "hover:cursor-pointer" : "hover:cursor-not-allowed"}  
        transition-all ease-in duration-150
      `}
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
