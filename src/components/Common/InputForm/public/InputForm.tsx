import * as React from "react";
import { type ChangeEvent, useState } from "react";
import {
  BLANK_STRING,
  HYPHEN,
} from "../../../../constants/common/global-constants.ts";
import { INPUT_FORM_STYLE } from "../../../../tailwind/tailwind.ts";
import { InputFormError } from "./InputFormError.tsx";
import { InputFormLabel } from "../internal/InputFormLabel.tsx";
import { BORDER_SOLID_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";

export const InputForm: React.FC<{
  label: string;
  placeholder: string;
  type: string;
  inputFieldValue: string;
  isMandatory?: boolean;
  errorMessage?: string;
  information?: string;
  onFocus?: () => void;
  saveInputData: (value: string) => void;
}> = ({
  label,
  placeholder,
  type,
  inputFieldValue,
  isMandatory,
  information,
  onFocus,
  errorMessage,
  saveInputData,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [borderColor, setBorderColor] = useState("border-light-grey");
  const handleFocus = () => {
    setIsFocused(true);
    setBorderColor(BORDER_SOLID_COLOR);
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setBorderColor("border-light-grey");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    saveInputData(e.target.value);
  };

  const name = label.toLowerCase().replace(" ", HYPHEN);

  return (
    <div className="flex flex-col gap-y-2 min-h-[6.5rem]">
      <div
        className={`flex flex-col px-5 py-1 justify-start items-start border-2 bg-white ${borderColor} rounded-[2rem] max-w-[20rem]`}
      >
        <InputFormLabel
          label={label}
          information={information}
          isMandatory={isMandatory}
        />

        <input
          className={`${INPUT_FORM_STYLE} w-[15rem]`}
          type={type}
          name={name}
          placeholder={
            !isFocused && (inputFieldValue === BLANK_STRING || !inputFieldValue)
              ? placeholder
              : BLANK_STRING
          }
          value={inputFieldValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>
      {!!errorMessage?.length && <InputFormError errorMessage={errorMessage} />}
    </div>
  );
};
