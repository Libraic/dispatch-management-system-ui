import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionDriver } from "./trucks-board/ActionDriver.tsx";

export type SubmenuData = {
  label: string;
  route: string;
};

export const MenuAction: React.FC<{
  label: string;
  icon: string;
  baseRoute?: string;
  submenuData?: SubmenuData[];
}> = ({ label, icon, baseRoute, submenuData }) => {
  const navigate = useNavigate();
  const [isSubmenuActive, setIsSubmenuActive] = useState(false);
  return (
    <div className="mt-5 flex flex-col align-top gap-y-2 cursor-pointer">
      <div
        className={`${isSubmenuActive ? "bg-solid-blue" : "bg-solid-black"} ${isSubmenuActive ? "hover:bg-solid-blue" : "hover:bg-light-blue"}`}
        onClick={() => {
          if (baseRoute) {
            navigate(baseRoute);
          } else {
            setIsSubmenuActive((prev) => !prev);
          }
        }}
      >
        <ActionDriver label={label} img={icon} />
      </div>

      {isSubmenuActive &&
        submenuData &&
        submenuData.map((submenu, index) => (
          <div className="pl-2">
            <ActionDriver
              label={submenu.label}
              route={submenu.route}
              key={index}
            />
          </div>

        ))}
    </div>
  );
};
