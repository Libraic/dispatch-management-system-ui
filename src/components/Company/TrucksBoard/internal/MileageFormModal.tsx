import { Driver } from "../../../../types/internal/classes/Driver.ts";
import { SubmitButton } from "../../../Common/Button/SubmitButton.tsx";
import { CancelButton } from "../../../Common/Button/CancelButton.tsx";
import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type {
  DriverMileageData,
  MileageData,
  MileageDataError,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import {
  SYSTEM_FONT_NORMAL,
  SYSTEM_FONT_THIN,
} from "../../../../tailwind/tailwind-font-vars.ts";
import {
  getBlankMileageDataError,
  getErrorsIfPresent,
} from "../../../../utils/trucks-board/trucks-board-error-utils.ts";
import { MileageFormLoadLocations } from "./MileageFormLoadLocations.tsx";
import { MileageFormDeliverablesDates } from "./MileageFormDeliverablesDates.tsx";
import { MileageFormRevenue } from "./MileageFormRevenue.tsx";
import { MileageFormBrokerData } from "./MileageFormBrokerData.tsx";
import { createStateData } from "../../../../utils/global/props-utils.ts";
import { getBlankMileageData } from "../../../../utils/trucks-board/trucks-board-utils.ts";

export const MileageFormModal: React.FC<{
  day: string;
  deactivate: () => void;
  driverMileageData: DriverMileageData;
  upsertDriverMileageData: (
    driver: Driver,
    mileageData: MileageData,
    driverMileageIdentifier?: string,
  ) => void;
}> = ({ day, deactivate, driverMileageData, upsertDriverMileageData }) => {
  const [closing, setClosing] = useState(false);
  const [mileageDataError, setMileageDataError] = useState<MileageDataError>(
    getBlankMileageDataError(),
  );
  const [mileageData, setMileageData] = useState<MileageData>(
    driverMileageData.mileage.get(day) ?? getBlankMileageData(day),
  );
  const mileageStateData = createStateData(
    mileageData,
    mileageDataError,
    setMileageData,
  );

  const quitFn = useCallback(() => {
    setClosing(true);
    setTimeout(deactivate, 220);
  }, [deactivate]);

  const submitFn = useCallback(() => {
    const { isError, mileageErrors } = getErrorsIfPresent(mileageData);
    if (isError) {
      setMileageDataError(mileageErrors);
      return;
    }

    upsertDriverMileageData(
      driverMileageData.driver!!,
      mileageData,
      driverMileageData.identifier ?? undefined,
    );
    setClosing(true);
    setTimeout(deactivate, 220);
  }, [
    deactivate,
    driverMileageData.driver,
    driverMileageData.identifier,
    mileageData,
    upsertDriverMileageData,
  ]);

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
        <p className={`${SYSTEM_FONT_NORMAL}`}>Mileage Form</p>
        <p className={`pb-[3rem] ${SYSTEM_FONT_THIN}`}>
          Complete the required data for Mileage
        </p>
        <div className="flex flex-col gap-y-[1.15rem]">
          <MileageFormLoadLocations mileageStateData={mileageStateData} />
          <MileageFormDeliverablesDates mileageData={mileageData} />
          <MileageFormRevenue mileageStateData={mileageStateData} />
          <MileageFormBrokerData mileageStateData={mileageStateData} />
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
