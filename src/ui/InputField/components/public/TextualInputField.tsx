import { forwardRef } from "react";
import { InputFieldContainer } from "#/ui/InputField/components/internal/InputFieldContainer/InputFieldContainer";
import type { BaseInputFieldProps } from "#/ui/InputField/types/InputField.types";

interface TextualInputFieldProps extends BaseInputFieldProps {}

export const TextualInputField = forwardRef<
  HTMLDivElement,
  TextualInputFieldProps
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
      formatter,
      validator,
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
        formatter={formatter}
        validator={validator}
        ref={ref}
      />
    );
  },
);
