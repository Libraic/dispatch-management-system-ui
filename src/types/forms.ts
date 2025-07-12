export type LiveSearchEndpointConfig = {
  endpoint: string;
  searchField: string;
};

export const LiveSearchEndpoints: Record<string, LiveSearchEndpointConfig> = {
  USER: {
    endpoint: "http://localhost:8090/api/users",
    searchField: "fullName",
  },
  COMPANY: {
    endpoint: "http://localhost:8090/api/companies",
    searchField: "name",
  },
  DRIVER: {
    endpoint: "http://localhost:8090/api/drivers",
    searchField: "fullName",
  },
} as const;
