import { forwardRef } from "react";
import { InputFieldContainer } from "../internal/InputFieldContainer.tsx";
import type { TextualInputFormData } from "../../../../types/internal/forms/input-form-types.ts";

export const TextualInputField = forwardRef<
  HTMLDivElement,
  TextualInputFormData
>(
  (
    {
      label,
      placeholder,
      inputFieldValue,
      isMandatory,
      onFocus,
      errorMessage,
      saveInputData,
      tailwindProperties,
    },
    ref,
  ) => {
    return (
      <InputFieldContainer
        label={label}
        placeholder={placeholder}
        inputFieldValue={inputFieldValue}
        inputMode="text"
        type="text"
        saveInputData={saveInputData}
        isMandatory={isMandatory}
        errorMessage={errorMessage}
        onFocus={onFocus}
        tailwindProperties={tailwindProperties}
        ref={ref}
      />
    );
  },
);
