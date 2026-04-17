import * as React from "react";
import { InputFieldContainer } from "#/ui/InputField/components/internal/InputFieldContainer/InputFieldContainer";
import { PASSWORD_PLACEHOLDER } from "#/constants/common/placeholder-constants";

type PasswordInputFieldProps = {
  label: string;
  inputFieldValue: string;
  saveInputData: (value: string) => void;
  isMandatory?: boolean;
  errorMessage?: string;
  information?: string;
  onFocus?: () => void;
};

export const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  label,
  inputFieldValue,
  isMandatory,
  onFocus,
  errorMessage,
  saveInputData,
}) => {
  return (
    <InputFieldContainer
      label={label}
      placeholder={PASSWORD_PLACEHOLDER}
      inputFieldValue={inputFieldValue}
      inputMode="text"
      type="password"
      saveInputData={saveInputData}
      isMandatory={isMandatory}
      errorMessage={errorMessage}
      onFocus={onFocus}
    />
  );
};
