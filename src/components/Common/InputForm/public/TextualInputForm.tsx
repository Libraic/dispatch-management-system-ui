import { forwardRef } from "react";
import { InputFormContainer } from "../internal/InputFormContainer.tsx";
import type { TextualInputFormData } from "../../../../types/internal/forms/input-form-types.ts";

export const TextualInputForm = forwardRef<
  HTMLDivElement,
  TextualInputFormData
>(
  (
    {
      label,
      placeholder,
      inputFieldValue,
      isMandatory,
      information,
      onFocus,
      errorMessage,
      saveInputData,
      tailwindProperties,
    },
    ref,
  ) => {
    return (
      <InputFormContainer
        label={label}
        placeholder={placeholder}
        inputFieldValue={inputFieldValue}
        inputMode="text"
        type="text"
        saveInputData={saveInputData}
        isMandatory={isMandatory}
        errorMessage={errorMessage}
        information={information}
        onFocus={onFocus}
        tailwindProperties={tailwindProperties}
        ref={ref}
      />
    );
  },
);
