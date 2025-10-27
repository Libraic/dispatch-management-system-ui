export type Error = {
  message: string;
  field?: string;
  identifier?: string;
};

export type GroupsErrorResponse = {
  errors: Error | Error[];
};
