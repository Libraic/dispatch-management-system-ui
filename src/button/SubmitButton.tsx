import * as React from "react";
import { colorTransitionStyle } from "../utils/tailwind.ts";

export const SubmitButton: React.FC<{
  actionText: string;
  action: (e: React.FormEvent) => void;
}> = ({ actionText, action }) => {
  return (
    <button
      className={`border-none rounded-3xl text-white bg-[#60B5FF] text-[1rem] py-[0.2rem] px-[0.4rem] hover:bg-solid-blue font-roboto-500 ${colorTransitionStyle}`}
      onClick={action}
    >
      {actionText}
    </button>
  );
};
