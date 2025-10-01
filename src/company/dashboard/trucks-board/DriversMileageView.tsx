import * as React from "react";
import type { DriverWeeklyMileageData } from "../../../hooks/useDriverWeeklyMileage.ts";
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
import {
  DISPATCHER_KEY,
  type DriverMileageErrors,
} from "../../../types/financial/trucks-board.ts";
import { BLANK_STRING } from "../../../utils/constants/global-constants.ts";
import {
  getDispatcherLiveSearchCellStyles,
  TRUCKS_BOARD_LAYOUT_STYLES,
} from "../../../utils/trucks-board/trucks-board-styles-utils.ts";

export const DriversMileageView: React.FC<{
  driverWeeklyMileageData: DriverWeeklyMileageData;
}> = ({ driverWeeklyMileageData }) => {
  const errors = driverWeeklyMileageData.errors;
  return (
    <>
      {driverWeeklyMileageData.getDriversMileageGroups().map((group) => (
        <div
          key={group.groupIdentifier}
          style={TRUCKS_BOARD_LAYOUT_STYLES}
          className="min-w-fit grid rounded-[0.3rem] font-open-sans font-light text-[0.7rem] bg-white"
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
                driverWeeklyMileageData.getWeekDays(),
              )
            }
            errorMessage={
              (errors &&
                errors[group.groupIdentifier] &&
                (errors[group.groupIdentifier][DISPATCHER_KEY] as string)) ||
              BLANK_STRING
            }
            style={getDispatcherLiveSearchCellStyles(group.items.length)}
          />

          {group.items.map((driverWeeklyMileage, idx) => {
            const itemErrors =
              (errors &&
                errors[group.groupIdentifier] &&
                (errors[group.groupIdentifier][
                  driverWeeklyMileage.itemIdentifier
                ] as DriverMileageErrors)) ||
              {};
            return (
              <div
                key={driverWeeklyMileage.itemIdentifier}
                className="contents"
              >
                <DriverMileageMetadata
                  groupIdentifier={group.groupIdentifier}
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
                      group.groupIdentifier,
                      driverWeeklyMileage.itemIdentifier,
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
      ))}
    </>
  );
};
