import * as React from "react";
import type { DriverWeeklyMileageData } from "../../../../hooks/useDriverWeeklyMileage.ts";
import { DriverMileageMetadata } from "./DriverMileageMetadata.tsx";
import { DailyMileageView } from "../../../molecules/Company/TrucksBoard/DailyMileageView.tsx";
import {
  setDispatcher,
  setDriverWeeklyMileage,
} from "../../../../utils/trucks-board/trucks-board-utils.ts";
import { User } from "../../../../types/internal/classes/User.ts";
import { LiveSearchCell } from "../../Cell/LiveSearchCell.tsx";
import type { Renderable } from "../../../../types/internal/classes/Renderable.ts";
import {
  getDispatcherLiveSearchCellStyles,
  TRUCKS_BOARD_LAYOUT_STYLES,
} from "../../../../utils/trucks-board/trucks-board-styles-utils.ts";
import {
  getDispatcherErrorMessage,
  getDriverMileageErrorsByGroupIdentifier,
} from "../../../../utils/trucks-board/trucks-board-error-utils.ts";
import { Entity } from "../../../../types/api/common/api-query-types.ts";

export const DriversMileage: React.FC<{
  driverWeeklyMileageData: DriverWeeklyMileageData;
}> = ({ driverWeeklyMileageData }) => {
  const errors = driverWeeklyMileageData.errors;
  return (
    <>
      {driverWeeklyMileageData.getDriversMileageGroups().map((group) => {
        const groupIdentifier = group.groupIdentifier;
        return (
          <div
            key={groupIdentifier}
            style={TRUCKS_BOARD_LAYOUT_STYLES}
            className="min-w-fit grid rounded-[0.3rem] font-open-sans font-light text-[0.7rem] bg-white"
          >
            <LiveSearchCell
              entityType={Entity.USER}
              constructor={User}
              object={group.dispatcher}
              saveObject={(dispatcher: Renderable) =>
                setDispatcher(
                  dispatcher,
                  driverWeeklyMileageData.setDriversMileageGroups,
                  groupIdentifier,
                  driverWeeklyMileageData.getWeekDays(),
                )
              }
              errorMessage={getDispatcherErrorMessage(errors, groupIdentifier)}
              style={getDispatcherLiveSearchCellStyles(group.items.length)}
            />

            {group.items.map((driverWeeklyMileage, idx) => {
              const itemErrors = getDriverMileageErrorsByGroupIdentifier(
                errors,
                groupIdentifier,
              );
              const itemIdentifier = driverWeeklyMileage.itemIdentifier;
              return (
                <div key={itemIdentifier} className="contents">
                  <DriverMileageMetadata
                    groupIdentifier={groupIdentifier}
                    driverWeeklyMileage={driverWeeklyMileage}
                    driverWeeklyMileageData={driverWeeklyMileageData}
                    index={idx}
                    error={itemErrors}
                  />
                  <DailyMileageView
                    driverWeeklyMileage={driverWeeklyMileage}
                    setDriverWeeklyMileage={(mileageIndex, field, value) =>
                      setDriverWeeklyMileage(
                        driverWeeklyMileageData.setDriversMileageGroups,
                        groupIdentifier,
                        itemIdentifier,
                        mileageIndex,
                        field,
                        value,
                      )
                    }
                    error={itemErrors}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};
