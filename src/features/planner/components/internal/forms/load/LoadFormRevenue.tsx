import { setObjectStringField } from "#/utils/registration/registration-utils";
import { BLANK_STRING } from "#/constants/common/global-constants";
import { useContext } from "react";
import { CurrencyInputField } from "#/ui/InputField/components/public/CurrencyInputField/CurrencyInputField";
import { NumericInputField } from "#/ui/InputField/components/public/NumericInputField/NumericInputField";
import { divideNumbersAsStrings } from "#/shared/utils/number.utils";
import { LoadContext } from "#/features/planner/context/LoadContext";

export const LoadFormRevenue = () => {
  const loadContext = useContext(LoadContext)!!;
  const revenue = loadContext.loadData.revenue ?? BLANK_STRING;
  const miles = loadContext.loadData.miles ?? BLANK_STRING;
  const rpm = divideNumbersAsStrings(revenue, miles);
  return (
    <div className="flex items-center flex-row gap-x-5">
      <CurrencyInputField
        label="Revenue"
        placeholder="100.25"
        inputFieldValue={revenue}
        saveInputData={(revenue: string) =>
          setObjectStringField(loadContext.setLoadData, "revenue", revenue)
        }
        isMandatory={true}
        errorMessage={loadContext.loadDataErrors.revenueError}
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
      />
      <NumericInputField
        label="Miles"
        placeholder="300"
        inputFieldValue={miles}
        saveInputData={(miles: string) =>
          setObjectStringField(loadContext.setLoadData, "miles", miles)
        }
        isMandatory={true}
        errorMessage={loadContext.loadDataErrors.milesError}
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
      />
      <NumericInputField
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
