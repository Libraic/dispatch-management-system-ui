import removeWorkloadFocused from "../assets/global/remove-focused.svg";
import removeWorkloadUnfocused from "../assets/global/remove-unfocused.svg";
import * as React from "react";

export const Delete: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [removeActiveIcon, setRemoveActiveIcon] = React.useState(
    removeWorkloadUnfocused,
  );
  return (
    <div className="w-6 h-6 flex items-center justify-center">
      <img
        className="w-full h-full transition-transform duration-200 ease-in-out hover:scale-110 cursor-pointer mt-6"
        onClick={onClick}
        onMouseEnter={() => setRemoveActiveIcon(removeWorkloadFocused)}
        onMouseLeave={() => setRemoveActiveIcon(removeWorkloadUnfocused)}
        src={removeActiveIcon}
        alt="remove-workload"
      />
    </div>
  );
};
