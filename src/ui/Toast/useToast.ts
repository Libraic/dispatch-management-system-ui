import { useMemo, useState } from "react";
import { BLANK_STRING } from "#/constants/common/global-constants";
import type { ToastData, ToastType } from "#/ui/Toast/types";

export const useToast = (): ToastData => {
  const [message, setMessage] = useState<string>(BLANK_STRING);
  const [toastId, setToastId] = useState<string | null>(null);
  const [toastType, setToastType] = useState<ToastType>("ERROR");

  return useMemo(
    () => ({
      getMessage: () => message,
      getIdentifier: () => toastId,
      withErrorMessage: (msg: string) => {
        setMessage(msg);
        setToastType("ERROR");
        setToastId(Date.now().toString());
      },
      withSuccessMessage: (msg: string) => {
        setMessage(msg);
        setToastType("SUCCESS");
        setToastId(Date.now().toString());
      },
      getOperationResult: () => toastType,
    }),
    [message, toastId, toastType],
  );
};
