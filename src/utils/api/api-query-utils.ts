import {
  COMPANY_ID_QUERY_PARAM,
  JOIN_CLAUSE,
} from "#/shared/api/constants/apiQuery.constants";

export const joinByCompanyId = (companyUuid: string) => {
  return {
    field: COMPANY_ID_QUERY_PARAM,
    operation: `${JOIN_CLAUSE}:${companyUuid}`,
  };
};
