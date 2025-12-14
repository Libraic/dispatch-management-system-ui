import mandatoryFieldIcon from "../../../../assets/global/mandatory-field.svg";
import { INPUT_FORM_LABEL_STYLE } from "../../../../tailwind/tailwind.ts";
import { InputFormDescription } from "./InputFormDescription.tsx";
import * as React from "react";

export const InputFormLabel: React.FC<{
  label: string;
  information?: string;
  isMandatory?: boolean;
}> = ({ label, information, isMandatory }) => {
  return (
    <div className="flex flex-row items-center gap-x-1">
      {isMandatory && (
        <img
          className="w-[0.6rem]"
          src={mandatoryFieldIcon}
          alt="mandatory-icon"
        />
      )}
      <p className={INPUT_FORM_LABEL_STYLE}>{label}</p>
      {information && <InputFormDescription information={information} />}
    </div>
  );
};
