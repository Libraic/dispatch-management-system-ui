import { useState } from "react";
import { BLANK_STRING } from "../utils/constants/global.ts";
import { ToastTypeEnum } from "../types/toast.ts";

export type ToastData = {
  getMessage: () => string;
  getIdentifier: () => string | null;
  withErrorMessage: (message: string) => void;
  clear: () => void;
  getOperationResult: () => ToastTypeEnum;
};

export const useToast = (): ToastData => {
  const [message, setMessage] = useState<string>(BLANK_STRING);
  const [toastId, setToastId] = useState<string | null>(null);
  const [toastType, setToastType] = useState<ToastTypeEnum>(
    ToastTypeEnum.ERROR,
  );

  return {
    getMessage: () => message,
    getIdentifier: () => toastId,
    withErrorMessage: (message: string) => {
      setMessage(message);
      setToastType(ToastTypeEnum.ERROR);
      setToastId(Date.now().toString());
    },
    clear: () => setMessage(BLANK_STRING),
    getOperationResult: () => toastType,
  };
};
