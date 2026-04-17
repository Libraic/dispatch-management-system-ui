import { Toast } from "#/ui/Toast/ToastComponent/Toast";
import * as React from "react";
import type { ToastData } from "#/ui/Toast/types";

type ToastRendererProps = { toast: ToastData };

export const ToastRenderer: React.FC<ToastRendererProps> = ({ toast }) => {
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
