export interface ToastData {
  getMessage: () => string;
  getIdentifier: () => string | null;
  withErrorMessage: (message: string) => void;
  withSuccessMessage: (message: string) => void;
  getOperationResult: () => ToastType;
}

export type ToastType = "ERROR" | "SUCCESS";
