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
  const loadedMiles = loadContext.loadData.loadedMiles ?? BLANK_STRING;
  const rpm = divideNumbersAsStrings(revenue, loadedMiles);
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
        label="Loaded Miles"
        placeholder="300"
        inputFieldValue={loadedMiles}
        saveInputData={(loadedMiles: string) =>
          setObjectStringField(
            loadContext.setLoadData,
            "loadedMiles",
            loadedMiles,
          )
        }
        isMandatory={true}
        errorMessage={loadContext.loadDataErrors.loadedMilesError}
        tailwindProperties={{ maxWeight: "max-w-[11.40rem]" }}
      />
      <NumericInputField
        label="Empty Miles"
        placeholder="30"
        inputFieldValue={loadContext.loadData.emptyMiles ?? BLANK_STRING}
        saveInputData={(emptyMiles: string) =>
          setObjectStringField(
            loadContext.setLoadData,
            "emptyMiles",
            emptyMiles,
          )
        }
        errorMessage={loadContext.loadDataErrors.emptyMilesError}
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
