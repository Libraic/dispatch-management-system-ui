import { Driver } from "../../../../types/internal/classes/Driver.ts";
import { InputForm } from "../../../Common/InputForm/public/InputForm.tsx";
import { SubmitButton } from "../../../Common/Button/SubmitButton.tsx";
import { CancelButton } from "../../../Common/Button/CancelButton.tsx";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type {
  DriverMileageData,
  MileageData,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import {
  SYSTEM_FONT_NORMAL,
  SYSTEM_FONT_THIN,
} from "../../../../tailwind/tailwind-font-vars.ts";

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
  const [mileageData, setMileageData] = useState(
    driverMileageData.mileage.get(day) ?? {
      broker: undefined,
      date: day,
      revenue: 0,
      miles: 0,
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
        <div className="flex flex-row gap-x-5">
          <InputForm
            label="Broker"
            placeholder="C. H. Robinson"
            type="text"
            inputFieldValue={mileageData.broker ?? BLANK_STRING}
            saveInputData={(broker: string) =>
              setMileageData((prev) => ({
                ...prev,
                broker: broker === BLANK_STRING ? undefined : broker,
              }))
            }
          />
        </div>
        <div className="flex flex-row gap-x-5">
          <InputForm
            label="Revenue"
            placeholder="100.25"
            type="number"
            inputFieldValue={
              mileageData.revenue === 0
                ? BLANK_STRING
                : mileageData.revenue.toString()
            }
            saveInputData={(revenue: string) =>
              setMileageData({ ...mileageData, revenue: parseFloat(revenue) })
            }
            isMandatory={true}
          />
          <InputForm
            label="Miles"
            placeholder="3000"
            type="number"
            inputFieldValue={
              mileageData.miles === 0
                ? BLANK_STRING
                : mileageData.miles.toString()
            }
            saveInputData={(miles: string) =>
              setMileageData({ ...mileageData, miles: parseInt(miles) })
            }
            isMandatory={true}
          />
        </div>
        <div className="flex flex-row items-center justify-center mb-[1.3rem] gap-x-10">
          <SubmitButton
            actionText="Submit"
            action={() => {
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
