import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCompanyByUuid } from "#/service/companyService";
import { useToast } from "#/ui/Toast/useToast";
import { INTERNAL_SERVER_ERROR } from "#/constants/error/error-message-constants";
import { ToastRenderer } from "#/ui/Toast/ToastRenderer";
import type { CompanyData } from "#/types/api/company/company-api-response-types";

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
    <div>
      <div className="flex flex-col gap-y-2 items-center">
        <p className={`font-bold text-[2.3rem]`}>{company?.name}</p>
      </div>
      <ToastRenderer toast={toast} />
    </div>
  );
};
