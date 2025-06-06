export type RegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  personalEmail: string;
};

export type RegistrationDataError = {
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  personalEmailError: string;
};

export type SelectFormData<T> = {
  label: string;
  formWidth: string;
  data: T[];
  setElement: (value: T) => void;
};
