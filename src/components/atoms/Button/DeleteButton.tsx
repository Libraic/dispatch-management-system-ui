import removeWorkloadFocused from "../../../assets/global/remove-focused.svg";
import removeWorkloadUnfocused from "../../../assets/global/remove-unfocused.svg";
import * as React from "react";

export const DeleteButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  const [removeActiveIcon, setRemoveActiveIcon] = React.useState(
    removeWorkloadUnfocused,
  );
  return (
    <div className="w-6 h-6 flex items-center justify-center">
      <img
        className="w-full transition-transform duration-200 ease-in-out hover:scale-110 cursor-pointer mb-8"
        onClick={onClick}
        onMouseEnter={() => setRemoveActiveIcon(removeWorkloadFocused)}
        onMouseLeave={() => setRemoveActiveIcon(removeWorkloadUnfocused)}
        src={removeActiveIcon}
        alt="remove-item"
      />
    </div>
  );
};
