import { Driver } from "../../../../types/internal/classes/Driver.ts";
import { TextualInputForm } from "../../../Common/InputForm/public/TextualInputForm.tsx";
import { SubmitButton } from "../../../Common/Button/SubmitButton.tsx";
import { CancelButton } from "../../../Common/Button/CancelButton.tsx";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type {
  DriverMileageData,
  MileageData,
  MileageDataError,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import {
  SYSTEM_FONT_NORMAL,
  SYSTEM_FONT_THIN,
} from "../../../../tailwind/tailwind-font-vars.ts";
import { NumericInputForm } from "../../../Common/InputForm/public/NumericInputForm.tsx";
import { CurrencyInputForm } from "../../../Common/InputForm/public/CurrencyInputForm.tsx";
import { getBlankMileageDataError } from "../../../../utils/trucks-board/trucks-board-error-utils.ts";

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
  const [mileageData, setMileageData] = useState(
    driverMileageData.mileage.get(day) ?? {
      broker: BLANK_STRING,
      date: day,
      revenue: BLANK_STRING,
      miles: BLANK_STRING,
    },
  );

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

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
        <div className="flex flex-row gap-x-5 mb-[2rem]">
          <TextualInputForm
            label="Broker"
            placeholder="C. H. Robinson"
            inputFieldValue={mileageData.broker ?? BLANK_STRING}
            saveInputData={(broker: string) =>
              setMileageData((prev) => ({
                ...prev,
                broker: broker === BLANK_STRING ? undefined : broker,
              }))
            }
            isMandatory={true}
            errorMessage={mileageDataError.brokerError}
            tailwindProperties={{ maxWeight: "max-w-[15rem]" }}
          />
          <CurrencyInputForm
            label="Revenue"
            placeholder="100.25"
            inputFieldValue={mileageData.revenue}
            saveInputData={(revenue: string) => {
              setMileageData({ ...mileageData, revenue: revenue });
            }}
            isMandatory={true}
            errorMessage={mileageDataError.revenueError}
          />
          <NumericInputForm
            label="Miles"
            placeholder="300"
            inputFieldValue={mileageData.miles}
            saveInputData={(miles: string) =>
              setMileageData({ ...mileageData, miles: miles })
            }
            isMandatory={true}
            errorMessage={mileageDataError.milesError}
          />
        </div>
        <div className="flex flex-row gap-x-5">
          <CurrencyInputForm
            label="Revenue"
            placeholder="100.25"
            inputFieldValue={mileageData.revenue}
            saveInputData={(revenue: string) => {
              setMileageData({ ...mileageData, revenue: revenue });
            }}
            isMandatory={true}
            errorMessage={mileageDataError.revenueError}
          />
          <NumericInputForm
            label="Miles"
            placeholder="300"
            inputFieldValue={mileageData.miles}
            saveInputData={(miles: string) =>
              setMileageData({ ...mileageData, miles: miles })
            }
            isMandatory={true}
            errorMessage={mileageDataError.milesError}
          />
        </div>
        <div className="flex flex-row items-center justify-center mb-[1.3rem] gap-x-10">
          <SubmitButton
            actionText="Submit"
            action={() => {
              let isError = false;
              const mileageErrors: MileageDataError =
                getBlankMileageDataError();
              if (mileageData.revenue === BLANK_STRING) {
                isError = true;
                mileageErrors.revenueError = "Revenue is required.";
              }
              if (mileageData.miles === BLANK_STRING) {
                isError = true;
                mileageErrors.milesError = "Miles is required.";
              }
              if (mileageData.broker === BLANK_STRING) {
                isError = true;
                mileageErrors.brokerError = "Broker is required.";
              }

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
            }}
          />
          <CancelButton
            actionText="Quit"
            action={() => {
              setClosing(true);
              setTimeout(deactivate, 220);
            }}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
};
