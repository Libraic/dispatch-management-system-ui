import * as React from "react";
import { InputFieldContainer } from "#/ui/InputField/components/internal/InputFieldContainer/InputFieldContainer";
import { sanitizeNumber } from "#/ui/InputField/components/public/NumericInputField/NumericInputField.utils";
import { formatStringNumber } from "#/ui/InputField/utils/InputField.utils";
import type { TailwindProperties } from "#/types/internal/style";

type NumericInputFieldProps = {
  label: string;
  placeholder: string;
  inputFieldValue: string;
  saveInputData: (value: string) => void;
  isMandatory?: boolean;
  errorMessage?: string;
  information?: string;
  onFocus?: () => void;
  tailwindProperties?: TailwindProperties;
  isReadOnly?: boolean;
};

export const NumericInputField: React.FC<NumericInputFieldProps> = ({
  label,
  placeholder,
  inputFieldValue,
  isMandatory,
  onFocus,
  errorMessage,
  saveInputData,
  tailwindProperties,
  isReadOnly,
}) => {
  return (
    <InputFieldContainer
      label={label}
      placeholder={placeholder}
      inputFieldValue={formatStringNumber(inputFieldValue)}
      inputMode="decimal"
      type="text"
      saveInputData={saveInputData}
      isMandatory={isMandatory}
      errorMessage={errorMessage}
      onFocus={onFocus}
      inputPreprocessor={sanitizeNumber}
      tailwindProperties={tailwindProperties}
      isReadOnly={isReadOnly}
    />
  );
};
