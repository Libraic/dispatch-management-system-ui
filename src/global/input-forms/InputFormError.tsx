import * as React from "react";
import errorIcon from "../../assets/global/error.svg";

export const InputFormError: React.FC<{ errorMessage: string }> = ({
  errorMessage,
}) => {
  return (
    <div className="flex flex-row items-center gap-x-1 mt-2 ml-3">
      <img className="w-[1.2rem]" src={errorIcon} alt="error-icon" />
      <p className="font-open-sans font-medium text-error-red text-standard-size">
        {errorMessage}
      </p>
    </div>
  );
};
