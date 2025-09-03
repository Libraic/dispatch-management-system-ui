export const formatCompanyDashboardRoute = (companyUuid: string) => {
  return `/dashboard/${encodeURIComponent(companyUuid)}`;
};
