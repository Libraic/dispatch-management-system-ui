import mandatoryFieldIcon from "../../../../assets/global/mandatory-field.svg";
import { InputFormDescription } from "./InputFormDescription.tsx";
import * as React from "react";
import {
  SYSTEM_FONT_LIGHT,
  SYSTEM_FONT_NORMAL,
} from "../../../../tailwind/tailwind-font-vars.ts";

export const InputFormLabel: React.FC<{
  label: string;
  isFocused: boolean;
  information?: string;
  isMandatory?: boolean;
}> = ({ label, isFocused, information, isMandatory }) => {
  return (
    <label
      className={`
        absolute left-3 transition-all duration-200 ease-in-out ${isFocused ? SYSTEM_FONT_NORMAL : SYSTEM_FONT_LIGHT}
        -top-[0.55rem] text-xs ${isFocused && "text-light-blue"}
        flex items-center gap-x-1
      `}
    >
      <div className="flex flex-row items-center justify-center gap-x-[0.1rem] bg-white z-1 w-fit px-[0.5rem]">
        {isMandatory && (
          <img
            className="w-[0.6rem]"
            src={mandatoryFieldIcon}
            alt="mandatory-icon"
          />
        )}
        <p>{label}</p>
        {information && <InputFormDescription information={information} />}
      </div>
    </label>
  );
};
