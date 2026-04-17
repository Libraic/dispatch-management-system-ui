import * as React from "react";
import { SYSTEM_FONT_NORMAL } from "#/tailwind/tailwind-font-vars";

type ErrorContainerProps = {
  errorMessage: string;
};

export const ErrorContainer: React.FC<ErrorContainerProps> = ({
  errorMessage,
}) => {
  return (
    <div className="flex flex-row items-center gap-x-1 mt-2 ml-3">
      <p
        className={`${SYSTEM_FONT_NORMAL} tracking-tight text-error-red text-[0.85rem]`}
      >
        {errorMessage}
      </p>
    </div>
  );
};
