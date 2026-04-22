import { forwardRef } from "react";
import { InputField } from "#/ui/InputField/components/internal/InputFieldContainer/InputField";
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
      <InputField
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
