import * as React from "react";
import { colorTransitionStyle } from "../utils/tailwind.ts";

export const SubmitButton: React.FC<{
  actionText: string;
  action: (e: React.FormEvent) => void;
}> = ({ actionText, action }) => {
  return (
    <button
      className={`min-w-[5rem] border-1 border-solid-blue rounded-3xl text-black bg-white  text-[1rem] py-[0.2rem] px-[0.4rem] hover:bg-solid-blue hover:border-solid-blue hover:text-white hover:cursor-pointer font-roboto font-medium ${colorTransitionStyle}`}
      onClick={action}
    >
      {actionText}
    </button>
  );
};
