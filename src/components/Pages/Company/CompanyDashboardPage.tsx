import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCompanyByUuid } from "../../../service/companyService.ts";
import { useToast } from "../../../hooks/useToast.ts";
import { INTERNAL_SERVER_ERROR } from "../../../constants/error/error-message-constants.ts";
import { ToastRenderer } from "../../Common/Toast/ToastRenderer.tsx";
import type { CompanyData } from "../../../types/api/company/company-api-response-types.ts";
import { SidebarWrapper } from "../../SidebarWrapper.tsx";
import { SYSTEM_FONT_BOLD } from "../../../tailwind/tailwind-font-vars.ts";

export const CompanyDashboardPage = () => {
  const { companyUuid } = useParams();
  const toast = useToast();
  const [company, setCompany] = useState<CompanyData | null>(null);

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
    <SidebarWrapper>
      <div>
        <div className="flex flex-col gap-y-2 items-center">
          <p className={`${SYSTEM_FONT_BOLD} text-[2.3rem]`}>{company?.name}</p>
        </div>
        <ToastRenderer toast={toast} />
      </div>
    </SidebarWrapper>
  );
};
