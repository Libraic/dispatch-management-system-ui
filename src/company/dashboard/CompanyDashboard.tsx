import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCompanyByUuid } from "../../service/company-service.ts";
import { useToast } from "../../hooks/useToast.ts";
import { INTERNAL_SERVER_ERROR } from "../../utils/global/error-messages.ts";
import type { CompanyData } from "../../types/api/registration-api.ts";
import { ToastRenderer } from "../../toast/ToastRenderer.tsx";
import { CompanySidebar } from "./sidebar/CompanySidebar.tsx";

export const CompanyDashboard = () => {
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
