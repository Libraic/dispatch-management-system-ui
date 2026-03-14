import { SubmitButton } from "../../../Common/Button/SubmitButton.tsx";
import { CancelButton } from "../../../Common/Button/CancelButton.tsx";
import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type {
  DriverLoadData,
  LoadData,
  LoadDataError,
} from "../../../../types/internal/planner/planner-types.ts";
import {
  SYSTEM_FONT_NORMAL,
  SYSTEM_FONT_THIN,
} from "../../../../tailwind/tailwind-font-vars.ts";
import {
  getBlankLoadDataError,
  getErrorsIfPresent,
} from "../../../../utils/planner/planner-error-utils.ts";
import { LoadFormLoadLocations } from "./LoadFormLoadLocations.tsx";
import { LoadFormRevenue } from "./LoadFormRevenue.tsx";
import { LoadFormBrokerData } from "./LoadFormBrokerData.tsx";
import { createStateData } from "../../../../utils/global/props-utils.ts";
import { getBlankLoadData } from "../../../../utils/planner/planner-utils.ts";
import type { DriverData } from "../../../../types/api/driver/driver-api-response-types.ts";

export const LoadFormModal: React.FC<{
  day?: string;
  deactivate: () => void;
  driverLoadData: DriverLoadData;
  upsertLoadData: (
    driver: DriverData,
    loadData: LoadData,
    loadIdentifier?: string,
  ) => void;
  loadUuid?: string;
}> = ({ day, deactivate, driverLoadData, upsertLoadData, loadUuid }) => {
  const initialLoadData =
    loadUuid && driverLoadData
      ? driverLoadData.loads.filter((load) => load.id === loadUuid)[0]
      : getBlankLoadData(day!!);
  const [closing, setClosing] = useState(false);
  const [loadDataErrors, setLoadDataErrors] = useState<LoadDataError>(
    getBlankLoadDataError(),
  );
  const [loadData, setLoadData] = useState<LoadData>(initialLoadData);
  const loadStateData = createStateData(loadData, loadDataErrors, setLoadData);

  const quitFn = useCallback(() => {
    setClosing(true);
    setTimeout(deactivate, 220);
  }, [deactivate]);

  const submitFn = useCallback(() => {
    const { isError, loadErrors } = getErrorsIfPresent(loadData);
    if (isError) {
      setLoadDataErrors(loadErrors);
      return;
    }

    upsertLoadData(driverLoadData.driver!!, loadData);
    setClosing(true);
    setTimeout(deactivate, 220);
  }, [deactivate, driverLoadData.driver, loadData, upsertLoadData]);

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
        <p className={`${SYSTEM_FONT_NORMAL}`}>Load Form</p>
        <p className={`pb-[3rem] ${SYSTEM_FONT_THIN}`}>
          Complete the required data for the Load
        </p>
        <div className="flex flex-col gap-y-[1.15rem]">
          <LoadFormLoadLocations loadStateData={loadStateData} />
          <LoadFormRevenue loadStateData={loadStateData} />
          <LoadFormBrokerData loadStateData={loadStateData} />
        </div>
        <div className="flex flex-row items-center justify-center mb-[1.3rem] gap-x-10">
          <SubmitButton actionText="Submit" action={submitFn} />
          <CancelButton actionText="Quit" action={quitFn} />
        </div>
      </div>
    </div>,
    document.body,
  );
};
