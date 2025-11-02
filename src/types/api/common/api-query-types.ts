export type SearchCriteria = {
  field: string;
  operation: string;
};

export type PaginationData = {
  size: number;
  pages: number;
};

export enum Entity {
  DRIVER = "Driver",
  TRUCK = "Truck",
  TRAILER = "Trailer",
  USER = "User",
  COMPANY = "Company",
}
