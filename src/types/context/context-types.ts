import * as React from "react";

export type RegistrationContextData<T, E> = {
  registrationData: T;
  setRegistrationData: React.Dispatch<React.SetStateAction<T>>;
  registrationDataError: E;
};
