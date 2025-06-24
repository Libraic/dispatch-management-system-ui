import * as React from "react";
import { useState } from "react";

export const Toggle: React.FC<{
  description: string;
  activate?: (value: boolean) => void;
}> = ({ description, activate }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-row items-center gap-x-2">
      <button
        onClick={() => {
          setChecked((prev) => {
            if (activate) {
              activate(!prev);
            }
            return !prev;
          });
        }}
        className={`w-13 h-7 rounded-full flex items-center px-1 hover:cursor-pointer transition-colors duration-300 ${
          checked ? "bg-light-blue" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full hover:cursor-pointer shadow-md transform transition-transform duration-300 ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
      <p className="text-standard-size font-lato font-medium">{description}</p>
    </div>
  );
};
