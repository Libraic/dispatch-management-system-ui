import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import type {
  CalendarBookFormHandler,
  DaysOffPeriodData,
  SchedulableFormProps,
  SubmitSuccess,
} from "#/types/internal/planner/planner-types";
import { DateSelectorField } from "#/ui/Selectors/DateSelectorField";
import { DispatchingContext } from "#/context/DispatchingContext";
import { getInitialData } from "#/utils/planner/days-off-utils";

export const DaysOffForm = forwardRef<
  CalendarBookFormHandler,
  SchedulableFormProps
>((daysOffProps, ref) => {
  const { id, day, workforce } = daysOffProps;
  const [daysOffPeriodData, setDaysOffPeriodData] = useState<DaysOffPeriodData>(
    getInitialData(workforce, id, day),
  );
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
        <DateSelectorField
          label="Start Date"
          setDate={(date: string) => {
            setDaysOffPeriodData((prevData) => ({
              ...prevData,
              startDate: date,
            }));
          }}
          date={daysOffPeriodData.startDate}
        />
        <DateSelectorField
          label="End Date"
          setDate={(date: string) => {
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
});
