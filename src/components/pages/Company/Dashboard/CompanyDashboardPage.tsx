import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCompanyByUuid } from "../../../../service/companyService.ts";
import { useToast } from "../../../../hooks/useToast.ts";
import { INTERNAL_SERVER_ERROR } from "../../../../constants/error/error-message-constants.ts";
import { ToastRenderer } from "../../../atoms/Toast/ToastRenderer.tsx";
import { CompanySidebar } from "../../../organisms/Company/Sidebar/CompanySidebar.tsx";
import type { CompanyData } from "../../../../types/api/company/company-api-response-types.ts";

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
    <div className="flex flex-row h-screen">
      <CompanySidebar company={company!!} />
      <div className="w-9/10 flex flex-col gap-y-2 items-center">
        <p className="font-open-sans font-bold text-[2.3rem]">
          {company?.name}
        </p>
      </div>
      <ToastRenderer toast={toast} />
    </div>
  );
};
