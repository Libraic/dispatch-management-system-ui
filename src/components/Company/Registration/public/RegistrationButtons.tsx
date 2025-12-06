import { CancelButton } from "../../../Common/Button/CancelButton.tsx";
import { SubmitButton } from "../../../Common/Button/SubmitButton.tsx";
import * as React from "react";

export const RegistrationButtons: React.FC<{
  cancelFn: () => void;
  submitFn: (e: React.FormEvent) => void;
}> = ({ cancelFn, submitFn }) => {
  return (
    <div className="flex justify-center items-center gap-x-3 mx-5 my-5">
      <CancelButton actionText="Cancel" action={cancelFn} />
      <SubmitButton actionText="Submit" action={submitFn} />
    </div>
  );
};
