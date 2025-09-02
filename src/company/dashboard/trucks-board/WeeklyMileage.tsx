import { LiveSearchCell } from "../../../matrix/LiveSearchCell.tsx";
import { LiveSearchKey } from "../../../types/forms.ts";
import { User } from "../../../types/api/User.ts";
import { Driver } from "../../../types/api/Driver.ts";
import type { Renderable } from "../../../types/api/Renderable.ts";
import {
  setDispatcher,
  setDriver,
  setDriverWeeklyMileage,
} from "../../../utils/trucks-board/trucks-board-utils.ts";
import { ViewableCell } from "../../../matrix/ViewableCell.tsx";
import { BLANK_STRING } from "../../../utils/constants/global-constants.ts";
import { TotalRevenueAndMiles } from "./TotalRevenueAndMiles.tsx";
import { DailyMileageView } from "./DailyMileageView.tsx";
import {
  DISPATCHER_KEY,
  DRIVER_KEY,
  type DriverMileageError,
  type DriverWeeklyMileage,
  type Mileage,
} from "../../../types/financial/trucks-board.ts";
import * as React from "react";
import { TRUCKS_BOARD_COLUMNS_LAYOUT } from "../../../utils/trucks-board/trucks-board-constants.ts";
import { queryDriversByCompanyId } from "../../../utils/api/query-utils.ts";
import type { DriverWeeklyMileageData } from "../../../hooks/useDriverWeeklyMileage.ts";

export const WeeklyMileage: React.FC<{
  driverWeeklyMileage: DriverWeeklyMileage;
  driverWeeklyMileageData: DriverWeeklyMileageData;
  driverMileageError?: DriverMileageError;
}> = ({ driverWeeklyMileage, driverWeeklyMileageData, driverMileageError }) => {
  const itemIdentifier = driverWeeklyMileage.itemIdentifier;
  return (
    <div
      className={`min-w-[1000px] min-h-[6rem] ${TRUCKS_BOARD_COLUMNS_LAYOUT} grid grid-cols-3 rounded-[0.3rem] font-open-sans font-light bg-white`}
    >
      <div className="flex items-center justify-center bg-[#f5f7fc] border-x-3 border-b-3 border-[#e6ebfa] w-full h-full">
        <input
          type="checkbox"
          className="w-4 h-4 hover:cursor-pointer border-[#e6ebfa]"
          checked={driverWeeklyMileageData
            .getIdentifiersMarkedForDeletion()
            .includes(itemIdentifier)}
          onChange={(e) => {
            if (e.target.checked) {
              driverWeeklyMileageData.markForDeletion(itemIdentifier);
            } else {
              driverWeeklyMileageData.unmarkForDeletion(itemIdentifier);
            }
          }}
        />
      </div>
      <LiveSearchCell
        defaultSearchKey={LiveSearchKey.USER}
        constructor={User}
        object={driverWeeklyMileage.dispatcher}
        saveObject={(dispatcher: Renderable) =>
          setDispatcher(
            driverWeeklyMileageData.setCurrentDriversWeeklyMileage,
            dispatcher,
            itemIdentifier,
          )
        }
        errorMessage={
          driverMileageError && (driverMileageError[DISPATCHER_KEY] as string)
        }
      />
      <LiveSearchCell
        defaultSearchKey={LiveSearchKey.DRIVER}
        constructor={Driver}
        object={driverWeeklyMileage.driver}
        saveObject={(driver: Renderable) =>
          setDriver(
            driverWeeklyMileageData.setCurrentDriversWeeklyMileage,
            driver,
            itemIdentifier,
          )
        }
        customSearchCriteria={[
          queryDriversByCompanyId(driverWeeklyMileageData.getCompanyUuid()),
        ]}
        errorMessage={
          driverMileageError && (driverMileageError[DRIVER_KEY] as string)
        }
      />
      <ViewableCell
        data={driverWeeklyMileage.driver?.getTruckData() ?? BLANK_STRING}
      ></ViewableCell>
      <TotalRevenueAndMiles mileages={driverWeeklyMileage.mileageData} />
      <DailyMileageView
        driverWeeklyMileage={driverWeeklyMileage}
        setDriverWeeklyMileage={(
          mileageIndex: number,
          field: keyof Mileage,
          value: string,
        ) =>
          setDriverWeeklyMileage(
            driverWeeklyMileageData.setCurrentDriversWeeklyMileage,
            itemIdentifier,
            mileageIndex,
            field,
            value,
          )
        }
        error={driverMileageError}
      />
    </div>
  );
};
