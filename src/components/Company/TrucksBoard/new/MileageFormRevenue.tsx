import { setObjectStringField } from "../../../../utils/registration/registration-utils.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import React from "react";
import { CurrencyInputForm } from "../../../Common/InputForm/public/CurrencyInputForm.tsx";
import { NumericInputForm } from "../../../Common/InputForm/public/NumericInputForm.tsx";
import { divideNumbersAsStrings } from "../../../../utils/global/number-utils.ts";
import type {
  MileageData,
  MileageDataError,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import type { StateData } from "../../../../types/internal/common/props-types.ts";

export const MileageFormRevenue: React.FC<{
  mileageStateData: StateData<MileageData, MileageDataError>;
}> = ({ mileageStateData }) => {
  return (
    <div className="flex flex-row gap-x-5">
      <CurrencyInputForm
        label="Revenue"
        placeholder="100.25"
        inputFieldValue={mileageStateData.data.revenue}
        saveInputData={(revenue: string) =>
          setObjectStringField(mileageStateData.setData, "revenue", revenue)
        }
        isMandatory={true}
        errorMessage={mileageStateData.error.revenueError}
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
      />
      <NumericInputForm
        label="Miles"
        placeholder="300"
        inputFieldValue={mileageStateData.data.miles}
        saveInputData={(miles: string) =>
          setObjectStringField(mileageStateData.setData, "miles", miles)
        }
        isMandatory={true}
        errorMessage={mileageStateData.error.milesError}
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
      />
      <NumericInputForm
        label="RPM"
        placeholder={BLANK_STRING}
        inputFieldValue={divideNumbersAsStrings(
          mileageStateData.data.revenue,
          mileageStateData.data.miles,
        )}
        saveInputData={() => {}}
        tailwindProperties={{ maxWeight: "max-w-[11rem]" }}
        isReadOnly={true}
      />
    </div>
  );
};
