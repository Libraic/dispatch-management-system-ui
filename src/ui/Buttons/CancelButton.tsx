import * as React from "react";

type CancelButtonProps = {
  actionText: string;
  action: () => void;
};

export const CancelButton: React.FC<CancelButtonProps> = ({
  actionText,
  action,
}) => {
  return (
    <button
      type="button"
      className="
        min-w-20
        rounded-lg
        border
        border-[#212327]
        px-3
        py-1
        text-base
        font-normal
        text-[#212327]
        cursor-pointer
        transition-colors
        duration-150
        ease-in-out
        hover:bg-[#212327]
        hover:text-white
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#212327]
        focus-visible:ring-offset-2
      "
      onClick={action}
    >
      {actionText}
    </button>
  );
};
