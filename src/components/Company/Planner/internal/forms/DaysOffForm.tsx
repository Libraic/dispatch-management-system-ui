import { forwardRef, useContext, useImperativeHandle } from "react";
import type {
  CalendarBookFormHandler,
  DaysOffPeriodData,
  DriverWorkforce,
  FormProps,
} from "../../../../../types/internal/planner/planner-types.ts";
import { DateSelector } from "../../../../Common/Selector/DateSelector.tsx";
import { toIsoDate } from "../../../../../utils/global/date-utils.ts";
import { DispatchingContext } from "../../../../../context/DispatchingContext.ts";

export const DaysOffForm = forwardRef<CalendarBookFormHandler, FormProps>(
  (daysOffProps, ref) => {
    const getInitialData = (
      workforce: DriverWorkforce,
      id?: string,
      day?: string,
    ): { startDate: Date; endDate: Date } => {
      if (!id) {
        const startDate = day ? new Date(day) : new Date(toIsoDate(new Date()));
        const endDate = new Date(startDate);
        return { startDate, endDate };
      }

      const dayOffPeriod = workforce.daysOffPeriods.filter(
        (daysOffPeriod) => daysOffPeriod.id === daysOffProps.id,
      )[0];
      return {
        startDate: new Date(dayOffPeriod.startDate),
        endDate: new Date(dayOffPeriod.endDate),
      };
    };

    const { id, day, workforce } = daysOffProps;
    const { startDate, endDate } = getInitialData(workforce, id, day);
    const context = useContext(DispatchingContext);

    const submit = () => {
      const daysOffPeriodData: DaysOffPeriodData = {
        startDate: startDate,
        endDate: endDate,
      };
      context!!.upsertDaysOffPeriodFn(
        daysOffPeriodData,
        workforce.driver.uuid,
        workforce.relationId,
      );
      return true;
    };

    useImperativeHandle(ref, () => ({
      submit,
    }));

    return (
      <div className="flex flex-col items-center justify-center pt-5">
        <div className="flex flex-row gap-x-5">
          <DateSelector label="Start Date" date={startDate} />
          <DateSelector label="End Date" date={endDate} />
        </div>
      </div>
    );
  },
);
