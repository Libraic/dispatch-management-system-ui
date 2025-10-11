export type LiveSearchEndpointConfig = {
  endpoint: string;
  searchField: string;
};

export enum LiveSearchKey {
  USER = "USER",
  COMPANY = "COMPANY",
  DRIVER = "DRIVER",
  TRUCK = "TRUCK",
  TRAILER = "TRAILER",
}

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
  TRUCK: {
    endpoint: "http://localhost:8090/api/trucks",
    searchField: "truckNumber",
  },
  TRAILER: {
    endpoint: "http://localhost:8090/api/trailers",
    searchField: "trailerNumber",
  },
} as const;
