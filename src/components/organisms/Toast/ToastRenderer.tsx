import type { ToastData } from "../../../hooks/useToast.ts";
import { Toast } from "./Toast.tsx";
import * as React from "react";

export const ToastRenderer: React.FC<{ toast: ToastData }> = ({ toast }) => {
  return (
    toast.getMessage().length > 0 && (
      <Toast
        key={toast.getIdentifier()}
        message={toast.getMessage()}
        type={toast.getOperationResult()}
      />
    )
  );
};
