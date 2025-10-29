import { useMemo, useState } from "react";
import { BLANK_STRING } from "../constants/common/global-constants.ts";
import { ToastTypeEnum } from "../types/internal/common/toast-types.ts";

export type ToastData = {
  getMessage: () => string;
  getIdentifier: () => string | null;
  withErrorMessage: (message: string) => void;
  withSuccessMessage: (message: string) => void;
  reset: () => void;
  isOk: () => boolean;
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
      withSuccessMessage: (msg: string) => {
        setMessage(msg);
        setToastType(ToastTypeEnum.SUCCESS);
        setToastId(Date.now().toString());
      },
      reset: () => setMessage(BLANK_STRING),
      isOk: () => message.length === 0,
      getOperationResult: () => toastType,
    }),
    [message, toastId, toastType],
  );
};
