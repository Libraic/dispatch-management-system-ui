import * as React from "react";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import { InputFormContainer } from "../internal/InputFormContainer.tsx";
import { formatStringNumber } from "../../../../utils/global/number-utils.ts";
import type { TailwindProperties } from "../../../../types/internal/style.ts";

export const NumericInputForm: React.FC<{
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
  isReadOnly,
}) => {
  const sanitizeNumber = (input: string) => {
    const commasOmittedInput = input.replace(/,/g, BLANK_STRING);
    const regex = /^-?\d+(\.\d*)?$/;
    if (!regex.test(commasOmittedInput)) {
      return commasOmittedInput.substring(0, commasOmittedInput.length - 1);
    }

    return commasOmittedInput;
  };

  return (
    <InputFormContainer
      label={label}
      placeholder={placeholder}
      inputFieldValue={formatStringNumber(inputFieldValue)}
      inputMode="decimal"
      type="text"
      saveInputData={saveInputData}
      isMandatory={isMandatory}
      errorMessage={errorMessage}
      information={information}
      onFocus={onFocus}
      inputPreprocessor={sanitizeNumber}
      tailwindProperties={tailwindProperties}
      isReadOnly={isReadOnly}
    />
  );
};
