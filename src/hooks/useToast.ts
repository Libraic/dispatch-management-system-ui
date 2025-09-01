import { useMemo, useState } from "react";
import { BLANK_STRING } from "../utils/constants/global-constants.ts";
import { ToastTypeEnum } from "../types/toast.ts";

export type ToastData = {
  getMessage: () => string;
  getIdentifier: () => string | null;
  withErrorMessage: (message: string) => void;
  reset: () => void;
  getOperationResult: () => ToastTypeEnum;
};

export const useToast = (): ToastData => {
  const [message, setMessage] = useState<string>(BLANK_STRING);
  const [toastId, setToastId] = useState<string | null>(null);
  const [toastType, setToastType] = useState<ToastTypeEnum>(
    ToastTypeEnum.ERROR,
  );

  return useMemo(
    () => ({
      getMessage: () => message,
      getIdentifier: () => toastId,
      withErrorMessage: (msg: string) => {
        setMessage(msg);
        setToastType(ToastTypeEnum.ERROR);
        setToastId(Date.now().toString());
      },
      reset: () => setMessage(BLANK_STRING),
      getOperationResult: () => toastType,
    }),
    [message, toastId, toastType],
  );
};
