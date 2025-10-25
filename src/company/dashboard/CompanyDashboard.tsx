import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCompanyByUuid } from "../../service/company-service.ts";
import { useToast } from "../../hooks/useToast.ts";
import { INTERNAL_SERVER_ERROR } from "../../utils/global/error-messages.ts";
import type { CompanyData } from "../../types/api/registration-api.ts";
import trucksBoardUnhoveredIcon from "../../assets/company-menu/trucks-board-unhovered.svg";
import companyProfileIcon from "../../assets/company-menu/company-profile.svg";
import addDriverIcon from "../../assets/company-menu/add-driver.svg";
import addAssetIcon from "../../assets/company-menu/add-asset-icon.svg";
import { MenuAction } from "./MenuAction.tsx";
import { CompanyMenuHeader } from "./CompanyMenuHeader.tsx";
import { BLANK_STRING } from "../../utils/constants/global-constants.ts";
import {
  DRIVERS_VIEW,
  TRAILERS_VIEW,
  TRUCKS_BOARD,
  TRUCKS_VIEW,
} from "../../utils/constants/internal-routes.ts";
import { ToastRenderer } from "../../toast/ToastRenderer.tsx";

export const CompanyDashboard = () => {
  const { companyUuid } = useParams();
  const toast = useToast();
  const [company, setCompany] = useState<CompanyData | null>(null);
  const baseRoute = `/dashboard/${companyUuid}`;

  useEffect(() => {
    if (companyUuid) {
      fetchCompanyByUuid(companyUuid)
        .then((company: CompanyData | undefined) => {
          if (!company) {
            toast.withErrorMessage(INTERNAL_SERVER_ERROR);
          } else {
            setCompany(company);
          }
        })
        .catch((err) => toast.withErrorMessage(err.message));
    }
  }, [companyUuid, toast]);

  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/10 bg-solid-black py-5">
        <CompanyMenuHeader
          companyName={company ? company.name : BLANK_STRING}
        />
        <MenuAction
          label="Profile"
          icon={companyProfileIcon}
          baseRoute={baseRoute}
        />
        <MenuAction
          label="Trucks Board"
          icon={trucksBoardUnhoveredIcon}
          baseRoute={`${baseRoute}${TRUCKS_BOARD}`}
        />
        <MenuAction
          label="Drivers"
          icon={addDriverIcon}
          baseRoute={`${baseRoute}${DRIVERS_VIEW}`}
        />
        <MenuAction
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
      <div className="w-9/10 flex flex-col gap-y-2 items-center">
        <p className="font-open-sans font-bold text-[2.3rem]">
          {company?.name}
        </p>
      </div>
      <ToastRenderer toast={toast} />
    </div>
  );
};
