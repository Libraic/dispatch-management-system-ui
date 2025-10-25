import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompanySidebarItemData } from "./CompanySidebarItemData.tsx";

export type SubmenuData = {
  label: string;
  route: string;
};

export const CompanySidebarItem: React.FC<{
  label: string;
  icon: string;
  baseRoute?: string;
  submenuData?: SubmenuData[];
}> = ({ label, icon, baseRoute, submenuData }) => {
  const navigate = useNavigate();
  const [isSubmenuActive, setIsSubmenuActive] = useState(false);
  return (
    <div className="mt-5 flex flex-col align-top gap-y-2">
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
        <CompanySidebarItemData label={label} img={icon} />
      </div>

      {isSubmenuActive && submenuData && (
        <div className="flex flex-row items-center pl-5">
          <div className="w-[0.1rem] h-8 bg-light-blue"></div>
          <div>
            {submenuData.map((submenu, index) => (
              <div className="flex flex-row items-center pl-2 py-[0.1rem]">
                <CompanySidebarItemData
                  label={submenu.label}
                  route={submenu.route}
                  key={index}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
