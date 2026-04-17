import type { ToastType } from "#/ui/Toast/types";

export interface ToastDetails {
  borderColor: string;
  backgroundColor: string;
  iconCode: string;
  svgColor: string;
  headerMessage: string;
}

export type ToastProps = { message: string; type: ToastType };
