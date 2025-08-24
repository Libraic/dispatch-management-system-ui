export const LIKE_CLAUSE = "like";
export const JOIN_CLAUSE = "join";
export const DRIVER_COMPANY_ID = "companyId";

export const queryDriversByCompanyId = (companyUuid: string) => {
  return {
    field: DRIVER_COMPANY_ID,
    operation: `${JOIN_CLAUSE}:${companyUuid}`,
  };
};
