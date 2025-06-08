import * as React from "react";
import errorIcon from "../assets/error.svg";

export const InputFormError: React.FC<{ errorMessage: string }> = ({
  errorMessage,
}) => {
  return (
    <div className="flex flex-row items-center gap-x-1 mt-2">
      <img className="w-[1rem]" src={errorIcon} alt="error-icon" />
      <p className="font-roboto-400 text-error-red text-standard-size">
        {errorMessage}
      </p>
    </div>
  );
};
