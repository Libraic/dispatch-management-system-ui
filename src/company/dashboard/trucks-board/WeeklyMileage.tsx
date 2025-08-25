import { LiveSearchCell } from "../../../matrix/LiveSearchCell.tsx";
import { LiveSearchKey } from "../../../types/forms.ts";
import { User } from "../../../types/api/User.ts";
import { Driver } from "../../../types/api/Driver.ts";
import type { Renderable } from "../../../types/api/Renderable.ts";
import {
  setDispatcher,
  setDriver,
  setDriverWeeklyMileage,
} from "../../../utils/financial/trucks-board-utils.ts";
import { queryDriversByCompanyId } from "../../../utils/constants/api-query.ts";
import { ViewableCell } from "../../../matrix/ViewableCell.tsx";
import { BLANK_STRING } from "../../../utils/constants/global.ts";
import { TotalRevenueAndMiles } from "./TotalRevenueAndMiles.tsx";
import { DailyMileages } from "./DailyMileages.tsx";
import type {
  DriverWeeklyMileage,
  Mileage,
} from "../../../types/financial/trucks-board.ts";
import type { Dispatch } from "react";
import * as React from "react";
import { TRUCKS_BOARD_COLUMNS_LAYOUT } from "../../../utils/financial/trucks-board-constants.ts";

export const WeeklyMileage: React.FC<{
  driverWeeklyMileage: DriverWeeklyMileage;
  setDriversWeeklyMileages: Dispatch<
    React.SetStateAction<DriverWeeklyMileage[]>
  >;
  index: number;
  companyUuid: string;
}> = ({
  driverWeeklyMileage,
  index,
  setDriversWeeklyMileages,
  companyUuid,
}) => {
  return (
    <div
      key={index}
      className={`min-w-[1000px] min-h-[6rem] ${TRUCKS_BOARD_COLUMNS_LAYOUT} grid grid-cols-3 rounded-[0.3rem] font-open-sans font-light bg-white`}
    >
      <LiveSearchCell
        defaultSearchKey={LiveSearchKey.USER}
        constructor={User}
        saveObject={(dispatcher: Renderable) =>
          setDispatcher(setDriversWeeklyMileages, dispatcher, index)
        }
      />
      <LiveSearchCell
        defaultSearchKey={LiveSearchKey.DRIVER}
        constructor={Driver}
        saveObject={(driver: Renderable) =>
          setDriver(setDriversWeeklyMileages, driver, index)
        }
        customSearchCriteria={[queryDriversByCompanyId(companyUuid)]}
      />
      <ViewableCell
        data={driverWeeklyMileage.driver?.getTruckData() ?? BLANK_STRING}
      ></ViewableCell>
      <TotalRevenueAndMiles mileages={driverWeeklyMileage.mileages} />
      <DailyMileages
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
      />
    </div>
  );
};
