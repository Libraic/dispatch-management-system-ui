export type Link = {
  rel: string;
  href: string;
};

export type PageInfo = {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
};

export type Error = {
  message: string;
  field?: string;
  identifier?: string;
};

export type GroupsErrorResponse = {
  errors: Error | Error[];
};

export type ApiResponse<T, E extends Error | GroupsErrorResponse> = {
  data?: T;
  error?: E;
};

export type SearchCriteria = {
  field: string;
  operation: string;
};

export type LiveSearchResult<T> = {
  items: T[];
  error: string | null;
};

export type PaginationData = {
  size: number;
  pages: number;
};
