import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCompanyByUuid } from "../service/company-service.ts";
import { useToast } from "../hooks/useToast.ts";
import { Toast } from "../toast/Toast.tsx";
import { INTERNAL_SERVER_ERROR } from "../utils/error-messages.ts";
import type { CompanyData } from "../types/api/registration-api.ts";
import trucksBoardUnhoveredIcon from "../assets/company-menu/trucks-board-unhovered.svg";
import companyProfileIcon from "../assets/company-menu/company-profile.svg";
import addDriverIcon from "../assets/company-menu/add-driver.svg";
import { CompanyFunctionality } from "./CompanyFunctionality.tsx";
import { CompanyMenuHeader } from "./CompanyMenuHeader.tsx";
import { BLANK_STRING } from "../utils/constants/global.ts";
import { DRIVER_REGISTRATION, TRUCKS_BOARD } from "../utils/routes/routes.ts";

export const CompanyDashboard = () => {
  const { companyUuid } = useParams();
  const toastData = useToast();
  const [company, setCompany] = useState<CompanyData | null>(null);
  const baseRoute = `/dashboard/${companyUuid}`;

  useEffect(() => {
    if (companyUuid) {
      fetchCompanyByUuid(companyUuid)
        .then((company: CompanyData | undefined) => {
          if (!company) {
            toastData.withErrorMessage(INTERNAL_SERVER_ERROR);
          } else {
            setCompany(company);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [companyUuid]);

  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/10 bg-solid-black py-5">
        <CompanyMenuHeader
          companyName={company ? company.name : BLANK_STRING}
        />
        <CompanyFunctionality
          label="Profile"
          icon={companyProfileIcon}
          route={baseRoute}
        />
        <CompanyFunctionality
          label="Trucks Board"
          icon={trucksBoardUnhoveredIcon}
          route={`${baseRoute}${TRUCKS_BOARD}`}
        />
        <CompanyFunctionality
          label="Add Driver"
          icon={addDriverIcon}
          route={`${baseRoute}${DRIVER_REGISTRATION}`}
        />
      </div>
      <div className="w-9/10 flex flex-col gap-y-2 items-center">
        <p className="font-open-sans font-bold text-[2.3rem]">
          {company?.name}
        </p>
      </div>
      {toastData.getMessage().length > 0 && (
        <Toast
          key={toastData.getIdentifier()}
          message={toastData.getMessage()}
          type={toastData.getOperationResult()}
        />
      )}
    </div>
  );
};
