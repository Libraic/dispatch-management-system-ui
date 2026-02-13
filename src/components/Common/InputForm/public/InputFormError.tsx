import * as React from "react";
import errorIcon from "../../../../assets/global/error.svg";
import { SYSTEM_FONT_NORMAL } from "../../../../tailwind/tailwind-font-vars.ts";

export const InputFormError: React.FC<{ errorMessage: string }> = ({
  errorMessage,
}) => {
  return (
    <div className="flex flex-row items-center gap-x-1 mt-2 ml-3">
      <img className="w-[1.2rem]" src={errorIcon} alt="error-icon" />
      <p className={`${SYSTEM_FONT_NORMAL} text-error-red text-standard-size`}>
        {errorMessage}
      </p>
    </div>
  );
};
