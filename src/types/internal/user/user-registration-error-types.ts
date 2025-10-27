export type ItemError = {
  id: string;
  field: string;
  errorMessage: string;
};

export type UserRegistrationErrors = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  personalEmail: string;
  supervisor: string;
  workloads: ItemError[];
  notes: ItemError[];
};
