import type { ChangeEvent } from "react";
import * as React from "react";
import { BLANK_STRING } from "../utils/global-constants.ts";
import {
  inputFormLabelStyle,
  inputFormStyle,
  inputFormStyleError,
} from "../utils/tailwind.ts";
import mandatoryFieldIcon from "../assets/global/mandatory-field.svg";
import { InputFormError } from "./InputFormError.tsx";

export const InputForm: React.FC<{
  label: string;
  placeholder: string;
  type: string;
  name: string;
  inputFieldValue: string;
  isMandatory: boolean;
  errorText?: string;
  saveData: (value: string) => void;
}> = ({
  label,
  placeholder,
  type,
  name,
  inputFieldValue,
  isMandatory,
  errorText,
  saveData,
}) => {
  const [placeholderText, setPlaceholderText] = React.useState(placeholder);
  const [value, setValue] = React.useState(inputFieldValue);

  const handleFocus = () => {
    setPlaceholderText(BLANK_STRING);
  };

  const handleBlur = () => {
    if (value === BLANK_STRING) {
      setPlaceholderText(placeholder);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    saveData(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-row gap-x-1">
        {isMandatory && (
          <img
            className="w-[0.5rem]"
            src={mandatoryFieldIcon}
            alt="mandatory-icon"
          />
        )}
        <p className={inputFormLabelStyle}>{label}</p>
      </div>

      <input
        className={`${errorText?.length ? inputFormStyleError : inputFormStyle} w-[19rem]`}
        type={type}
        name={name}
        placeholder={placeholderText}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <div className="min-h-[2.5rem]">
        {!!errorText?.length && <InputFormError errorMessage={errorText} />}
      </div>
    </div>
  );
};
