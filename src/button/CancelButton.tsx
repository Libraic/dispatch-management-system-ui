import { colorTransitionStyle } from "../utils/tailwind.ts";
import * as React from "react";

export const CancelButton: React.FC<{
  actionText: string;
  action: () => void;
}> = ({ actionText, action }) => {
  return (
    <button
      className={`border border-s border-[#60B5FF] rounded-3xl text-black bg-color-[#F7F7F7] text-[1rem] py-[0.2rem] px-[0.4rem] hover:border-solid-blue hover:text-white hover:bg-solid-blue font-roboto-500 ${colorTransitionStyle}`}
      onClick={action}
    >
      {actionText}
    </button>
  );
};
