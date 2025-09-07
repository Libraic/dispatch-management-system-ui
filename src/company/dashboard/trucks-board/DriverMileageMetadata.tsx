import { LiveSearchCell } from "../../../matrix/LiveSearchCell.tsx";
import { LiveSearchKey } from "../../../types/forms.ts";
import { User } from "../../../types/api/User.ts";
import type { Renderable } from "../../../types/api/Renderable.ts";
import {
  setDispatcher,
  setDriver,
} from "../../../utils/trucks-board/trucks-board-utils.ts";
import {
  DISPATCHER_KEY,
  DRIVER_KEY,
  type DriverWeeklyMileage,
} from "../../../types/financial/trucks-board.ts";
import { Driver } from "../../../types/api/Driver.ts";
import { queryDriversByCompanyId } from "../../../utils/api/query-utils.ts";
import { ViewableCell } from "../../../matrix/ViewableCell.tsx";
import { BLANK_STRING } from "../../../utils/constants/global-constants.ts";
import { TotalRevenueAndMiles } from "./TotalRevenueAndMiles.tsx";
import * as React from "react";
import type { DriverWeeklyMileageData } from "../../../hooks/useDriverWeeklyMileage.ts";

export const DriverMileageMetadata: React.FC<{
  driverWeeklyMileage: DriverWeeklyMileage;
  driverWeeklyMileageData: DriverWeeklyMileageData;
}> = ({ driverWeeklyMileage, driverWeeklyMileageData }) => {
  const itemIdentifier = driverWeeklyMileage.itemIdentifier;
  const driverMileageError =
    driverWeeklyMileageData.errors[driverWeeklyMileage.itemIdentifier];
  return (
    <>
      <div className="sticky left-[4rem] z-10">
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
      </div>
      <div className="sticky left-[13rem] z-10">
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
      </div>
      <div className="sticky left-[27rem] z-10">
        <ViewableCell
          data={driverWeeklyMileage.driver?.getTruckData() ?? BLANK_STRING}
        />
      </div>
      <div className="sticky left-[32.7rem] z-8 w-[6rem]">
        <TotalRevenueAndMiles mileages={driverWeeklyMileage.mileageData} />
      </div>
    </>
  );
};
