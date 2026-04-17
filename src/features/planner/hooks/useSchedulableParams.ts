import { useCallback, useContext, useRef, useState } from "react";
import { ToastContext } from "#/ui/Toast/context/ToastContext";
import type { CalendarBookFormHandler } from "#/types/internal/planner/planner-types";

export const useSchedulableParams = (deactivateFn: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [closing, setClosing] = useState(false);
  const { showToast } = useContext(ToastContext);
  const formRef = useRef<CalendarBookFormHandler>(null);

  const quitFn = useCallback(() => {
    setClosing(true);
    setTimeout(deactivateFn, 220);
  }, [deactivateFn]);

  const submitFn = useCallback(async () => {
    setIsSubmitting(true);

    try {
      const result = await formRef.current?.submit();

      if (result === "close-modal") {
        setClosing(true);
        setTimeout(deactivateFn, 220);
      }
    } catch (err) {
      showToast((err as Error).message);
    }

    setIsSubmitting(false);
  }, [deactivateFn, formRef, showToast]);

  return {
    isSubmitting,
    closing,
    submitFn,
    quitFn,
    formRef,
  };
};
