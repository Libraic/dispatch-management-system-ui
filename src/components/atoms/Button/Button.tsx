import * as React from "react";

export const Button: React.FC<{
  label: string;
  action: () => void;
}> = ({ label, action }) => {
  return (
    <button
      onClick={action}
      className="font-lato font-normal px-4 py-2 rounded-lg hover:cursor-pointer border-light-blue border-1 hover:bg-solid-blue hover:text-white transition-all ease-in duration-150 hover:border-none"
    >
      {label}
    </button>
  );
};
