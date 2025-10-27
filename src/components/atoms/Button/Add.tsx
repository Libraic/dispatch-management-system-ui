import addWorkloadHoveredIcon from "../../../assets/global/add-hovered.svg";
import addWorkloadIcon from "../../../assets/global/add.svg";
import * as React from "react";

export const Add: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [activeIcon, setActiveIcon] = React.useState(addWorkloadIcon);

  return (
    <div className="w-6 h-6 flex items-center justify-center">
      <img
        className="w-full h-full transition-transform duration-200 ease-in-out hover:scale-110 cursor-pointer"
        src={activeIcon}
        alt="add-company-icon"
        onMouseEnter={() => setActiveIcon(addWorkloadHoveredIcon)}
        onMouseLeave={() => setActiveIcon(addWorkloadIcon)}
        onClick={onClick}
      />
    </div>
  );
};
