import { CompanySidebarItem } from "../internal/CompanySidebarItem.tsx";
import plannerUnhoveredIcon from "../../../../assets/company-menu/planner-unhovered.svg";
import {
  DISPATCHERS_VIEW,
  DRIVERS_VIEW,
  TRAILERS_VIEW,
  PLANNER,
  TRUCKS_VIEW,
} from "../../../../constants/route/internal-route-constants.ts";
import { useParams } from "react-router-dom";
import * as React from "react";
import type { SidebarState } from "../../../../types/internal/sidebar/sidebar-types.ts";
import { SYSTEM_FONT_LIGHT } from "../../../../tailwind/tailwind-font-vars.ts";
import addDriverIcon from "../../../../assets/company-menu/add-driver.svg";
import addAssetIcon from "../../../../assets/company-menu/add-asset-icon.svg";
import addDispatcherIcon from "../../../../assets/company-menu/add-dispatcher-icon.svg";
import sidebarCloserIcon from "../../../../assets/company-menu/sidebar-closer.svg";
import sidebarOpenerIcon from "../../../../assets/company-menu/sidebar-opener.svg";
import dashboardIcon from "../../../../assets/company-menu/dashboard.svg";

export const CompanySidebar: React.FC<{
  sidebarState: SidebarState;
  setSidebarState: React.Dispatch<React.SetStateAction<SidebarState>>;
}> = ({ sidebarState, setSidebarState }) => {
  const { companyUuid } = useParams();
  const baseRoute = `/dashboard/${companyUuid}`;
  const [sidebarActiveIcon, setSidebarActiveIcon] =
    React.useState(sidebarCloserIcon);
  return (
    <div
      className={`${sidebarState === "open" ? "w-[12rem]" : "w-[4rem]"} py-5 border-r-1 border-gray-200 bg-[#f9f9f9] h-screen`}
    >
      <div className="w-full flex items-center justify-between px-[0.7rem]">
        {sidebarState === "open" && (
          <p className={`pl-1 ${SYSTEM_FONT_LIGHT} tracking-wide`}>
            Kovin Group
          </p>
        )}
        <img
          className="hover:bg-gray-200 rounded-[0.5rem] w-8 h-8"
          onClick={() => {
            setSidebarState((prev) => (prev === "open" ? "closed" : "open"));
            setSidebarActiveIcon((prev) =>
              prev === sidebarCloserIcon
                ? sidebarOpenerIcon
                : sidebarCloserIcon,
            );
          }}
          src={sidebarActiveIcon}
          alt="img-icon"
        />
      </div>
      <CompanySidebarItem
        label="Dashboard"
        icon={dashboardIcon}
        baseRoute={baseRoute}
        sidebarState={sidebarState}
      />
      <CompanySidebarItem
        label="Planner"
        icon={plannerUnhoveredIcon}
        baseRoute={`${baseRoute}${PLANNER}`}
        sidebarState={sidebarState}
      />
      <CompanySidebarItem
        label="Drivers"
        icon={addDriverIcon}
        baseRoute={`${baseRoute}${DRIVERS_VIEW}`}
        sidebarState={sidebarState}
      />
      <CompanySidebarItem
        label="Dispatchers"
        icon={addDispatcherIcon}
        baseRoute={`${baseRoute}${DISPATCHERS_VIEW}`}
        sidebarState={sidebarState}
      />
      {sidebarState === "open" && (
        <CompanySidebarItem
          label="Assets"
          icon={addAssetIcon}
          sidebarState={sidebarState}
          submenuData={[
            {
              label: "Trucks",
              route: `${baseRoute}${TRUCKS_VIEW}`,
            },
            {
              label: "Trailers",
              route: `${baseRoute}${TRAILERS_VIEW}`,
            },
          ]}
        />
      )}
    </div>
  );
};
