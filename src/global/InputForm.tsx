import * as React from "react";
import { type ChangeEvent, useState } from "react";
import { BLANK_STRING } from "../utils/constants/global.ts";
import { inputFormLabelStyle, inputFormStyle } from "../utils/tailwind.ts";
import mandatoryFieldIcon from "../assets/global/mandatory-field.svg";
import { InputFormError } from "./InputFormError.tsx";
import { FieldInformation } from "./FieldInformation.tsx";

export const InputForm: React.FC<{
  label: string;
  placeholder: string;
  type: string;
  name: string;
  inputFieldValue: string;
  isMandatory: boolean;
  errorMessage?: string;
  information?: string;
  saveInputData: (value: string) => void;
}> = ({
  label,
  placeholder,
  type,
  name,
  inputFieldValue,
  isMandatory,
  information,
  errorMessage,
  saveInputData,
}) => {
  const [placeholderText, setPlaceholderText] = React.useState(placeholder);
  const [value, setValue] = React.useState(inputFieldValue);
  const [borderColor, setBorderColor] = useState("border-light-grey");

  const handleFocus = () => {
    setPlaceholderText(BLANK_STRING);
    setBorderColor("border-solid-blue");
  };

  const handleBlur = () => {
    if (value === BLANK_STRING) {
      setPlaceholderText(placeholder);
    }

    setBorderColor("border-light-grey");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    saveInputData(e.target.value);
  };

  return (
    <div className="flex flex-col gap-y-2 min-h-[6.5rem]">
      <div
        className={`flex flex-col px-5 py-2 justify-start items-start border-2 bg-white ${borderColor} rounded-[2rem] max-w-[20rem]`}
      >
        <div className="flex flex-row items-center gap-x-1">
          {isMandatory && (
            <img
              className="w-[0.6rem]"
              src={mandatoryFieldIcon}
              alt="mandatory-icon"
            />
          )}
          <p className={inputFormLabelStyle}>{label}</p>
          {information && <FieldInformation information={information} />}
        </div>

        <input
          className={`${inputFormStyle} w-[19rem]`}
          type={type}
          name={name}
          placeholder={placeholderText}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>
      {!!errorMessage?.length && <InputFormError errorMessage={errorMessage} />}
    </div>
  );
};
