import * as React from "react";
import type { DriverWeeklyMileageData } from "../../../hooks/useDriverWeeklyMileage.ts";
import { TRUCKS_BOARD_COLUMNS_LAYOUT } from "../../../utils/trucks-board/trucks-board-constants.ts";
import { DriverMileageMetadata } from "./DriverMileageMetadata.tsx";
import { DailyMileageView } from "./DailyMileageView.tsx";
import {
  setDispatcher,
  setDriverWeeklyMileage,
} from "../../../utils/trucks-board/trucks-board-utils.ts";
import { LiveSearchKey } from "../../../types/forms.ts";
import { User } from "../../../types/api/User.ts";
import { LiveSearchCell } from "../../../matrix/LiveSearchCell.tsx";
import type { Renderable } from "../../../types/api/Renderable.ts";

export const DriversMileageView: React.FC<{
  driverWeeklyMileageData: DriverWeeklyMileageData;
}> = ({ driverWeeklyMileageData }) => {
  return (
    <>
      {driverWeeklyMileageData.getDriversMileageGroups().map((group) => (
        <div
          key={group.groupIdentifier}
          style={{
            gridTemplateColumns: TRUCKS_BOARD_COLUMNS_LAYOUT,
            gridAutoRows: "min-content", // each driver will make a row
          }}
          className="min-w-[1000px] grid rounded-[0.3rem] font-open-sans font-light bg-white"
        >
          <LiveSearchCell
            defaultSearchKey={LiveSearchKey.USER}
            constructor={User}
            object={group.dispatcher}
            saveObject={(dispatcher: Renderable) =>
              setDispatcher(
                dispatcher,
                driverWeeklyMileageData.setDriversMileageGroups,
                group.groupIdentifier,
              )
            }
            style={{
              gridRow: `1 / ${group.items.length + 1}`,
              alignSelf: "stretch",
              position: "sticky",
              left: 0,
              writingMode: "sideways-lr",
              borderLeft: "0.2rem solid #e6ebfa",
            }}
          />

          {group.items.map((driverWeeklyMileage, idx) => (
            <div key={driverWeeklyMileage.itemIdentifier} className="contents">
              <DriverMileageMetadata
                dispatcher={group.dispatcher}
                driverWeeklyMileage={driverWeeklyMileage}
                driverWeeklyMileageData={driverWeeklyMileageData}
                index={idx}
              />
              <DailyMileageView
                driverWeeklyMileage={driverWeeklyMileage}
                setDriverWeeklyMileage={(mileageIndex, field, value) =>
                  setDriverWeeklyMileage(
                    driverWeeklyMileageData.setCurrentDriversWeeklyMileage,
                    driverWeeklyMileage.itemIdentifier,
                    mileageIndex,
                    field,
                    value,
                  )
                }
                error={
                  driverWeeklyMileageData.errors[
                    driverWeeklyMileage.itemIdentifier
                  ]
                }
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
