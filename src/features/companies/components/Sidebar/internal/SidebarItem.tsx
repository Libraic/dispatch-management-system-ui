import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExpandedItem } from "./ExpandedItem";
import { BACKGROUND_NORMAL_COLOR } from "#/shared/constants/tailwind/tailwindColors.constants";
import type {
  SidebarState,
  SubmenuData,
} from "#/types/internal/sidebar/sidebar-types";
import { BLANK_STRING } from "#/constants/common/global-constants";
import { ContractedItem } from "#/features/companies/components/Sidebar/internal/ContractedItem";

type CompanySidebarItemProps = {
  label: string;
  iconCode: string;
  sidebarState: SidebarState;
  route?: string;
  submenuData?: SubmenuData[];
};

export const SidebarItem: FC<CompanySidebarItemProps> = ({
  label,
  iconCode,
  sidebarState,
  route,
  submenuData,
}) => {
  const navigate = useNavigate();
  const [isSubmenuActive, setIsSubmenuActive] = useState(false);

  const doNavigation = () => {
    if (route) {
      navigate(route);
    } else {
      setIsSubmenuActive((prev) => !prev);
    }
  };

  const shouldActivateSubmenu = isSubmenuActive && submenuData;

  return (
    <div className="mt-5 mx-1 flex flex-col align-top gap-y-2">
      <div
        className={`
          ${isSubmenuActive ? "bg-[#f2f2f2]" : "bg-[#f9f9f9]"} 
          ${sidebarState === "open" ? "hover:bg-gray-200" : BLANK_STRING} 
          rounded-[0.5rem]
        `}
        onClick={doNavigation}
      >
        {sidebarState === "open" ? (
          <ExpandedItem
            label={label}
            iconCode={iconCode}
            hasSubmenu={!!submenuData}
          />
        ) : (
          <ContractedItem iconCode={iconCode} label={label} />
        )}
      </div>

      {shouldActivateSubmenu && (
        <div className="flex flex-row items-center pl-5">
          <div className={`w-[0.1rem] h-8 ${BACKGROUND_NORMAL_COLOR}`}></div>
          <div>
            {submenuData.map((submenu, index) => (
              <div
                className="flex flex-row items-center pl-2 py-[0.1rem]"
                key={submenu.label}
              >
                <ExpandedItem
                  label={submenu.label}
                  hasSubmenu={false}
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
