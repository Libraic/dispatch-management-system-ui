import * as React from "react";
import { InputFormContainer } from "../internal/InputFormContainer.tsx";
import type { TailwindProperties } from "../../../../types/internal/style.ts";

export const TextualInputForm: React.FC<{
  label: string;
  placeholder: string;
  inputFieldValue: string;
  saveInputData: (value: string) => void;
  isMandatory?: boolean;
  errorMessage?: string;
  information?: string;
  onFocus?: () => void;
  tailwindProperties?: TailwindProperties;
}> = ({
  label,
  placeholder,
  inputFieldValue,
  isMandatory,
  information,
  onFocus,
  errorMessage,
  saveInputData,
  tailwindProperties,
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
      tailwindProperties={tailwindProperties}
    />
  );
};
