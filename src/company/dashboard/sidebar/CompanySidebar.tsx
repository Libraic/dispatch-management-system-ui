import { CompanySidebarHeader } from "./CompanySidebarHeader.tsx";
import { BLANK_STRING } from "../../../utils/constants/global-constants.ts";
import { CompanySidebarItem } from "./CompanySidebarItem.tsx";
import companyProfileIcon from "../../../assets/company-menu/company-profile.svg";
import trucksBoardUnhoveredIcon from "../../../assets/company-menu/trucks-board-unhovered.svg";
import {
  DRIVERS_VIEW,
  TRAILERS_VIEW,
  TRUCKS_BOARD,
  TRUCKS_VIEW,
} from "../../../utils/constants/internal-routes.ts";
import addDriverIcon from "../../../assets/company-menu/add-driver.svg";
import addAssetIcon from "../../../assets/company-menu/add-asset-icon.svg";
import { useParams } from "react-router-dom";
import type { CompanyData } from "../../../types/api/registration-api.ts";
import * as React from "react";

export const CompanySidebar: React.FC<{ company: CompanyData }> = ({
  company,
}) => {
  const { companyUuid } = useParams();
  const baseRoute = `/dashboard/${companyUuid}`;
  return (
    <div className="w-1/10 bg-solid-black py-5">
      <CompanySidebarHeader companyName={company ? company.name : BLANK_STRING} />
      <CompanySidebarItem
        label="Profile"
        icon={companyProfileIcon}
        baseRoute={baseRoute}
      />
      <CompanySidebarItem
        label="Trucks Board"
        icon={trucksBoardUnhoveredIcon}
        baseRoute={`${baseRoute}${TRUCKS_BOARD}`}
      />
      <CompanySidebarItem
        label="Drivers"
        icon={addDriverIcon}
        baseRoute={`${baseRoute}${DRIVERS_VIEW}`}
      />
      <CompanySidebarItem
        label="Assets"
        icon={addAssetIcon}
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
    </div>
  );
};
