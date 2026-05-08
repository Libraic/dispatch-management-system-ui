import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import type { CompanyData } from "#/types/api/company/company-api-response-types";
import { getCompanyByUuid } from "#/features/companies/api/companies.api";
import { ToastContext } from "#/ui/Toast/context/ToastContext";

export const DashboardPage = () => {
  const { companyUuid } = useParams();
  const { showToast } = useContext(ToastContext);
  const [company, setCompany] = useState<CompanyData | null>(null);

  useEffect(() => {
    const getCompany = async () => {
      const data = await getCompanyByUuid(companyUuid!!);
      if (!data.ok) {
        showToast.error(data.error.message);
        return;
      }

      setCompany(data.data);
    };

    getCompany().then(() => {});
  }, [companyUuid, showToast]);

  return (
    <div>
      <div className="flex flex-col gap-y-2 items-center">
        <p className={`font-bold text-[2.3rem]`}>{company?.name}</p>
      </div>
    </div>
  );
};
