import { type ChangeEvent, forwardRef, useState } from "react";
import { getInputTagNameFromLabel } from "../../../../utils/global/input-form-utils.ts";
import { ErrorContainer } from "../public/ErrorContainer.tsx";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import { SYSTEM_FONT_LIGHT } from "../../../../tailwind/tailwind-font-vars.ts";
import { InputFormLabel } from "./InputFormLabel.tsx";
import type { InputFormContainerData } from "../../../../types/internal/forms/input-form-types.ts";

export const InputFieldContainer = forwardRef<
  HTMLDivElement,
  InputFormContainerData
>(
  (
    {
      label,
      placeholder,
      inputFieldValue,
      inputMode,
      type,
      saveInputData,
      isMandatory,
      onFocus,
      errorMessage,
      inputPreprocessor,
      tailwindProperties,
      isReadOnly,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
      setIsFocused(true);
      if (onFocus) {
        onFocus();
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const input = inputPreprocessor
        ? inputPreprocessor(e.target.value)
        : e.target.value;
      saveInputData(input);
    };

    const borderColor = errorMessage
      ? "border-error-red"
      : isFocused
        ? "border-light-blue"
        : "border-light-grey";

    const inputFieldPlaceholder =
      !isFocused && (inputFieldValue === BLANK_STRING || !inputFieldValue)
        ? placeholder
        : BLANK_STRING;

    return (
      <div className={`flex flex-col min-h-[6.5rem]`}>
        <div
          ref={ref}
          className={`
            relative px-5 border-2 bg-white rounded-[2rem] 
            ${tailwindProperties?.maxWeight || "max-w-[20rem]"} 
            ${borderColor}
          `}
        >
          <InputFormLabel
            label={label}
            isFocused={isFocused}
            isMandatory={isMandatory}
            isError={errorMessage !== undefined && errorMessage !== null}
          />

          <input
            disabled={isReadOnly}
            className={`
              py-[1.15rem] leading-none ${SYSTEM_FONT_LIGHT} text-[0.85rem] 
              bg-transparent rounded-sm border-none focus:outline-none w-[15rem] 
              ${isReadOnly && "cursor-not-allowed text-[#9ca3af]"}
            `}
            inputMode={inputMode}
            type={type}
            autoComplete="off"
            name={getInputTagNameFromLabel(label)}
            placeholder={inputFieldPlaceholder}
            value={inputFieldValue}
            onFocus={handleFocus}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
          />
        </div>

        {errorMessage && <ErrorContainer errorMessage={errorMessage} />}
      </div>
    );
  },
);
