import { SubmitButton } from "../../../../Common/Button/SubmitButton.tsx";
import { CancelButton } from "../../../../Common/Button/CancelButton.tsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  type CalendarBookFormHandler,
  type CalendarBookModalType,
  CalendarBookModalTypes,
  type FormProps,
  LOAD_FORM_METADATA,
} from "../../../../../types/internal/planner/planner-types.ts";
import {
  SYSTEM_FONT_LIGHT,
  SYSTEM_FONT_NORMAL,
  SYSTEM_FONT_THIN,
} from "../../../../../tailwind/tailwind-font-vars.ts";
import { LoadForm } from "./LoadForm.tsx";
import {
  HOVER_TEXT_NORMAL_COLOR,
  TEXT_NORMAL_COLOR,
} from "../../../../../tailwind/tailwind-colors-vars.ts";
import { BLANK_STRING } from "../../../../../constants/common/global-constants.ts";
import { VehicleMaintenanceForm } from "./VehicleMaintenanceForm.tsx";
import { DaysOffForm } from "./DaysOffForm.tsx";

export const PlannableModal: React.FC<{
  deactivate: () => void;
  props?: FormProps;
}> = ({ deactivate, props }) => {
  const [closing, setClosing] = useState(false);
  const formRef = useRef<CalendarBookFormHandler>(null);
  const [modalType, setModalType] = useState<CalendarBookModalType>(
    props?.calendarBookModalType ?? "Load",
  );
  const forms: Record<CalendarBookModalType, React.ReactNode> = {
    Load: <LoadForm ref={formRef} {...props!!} />,
    Shop: <VehicleMaintenanceForm ref={formRef} {...props!!} />,
    "Days-off": <DaysOffForm ref={formRef} {...props!!} />,
  };

  const quitFn = useCallback(() => {
    setClosing(true);
    setTimeout(deactivate, 220);
  }, [deactivate]);

  const submitFn = useCallback(() => {
    const isSuccessful = formRef.current?.submit();
    if (isSuccessful) {
      setClosing(true);
      setTimeout(deactivate, 220);
    }
  }, [deactivate]);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    const handleEscKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        quitFn();
      }
    };

    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        submitFn();
      }
    };

    window.addEventListener("keydown", handleEscKeyDown);
    window.addEventListener("keydown", handleEnterKeyDown);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleEscKeyDown);
      window.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, [quitFn, submitFn]);

  return createPortal(
    <div className="flex w-screen h-screen items-center justify-center z-1000 inset-0 fixed backdrop-blur-lg">
      <div
        className={`
          flex flex-col items-center justify-center
          px-[1rem] pt-[1rem]
          w-fit h-fit
          rounded-[0.5rem]
          border-[0.1rem] border-gray-200
          select-none
          bg-white
          animate-[var(--animate-modal-enter)] ${closing ? "animate-[var(--animate-modal-exit)]" : ""}
        `}
      >
        <p className={`${SYSTEM_FONT_NORMAL}`}>
          {LOAD_FORM_METADATA[modalType].name}
        </p>
        <p className={`pb-[3rem] ${SYSTEM_FONT_THIN}`}>
          {LOAD_FORM_METADATA[modalType].description}
        </p>
        {!props?.calendarBookModalType && (
          <div
            className={`flex flex-row items-center justify-center mb-[2rem] ${SYSTEM_FONT_LIGHT} ml-[2rem] text-[0.85rem]`}
          >
            {CalendarBookModalTypes.map((type, index) => (
              <div
                className="flex flex-row"
                key={type}
                onClick={() => setModalType(type)}
              >
                <p
                  className={`hover:cursor-pointer ${HOVER_TEXT_NORMAL_COLOR} ${modalType === type ? TEXT_NORMAL_COLOR : "text-gray-400"}`}
                >
                  {type}
                </p>
                <p className="mx-[1.25rem] text-gray-400">
                  {index !== CalendarBookModalTypes.length - 1
                    ? "|"
                    : BLANK_STRING}
                </p>
              </div>
            ))}
          </div>
        )}
        {forms[modalType]}
        <div className="flex flex-row items-center justify-center mb-[1.3rem] gap-x-10">
          <SubmitButton actionText="Submit" action={submitFn} />
          <CancelButton actionText="Quit" action={quitFn} />
        </div>
      </div>
    </div>,
    document.body,
  );
};
