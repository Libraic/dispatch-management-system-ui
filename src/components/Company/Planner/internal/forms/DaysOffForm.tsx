import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import type {
  CalendarBookFormHandler,
  DaysOffPeriodData,
  FormProps,
  SubmitSuccess,
} from "../../../../../types/internal/planner/planner-types.ts";
import { DateSelector } from "../../../../Common/Selector/DateSelector.tsx";
import { DispatchingContext } from "../../../../../context/DispatchingContext.ts";
import { getInitialData } from "../../../../../utils/planner/days-off-utils.ts";

export const DaysOffForm = forwardRef<CalendarBookFormHandler, FormProps>(
  (daysOffProps, ref) => {
    const { id, day, workforce } = daysOffProps;
    const [daysOffPeriodData, setDaysOffPeriodData] =
      useState<DaysOffPeriodData>(getInitialData(workforce, id, day));
    const context = useContext(DispatchingContext);

    const submit = async (): Promise<SubmitSuccess> => {
      const errorMessage = await context!!.upsertDaysOffPeriodFn(
        daysOffPeriodData,
        workforce.driver.uuid,
        workforce.relationId,
      );

      if (errorMessage) {
        throw new Error(errorMessage);
      }

      return "close-modal";
    };

    useImperativeHandle(ref, () => ({
      submit,
    }));

    return (
      <div className="flex flex-col items-center justify-center pt-5">
        <div className="flex flex-row gap-x-5">
          <DateSelector
            label="Start Date"
            setDate={(date: Date) => {
              setDaysOffPeriodData((prevData) => ({
                ...prevData,
                startDate: date,
              }));
            }}
            date={daysOffPeriodData.startDate}
          />
          <DateSelector
            label="End Date"
            setDate={(date: Date) => {
              setDaysOffPeriodData((prevData) => ({
                ...prevData,
                endDate: date,
              }));
            }}
            date={daysOffPeriodData.endDate}
          />
        </div>
      </div>
    );
  },
);
