import * as React from "react";
import {
  SYSTEM_FONT_LIGHT,
  SYSTEM_FONT_NORMAL,
} from "#/tailwind/tailwind-font-vars";
import { GoogleIcon } from "#/ui/GoogleIcon/GoogleIcon";

type InputFieldLabelProps = {
  label: string;
  isFocused: boolean;
  isMandatory?: boolean;
  isError?: boolean;
};

export const InputFieldLabel: React.FC<InputFieldLabelProps> = ({
  label,
  isFocused,
  isMandatory,
  isError = false,
}) => {
  const textColor = isError
    ? "text-error-red"
    : isFocused
      ? "text-light-blue"
      : "text-black";
  return (
    <label
      className={`
        absolute left-3 transition-all duration-200 ease-in-out 
        ${isFocused ? SYSTEM_FONT_NORMAL : SYSTEM_FONT_LIGHT} text-xs ${textColor}
        -top-[0.55rem]
        flex items-center gap-x-1
      `}
    >
      <div className="flex flex-row items-center justify-center gap-x-[0.1rem] bg-white z-1 w-fit px-[0.5rem]">
        {isMandatory && (
          <GoogleIcon code="asterisk" fontColor="#d32d2d" size={0.62} />
        )}
        <p>{label}</p>
      </div>
    </label>
  );
};
