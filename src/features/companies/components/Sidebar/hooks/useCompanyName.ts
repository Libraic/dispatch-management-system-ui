import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BLANK_STRING } from "#/constants/common/global-constants";
import { getCompanyByUuid } from "#/features/companies/api/companies.api";

export const useCompanyName = () => {
  const { companyUuid } = useParams();
  const [companyName, setCompanyName] = useState<string>(BLANK_STRING);

  useEffect(() => {
    const getCompanyById = async () => {
      if (!companyUuid) return;
      const response = await getCompanyByUuid(companyUuid);
      if (response.ok) {
        setCompanyName(response.data.name);
      }
    };

    getCompanyById().then(() => {});
  }, [companyUuid]);

  return companyName;
};
