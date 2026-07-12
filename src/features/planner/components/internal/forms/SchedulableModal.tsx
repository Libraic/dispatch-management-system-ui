import { SubmitButton } from "#/ui/Buttons/SubmitButton";
import { CancelButton } from "#/ui/Buttons/CancelButton";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  type CalendarBookModalType,
  CalendarBookModalTypes,
  LOAD_FORM_METADATA,
  type SchedulableFormProps,
} from "#/types/internal/planner/planner-types";
import { LoadForm } from "./load/LoadForm";
import {
  HOVER_TEXT_NORMAL_COLOR,
  TEXT_NORMAL_COLOR,
} from "#/shared/constants/tailwind/tailwindColors.constants";
import { BLANK_STRING, PIPE } from "#/constants/common/global-constants";
import { VehicleMaintenanceForm } from "./VehicleMaintenanceForm";
import { DaysOffForm } from "./DaysOffForm";
import { Z_INDEX_5 } from "#/shared/constants/tailwind/tailwindLayout.constants";
import { Spinner } from "#/ui/Spinner/Spinner";
import { useModalEffect } from "#/features/planner/hooks/useModalEffect";
import { useSchedulableParams } from "#/features/planner/hooks/useSchedulableParams";

export const SchedulableModal: React.FC<{
  deactivate: () => void;
  props?: SchedulableFormProps;
}> = ({ deactivate, props }) => {
  const [modalType, setModalType] = useState<CalendarBookModalType>(
    props?.calendarBookModalType ?? "Load",
  );
  const { isSubmitting, closing, submitFn, quitFn, formRef } =
    useSchedulableParams(deactivate);
  useModalEffect(quitFn, submitFn);
  const forms: Record<CalendarBookModalType, React.ReactNode> = {
    Load: <LoadForm ref={formRef} {...props!!} />,
    Shop: <VehicleMaintenanceForm ref={formRef} {...props!!} />,
    "Days-off": <DaysOffForm ref={formRef} {...props!!} />,
  };

  return createPortal(
    <div
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
      className={`
        flex w-screen h-screen items-start justify-center overflow-y-auto py-[2.5rem] 
        ${Z_INDEX_5} 
        inset-0 fixed backdrop-blur-lg
      `}
    >
      <div
        className={`
          flex flex-col items-center justify-center
          px-[1rem] pt-[1rem]
          w-fit
          rounded-[0.5rem]
          border-[0.1rem] border-gray-200
          select-none
          bg-white
          animate-[var(--animate-modal-enter)] ${closing ? "animate-[var(--animate-modal-exit)]" : ""}
        `}
      >
        <p className={`font-normal`}>{LOAD_FORM_METADATA[modalType].name}</p>
        <p className={`pb-[3rem] font-light text-[0.95rem]`}>
          {LOAD_FORM_METADATA[modalType].description}
        </p>
        {!props?.calendarBookModalType && (
          <div
            className={`flex flex-row items-center justify-center mb-[2rem] font-light ml-[2rem] text-[0.85rem]`}
          >
            {CalendarBookModalTypes.map((type, index) => (
              <div
                className="flex flex-row"
                key={type}
                onClick={() => {
                  if (!isSubmitting) {
                    setModalType(type);
                  }
                }}
              >
                <p
                  className={`hover:cursor-pointer ${HOVER_TEXT_NORMAL_COLOR} ${modalType === type ? TEXT_NORMAL_COLOR : "text-gray-400"}`}
                >
                  {type}
                </p>
                <p className="mx-[1.25rem] text-gray-400">
                  {index !== CalendarBookModalTypes.length - 1
                    ? PIPE
                    : BLANK_STRING}
                </p>
              </div>
            ))}
          </div>
        )}
        {forms[modalType]}
        {isSubmitting && <Spinner />}
        <div className="flex flex-row items-center justify-center mb-[1.3rem] gap-x-10">
          <SubmitButton
            actionText="Submit"
            action={submitFn}
            isInteractable={!isSubmitting}
          />
          <CancelButton actionText="Quit" action={quitFn} />
        </div>
      </div>
    </div>,
    document.body,
  );
};
