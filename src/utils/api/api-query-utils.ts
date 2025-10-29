import {
  COMPANY_ID_QUERY_PARAM,
  JOIN_CLAUSE,
} from "../../constants/api/api-query-constants.ts";

export const joinByCompanyId = (companyUuid: string) => {
  return {
    field: COMPANY_ID_QUERY_PARAM,
    operation: `${JOIN_CLAUSE}:${companyUuid}`,
  };
};
