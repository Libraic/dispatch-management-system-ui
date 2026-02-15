import * as React from "react";
import { type ChangeEvent, useState } from "react";
import { BORDER_SOLID_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";
import { InputFormLabel } from "./InputFormLabel.tsx";
import { INPUT_FORM_STYLE } from "../../../../tailwind/tailwind.ts";
import { getInputTagNameFromLabel } from "../../../../utils/global/input-form-utils.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import { InputFormError } from "../public/InputFormError.tsx";
import type { TailwindProperties } from "../../../../types/internal/style.ts";

export const InputFormContainer: React.FC<{
  label: string;
  placeholder: string;
  inputFieldValue: string;
  inputMode:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  type: string;
  saveInputData: (value: string) => void;
  isMandatory?: boolean;
  errorMessage?: string;
  information?: string;
  inputPreprocessor?: (value: string) => string;
  onFocus?: () => void;
  tailwindProperties?: TailwindProperties;
}> = ({
  label,
  placeholder,
  inputFieldValue,
  inputMode,
  type,
  saveInputData,
  isMandatory,
  information,
  onFocus,
  errorMessage,
  inputPreprocessor,
  tailwindProperties,
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
    const input = inputPreprocessor
      ? inputPreprocessor(e.target.value)
      : e.target.value;
    saveInputData(input);
  };

  const maxWeight = tailwindProperties
    ? tailwindProperties.maxWeight
    : "max-w-[20rem]";

  return (
    <div className="flex flex-col min-h-[6.5rem]">
      <div
        className={`flex flex-col px-5 py-1 justify-start items-start border-2 bg-white ${borderColor} rounded-[2rem] ${maxWeight}`}
      >
        <InputFormLabel
          label={label}
          information={information}
          isMandatory={isMandatory}
        />

        <input
          className={`${INPUT_FORM_STYLE} w-[15rem]`}
          inputMode={inputMode}
          type={type}
          name={getInputTagNameFromLabel(label)}
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
