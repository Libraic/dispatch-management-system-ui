import { colorTransitionStyle } from "../utils/tailwind.ts";
import * as React from "react";

export const CancelButton: React.FC<{
  actionText: string;
  action: () => void;
}> = ({ actionText, action }) => {
  return (
    <button
      className={`min-w-[5rem] border-1 border-[#212327] rounded-3xl text-black bg-color-[#F7F7F7] text-[1rem] py-[0.2rem] px-[0.4rem] hover:border-[#212327] hover:text-white hover:bg-[#212327] hover:cursor-pointer font-roboto font-medium ${colorTransitionStyle}`}
      onClick={action}
    >
      {actionText}
    </button>
  );
};
