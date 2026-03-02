export type Error = {
  message: string;
  field?: string;
  identifier?: string;
};

export type GroupsErrorResponse = {
  errors: Error | Error[];
};

export type ItemError = {
  id: string;
  field: string;
  errorMessage: string;
};
