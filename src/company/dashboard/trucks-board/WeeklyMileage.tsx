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
import type { Dispatch } from "react";
import * as React from "react";
import { TRUCKS_BOARD_COLUMNS_LAYOUT } from "../../../utils/trucks-board/trucks-board-constants.ts";
import { queryDriversByCompanyId } from "../../../utils/api/query-utils.ts";

export const WeeklyMileage: React.FC<{
  driverWeeklyMileage: DriverWeeklyMileage;
  setDriversWeeklyMileages: Dispatch<
    React.SetStateAction<DriverWeeklyMileage[]>
  >;
  index: number;
  companyUuid: string;
  driverMileageError?: DriverMileageError;
}> = ({
  driverWeeklyMileage,
  setDriversWeeklyMileages,
  index,
  companyUuid,
  driverMileageError,
}) => {
  const [isActive, setIsActive] = React.useState(false);
  return (
    <div
      key={index}
      className={`min-w-[1000px] min-h-[6rem] ${TRUCKS_BOARD_COLUMNS_LAYOUT} grid grid-cols-3 rounded-[0.3rem] font-open-sans font-light bg-white`}
    >
      <div className="flex items-center justify-center bg-[#f5f7fc] border-x-3 border-b-3 border-[#e6ebfa] w-full h-full">
        <input
          type="checkbox"
          className="w-4 h-4 hover:cursor-pointer border-[#e6ebfa]"
          checked={isActive}
          onChange={() => setIsActive((prev) => !prev)}
        />
      </div>
      <LiveSearchCell
        defaultSearchKey={LiveSearchKey.USER}
        constructor={User}
        saveObject={(dispatcher: Renderable) =>
          setDispatcher(setDriversWeeklyMileages, dispatcher, index)
        }
        errorMessage={
          driverMileageError && (driverMileageError[DISPATCHER_KEY] as string)
        }
      />
      <LiveSearchCell
        defaultSearchKey={LiveSearchKey.DRIVER}
        constructor={Driver}
        saveObject={(driver: Renderable) =>
          setDriver(setDriversWeeklyMileages, driver, index)
        }
        customSearchCriteria={[queryDriversByCompanyId(companyUuid)]}
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
            setDriversWeeklyMileages,
            index,
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
