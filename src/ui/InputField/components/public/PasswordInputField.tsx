import * as React from "react";
import { InputField } from "#/ui/InputField/components/internal/InputFieldContainer/InputField";
import { PASSWORD_PLACEHOLDER } from "#/constants/common/placeholder-constants";
import type { TailwindProperties } from "#/types/internal/style";

type PasswordInputFieldProps = {
  label: string;
  inputFieldValue: string;
  saveInputData: (value: string) => void;
  isMandatory?: boolean;
  errorMessage?: string;
  information?: string;
  onFocus?: () => void;
  tailwindProperties?: TailwindProperties;
};

export const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  label,
  inputFieldValue,
  isMandatory,
  onFocus,
  errorMessage,
  saveInputData,
  tailwindProperties,
}) => {
  return (
    <InputField
      label={label}
      placeholder={PASSWORD_PLACEHOLDER}
      inputFieldValue={inputFieldValue}
      inputMode="text"
      type="password"
      saveInputData={saveInputData}
      isMandatory={isMandatory}
      errorMessage={errorMessage}
      onFocus={onFocus}
      tailwindProperties={tailwindProperties}
    />
  );
};
