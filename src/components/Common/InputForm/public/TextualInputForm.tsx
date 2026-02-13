import * as React from "react";
import { InputFormContainer } from "../internal/InputFormContainer.tsx";

export const TextualInputForm: React.FC<{
  label: string;
  placeholder: string;
  inputFieldValue: string;
  saveInputData: (value: string) => void;
  isMandatory?: boolean;
  errorMessage?: string;
  information?: string;
  onFocus?: () => void;
}> = ({
  label,
  placeholder,
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
      placeholder={placeholder}
      inputFieldValue={inputFieldValue}
      inputMode="text"
      type="text"
      saveInputData={saveInputData}
      isMandatory={isMandatory}
      errorMessage={errorMessage}
      information={information}
      onFocus={onFocus}
    />
  );
};
