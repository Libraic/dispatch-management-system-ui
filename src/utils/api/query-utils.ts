import { COMPANY_ID_QUERY_PARAM, JOIN_CLAUSE } from "./api-query-constants.ts";

export const queryDriversByCompanyId = (companyUuid: string) => {
  return {
    field: COMPANY_ID_QUERY_PARAM,
    operation: `${JOIN_CLAUSE}:${companyUuid}`,
  };
};
