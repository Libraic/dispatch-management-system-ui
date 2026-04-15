import * as React from "react";
import { InputFieldContainer } from "../internal/InputFieldContainer.tsx";
import { PASSWORD_PLACEHOLDER } from "../../../../constants/common/placeholder-constants.ts";

export const PasswordInputField: React.FC<{
  label: string;
  inputFieldValue: string;
  saveInputData: (value: string) => void;
  isMandatory?: boolean;
  errorMessage?: string;
  information?: string;
  onFocus?: () => void;
}> = ({
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
