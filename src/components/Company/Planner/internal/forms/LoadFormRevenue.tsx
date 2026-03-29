import { setObjectStringField } from "../../../../../utils/registration/registration-utils.ts";
import { BLANK_STRING } from "../../../../../constants/common/global-constants.ts";
import React from "react";
import { CurrencyInputForm } from "../../../../Common/InputForm/public/CurrencyInputForm.tsx";
import { NumericInputForm } from "../../../../Common/InputForm/public/NumericInputForm.tsx";
import { divideNumbersAsStrings } from "../../../../../utils/global/number-utils.ts";
import type {
  LoadData,
  LoadDataError,
} from "../../../../../types/internal/planner/planner-types.ts";
import type { StateData } from "../../../../../types/internal/common/props-types.ts";

export const LoadFormRevenue: React.FC<{
  loadStateData: StateData<LoadData, LoadDataError>;
}> = ({ loadStateData }) => {
  const revenue = loadStateData.data.revenue ?? BLANK_STRING;
  const miles = loadStateData.data.miles ?? BLANK_STRING;
  const rpm = divideNumbersAsStrings(revenue, miles);
  return (
    <div className="flex flex-row gap-x-5">
      <CurrencyInputForm
        label="Revenue"
        placeholder="100.25"
        inputFieldValue={revenue}
        saveInputData={(revenue: string) =>
          setObjectStringField(loadStateData.setData, "revenue", revenue)
        }
        isMandatory={true}
        errorMessage={loadStateData.error.revenueError}
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
      />
      <NumericInputForm
        label="Miles"
        placeholder="300"
        inputFieldValue={miles}
        saveInputData={(miles: string) =>
          setObjectStringField(loadStateData.setData, "miles", miles)
        }
        isMandatory={true}
        errorMessage={loadStateData.error.milesError}
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
      />
      <NumericInputForm
        label="RPM"
        placeholder={BLANK_STRING}
        inputFieldValue={rpm}
        saveInputData={() => {}}
        tailwindProperties={{ maxWeight: "max-w-[11rem]" }}
        isReadOnly={true}
      />
    </div>
  );
};
