import { type ChangeEvent, forwardRef, useState } from "react";
import { ErrorContainer } from "#/ui/ErrorContainer/ErrorContainer";
import { BLANK_STRING } from "#/constants/common/global-constants";
import { InputFieldLabel } from "#/ui/InputField/components/public/InputFieldLabel";
import type { InputFieldContainerProps } from "#/ui/InputField/components/internal/InputFieldContainer/InputFieldContainer.types";
import { getInputTagNameFromLabel } from "#/ui/InputField/components/internal/InputFieldContainer/InputFieldContainer.utils";

export const InputField = forwardRef<HTMLDivElement, InputFieldContainerProps>(
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
      formatter,
      validator,
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
      const isValid = !validator || (validator && validator(e.target.value));
      if (isValid) {
        const input = inputPreprocessor
          ? inputPreprocessor(e.target.value)
          : e.target.value;
        saveInputData(input);
      }
    };

    const borderColor = errorMessage
      ? "border-error-red"
      : isFocused
        ? "border-light-blue"
        : "border-light-grey";

    const inputFieldPlaceholder =
      !isFocused && (!inputFieldValue || inputFieldValue === BLANK_STRING)
        ? placeholder
        : BLANK_STRING;

    return (
      <div
        className={`
        flex flex-col 
        ${tailwindProperties?.minHeight ?? "min-h-[6.5rem]"}
      `}
      >
        <div
          ref={ref}
          className={`
            relative px-5 border-2 bg-white rounded-[2rem] 
            ${tailwindProperties?.width || "max-w-[20rem]"} 
            ${borderColor}
          `}
        >
          <InputFieldLabel
            label={label}
            isFocused={isFocused}
            isMandatory={isMandatory}
            isError={Boolean(errorMessage)}
          />

          <input
            disabled={isReadOnly}
            className={`
              py-[1.15rem] leading-none font-light text-[0.85rem] 
              bg-transparent rounded-sm border-none focus:outline-none w-full
              ${!isFocused ? "truncate" : BLANK_STRING}
              ${isReadOnly && "cursor-not-allowed text-[#9ca3af]"}
            `}
            inputMode={inputMode}
            type={type}
            autoComplete="off"
            name={getInputTagNameFromLabel(label)}
            placeholder={inputFieldPlaceholder}
            value={
              inputFieldValue
                ? formatter
                  ? formatter(inputFieldValue)
                  : inputFieldValue
                : BLANK_STRING
            }
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
