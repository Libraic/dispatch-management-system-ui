import * as React from "react";
import { BLANK_STRING, DOLLAR_SIGN } from "#/constants/common/global-constants";
import { InputFieldContainer } from "#/ui/InputField/components/internal/InputFieldContainer/InputFieldContainer";
import { formatStringNumber } from "#/ui/InputField/utils/InputField.utils";
import { sanitizeCurrency } from "#/ui/InputField/components/public/CurrencyInputField/CurrencyInputField.utils";
import type { TailwindProperties } from "#/types/internal/style";

type CurrencyInputFieldProps = {
  label: string;
  placeholder: string;
  inputFieldValue: string;
  isMandatory?: boolean;
  errorMessage?: string;
  information?: string;
  onFocus?: () => void;
  saveInputData: (value: string) => void;
  tailwindProperties?: TailwindProperties;
};

export const CurrencyInputField: React.FC<CurrencyInputFieldProps> = ({
  label,
  placeholder,
  inputFieldValue,
  isMandatory,
  onFocus,
  errorMessage,
  saveInputData,
  tailwindProperties,
}) => {
  return (
    <InputFieldContainer
      label={label}
      placeholder={placeholder}
      inputFieldValue={
        inputFieldValue !== BLANK_STRING
          ? `${DOLLAR_SIGN} ${formatStringNumber(inputFieldValue)}`
          : `${formatStringNumber(inputFieldValue)}`
      }
      inputMode="decimal"
      type="text"
      saveInputData={saveInputData}
      isMandatory={isMandatory}
      errorMessage={errorMessage}
      onFocus={onFocus}
      inputPreprocessor={sanitizeCurrency}
      tailwindProperties={tailwindProperties}
    />
  );
};
