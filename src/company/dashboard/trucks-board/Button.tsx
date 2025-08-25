import * as React from "react";

export const Button: React.FC<{
  unfocusedResource: string;
  focusedResource: string;
  action: () => void;
  information?: string;
}> = ({ unfocusedResource, focusedResource, information, action }) => {
  const [resource, setResource] = React.useState(unfocusedResource);
  const [showInformation, setShowInformation] = React.useState(false);
  const hoverTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    setResource(focusedResource);
    hoverTimeout.current = setTimeout(() => {
      setShowInformation(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    setResource(unfocusedResource);
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setShowInformation(false);
  };
  return (
    <div className="relative inline-block">
      <img
        className="w-[2rem] cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        src={resource}
        alt="add-record-unfocused"
        onClick={action}
      />
      {showInformation && (
        <div className="absolute top-full left-[4.2rem] -translate-x-1/2 mt-2 min-w-[8rem] rounded-xl text-center text-[0.8rem] p-1 z-10 shadow-lg backdrop-blur-sm bg-white/30">
          <p className="font-lato font-light">{information}</p>
        </div>
      )}
    </div>
  );
};
