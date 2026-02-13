import * as React from "react";
import { InputFormContainer } from "../internal/InputFormContainer.tsx";
import { PASSWORD_PLACEHOLDER } from "../../../../constants/common/placeholder-constants.ts";

export const PasswordInputForm: React.FC<{
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
  information,
  onFocus,
  errorMessage,
  saveInputData,
}) => {
  return (
    <InputFormContainer
      label={label}
      placeholder={PASSWORD_PLACEHOLDER}
      inputFieldValue={inputFieldValue}
      inputMode="text"
      type="password"
      saveInputData={saveInputData}
      isMandatory={isMandatory}
      errorMessage={errorMessage}
      information={information}
      onFocus={onFocus}
    />
  );
};
