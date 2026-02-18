import * as React from "react";
import { type ChangeEvent, useState } from "react";
import { getInputTagNameFromLabel } from "../../../../utils/global/input-form-utils.ts";
import { InputFormError } from "../public/InputFormError.tsx";
import type { TailwindProperties } from "../../../../types/internal/style.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import { SYSTEM_FONT_LIGHT } from "../../../../tailwind/tailwind-font-vars.ts";
import { InputFormLabel } from "./InputFormLabel.tsx";
import { BORDER_SOLID_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";

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
  isReadOnly?: boolean;
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
  isReadOnly,
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

  const maxWidth = tailwindProperties?.maxWeight || "max-w-[20rem]";

  return (
    <div className={`flex flex-col min-h-[6.5rem]`}>
      <div
        className={`relative px-5 border-2 bg-white ${borderColor} rounded-[2rem] ${maxWidth}`}
      >
        <InputFormLabel
          label={label}
          isFocused={isFocused}
          isMandatory={isMandatory}
          information={information}
        />

        <input
          disabled={isReadOnly}
          className={`py-[1.15rem] leading-none ${SYSTEM_FONT_LIGHT} text-[0.85rem] bg-transparent rounded-sm border-none focus:outline-none w-[15rem] ${isReadOnly && "cursor-not-allowed text-[#9ca3af]"}`}
          inputMode={inputMode}
          type={type}
          autoComplete="off"
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

      {errorMessage && <InputFormError errorMessage={errorMessage} />}
    </div>
  );
};
