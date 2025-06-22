import type { ReactNode } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export const Option: React.FC<{
  unfocusedIcon: ReactNode;
  focusedIcon: ReactNode;
  action: string;
  navigateTo: string;
}> = ({ unfocusedIcon, focusedIcon, action, navigateTo }) => {
  const [icon, setIcon] = React.useState(unfocusedIcon);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-y-1">
      <div
        className="w-fit h-fit"
        onMouseEnter={() => setIcon(focusedIcon)}
        onMouseLeave={() => setIcon(unfocusedIcon)}
        onClick={() => navigate(navigateTo)}
      >
        {icon}
      </div>
      <p className="text-standard-size font-lato font-light">{action}</p>
    </div>
  );
};
