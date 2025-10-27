export const ToastTypeEnum = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
} as const;

export type ToastTypeEnum = keyof typeof ToastTypeEnum;

export type ToastData = {
  borderColor: string;
  backgroundColor: string;
  icon: string;
  headerMessage: string;
};
