import * as React from "react";

import infoIcon from "../assets/global/info.svg";

export const FieldInformation: React.FC<{ information: string }> = ({
  information,
}) => {
  const [showInformation, setShowInformation] = React.useState(false);
  const hoverTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowInformation(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setShowInformation(false);
  };

  return (
    <div className="relative inline-block">
      <img
        className="w-[1.1rem] h-[1.1rem] cursor-pointer"
        src={infoIcon}
        alt="info-icon"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {showInformation && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[15rem] rounded-xl text-justify text-[0.8rem] border border-black p-2 z-10 shadow-lg backdrop-blur-sm bg-white/30">
          <p className="font-lato font-light">{information}</p>
        </div>
      )}
    </div>
  );
};
