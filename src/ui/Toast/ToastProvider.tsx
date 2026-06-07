import React, { type FC, useCallback, useMemo, useState } from "react";
import { Toast } from "#/ui/Toast/ToastComponent/Toast";
import type { ToastType } from "#/ui/Toast/types";
import { ToastContext } from "./context/ToastContext";

type ToastData = {
  message: string;
  type: ToastType;
  id: number;
} | null;

type ToastProviderProps = {
  children: React.ReactNode;
};

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastData>(null);

  const showToast = useCallback((message: string, type?: ToastType) => {
    setToast({
      message,
      type: type ?? "ERROR",
      id: Date.now(),
    });
  }, []);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toast && (
        <Toast key={toast.id} message={toast.message} type={toast.type} />
      )}
    </ToastContext.Provider>
  );
};
