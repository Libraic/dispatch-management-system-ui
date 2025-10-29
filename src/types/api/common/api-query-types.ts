export type SearchCriteria = {
  field: string;
  operation: string;
};

export type PaginationData = {
  size: number;
  pages: number;
};

export enum PageableEntity {
  DRIVER = "Driver",
  TRUCK = "Truck",
  TRAILER = "Trailer",
  USER = "User",
  COMPANY = "Company",
}
