import * as React from "react";
import { type ChangeEvent, useState } from "react";
import { BLANK_STRING } from "../../utils/constants/global-constants.ts";
import { inputFormStyle } from "../../utils/tailwind/tailwind.ts";
import { InputFormError } from "./InputFormError.tsx";
import { InputFormLabel } from "./InputFormLabel.tsx";

export const InputForm: React.FC<{
  label: string;
  placeholder: string;
  type: string;
  name: string;
  inputFieldValue: string;
  isMandatory?: boolean;
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
  const [isFocused, setIsFocused] = useState(false);
  const [borderColor, setBorderColor] = useState("border-light-grey");

  const handleFocus = () => {
    setIsFocused(true);
    setBorderColor("border-solid-blue");
  };

  const handleBlur = () => {
    setIsFocused(false);
    setBorderColor("border-light-grey");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    saveInputData(e.target.value);
  };

  return (
    <div className="flex flex-col gap-y-2 min-h-[6.5rem]">
      <div
        className={`flex flex-col px-5 py-2 justify-start items-start border-2 bg-white ${borderColor} rounded-[2rem] max-w-[20rem]`}
      >
        <InputFormLabel
          label={label}
          information={information}
          isMandatory={isMandatory}
        />

        <input
          className={`${inputFormStyle} w-[19rem]`}
          type={type}
          name={name}
          placeholder={
            !isFocused && (inputFieldValue === BLANK_STRING || !inputFieldValue)
              ? placeholder
              : BLANK_STRING
          }
          value={inputFieldValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>
      {!!errorMessage?.length && <InputFormError errorMessage={errorMessage} />}
    </div>
  );
};
