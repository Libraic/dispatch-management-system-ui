import * as React from "react";
import {
  BLANK_STRING,
  DOLLAR_SIGN,
} from "../../../../constants/common/global-constants.ts";
import { InputFormContainer } from "../internal/InputFormContainer.tsx";
import { formatStringNumber } from "../../../../utils/global/number-utils.ts";
import type { TailwindProperties } from "../../../../types/internal/style.ts";

export const CurrencyInputForm: React.FC<{
  label: string;
  placeholder: string;
  inputFieldValue: string;
  isMandatory?: boolean;
  errorMessage?: string;
  information?: string;
  onFocus?: () => void;
  saveInputData: (value: string) => void;
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
}) => {
  const sanitizeNumber = (input: string) => {
    const commasOmittedInput = input.replace(/[,$\s]/g, BLANK_STRING);
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
      inputFieldValue={`${DOLLAR_SIGN} ${formatStringNumber(inputFieldValue)}`}
      inputMode="decimal"
      type="text"
      saveInputData={saveInputData}
      isMandatory={isMandatory}
      errorMessage={errorMessage}
      information={information}
      onFocus={onFocus}
      inputPreprocessor={sanitizeNumber}
      tailwindProperties={{ maxWeight: "max-w-[10rem]" }}
    />
  );
};
