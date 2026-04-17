import type { ToastDetails } from "#/ui/Toast/ToastComponent/Toast.types";
import type { ToastType } from "#/ui/Toast/types";

export const TOAST_DATA: Record<ToastType, ToastDetails> = {
  ERROR: {
    borderColor: "border-[#BF3131]",
    backgroundColor: "bg-[#fcefea]",
    svgColor: "#BF3131",
    iconCode: "info",
    headerMessage: "Something went wrong",
  },
  SUCCESS: {
    borderColor: "border-[#51dc6b]",
    backgroundColor: "bg-[#f1f9f4]",
    svgColor: "#51dc6b",
    iconCode: "check_circle",
    headerMessage: "Action successfully completed",
  },
};
