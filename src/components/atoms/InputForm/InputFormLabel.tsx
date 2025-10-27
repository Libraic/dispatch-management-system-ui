import mandatoryFieldIcon from "../../../assets/global/mandatory-field.svg";
import { inputFormLabelStyle } from "../../../tailwind/tailwind.ts";
import { FieldInformation } from "../../molecules/Typography/FieldInformation.tsx";
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
      <p className={inputFormLabelStyle}>{label}</p>
      {information && <FieldInformation information={information} />}
    </div>
  );
};
