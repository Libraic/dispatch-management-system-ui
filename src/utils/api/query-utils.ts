import { DRIVER_COMPANY_ID, JOIN_CLAUSE } from "./api-query-constants.ts";

export const queryDriversByCompanyId = (companyUuid: string) => {
  return {
    field: DRIVER_COMPANY_ID,
    operation: `${JOIN_CLAUSE}:${companyUuid}`,
  };
};
