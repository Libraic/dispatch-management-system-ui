import { getStartingPointAndWidthOfBlock } from "#/utils/planner/planner-utils";
import { useActivator } from "#/hooks/useActivator";
import { useToast } from "#/ui/Toast/useToast";
import React, { useContext } from "react";
import { DispatchingContext } from "#/context/DispatchingContext";
import { useContextMenu } from "#/hooks/useContextMenu";
import type { ContextMenuActionItem } from "#/types/internal/common/context-menu-types";
import { getDeleteOption } from "#/utils/context-menu/context-menu-utils";
import { SchedulableModal } from "#/features/planner/components/internal/forms/SchedulableModal";
import { ContextMenu } from "#/ui/ContextMenu/public/ContextMenu";
import type {
  DaysOffPeriodData,
  DriverWorkforce,
} from "#/types/internal/planner/planner-types";
import {
  deleteDaysOffPeriodByUuid,
  getDaysOffPeriodData,
} from "#/service/daysOffService";
import { fromGetDaysOffPeriodResponseToDaysOffPeriodData } from "#/utils/planner/days-off-utils";
import { GoogleIcon } from "#/ui/GoogleIcon/GoogleIcon";

export const DaysOffPeriodBlock: React.FC<{
  workforce: DriverWorkforce;
  daysOffPeriodData: DaysOffPeriodData;
}> = ({ workforce, daysOffPeriodData }) => {
  const context = useContext(DispatchingContext);
  const days = context!!.days;
  const { startingPoint, width } = getStartingPointAndWidthOfBlock(
    daysOffPeriodData.startDate,
    daysOffPeriodData.endDate,
    days,
  );

  const loadFormActivator = useActivator();
  const toast = useToast();

  const deleteAction = async () => {
    if (!daysOffPeriodData.id) {
      return;
    }

    const data = await deleteDaysOffPeriodByUuid(daysOffPeriodData.id);
    if (data.error) {
      toast.withErrorMessage(data.error.message);
      return;
    }

    const getDaysOffPeriodResponses = await getDaysOffPeriodData(
      workforce.relationId,
      days[0],
      days[days.length - 1],
    );
    if (getDaysOffPeriodResponses.error) {
      toast.withErrorMessage(getDaysOffPeriodResponses.error.message);
      return;
    }

    const daysOffPeriodsDataList = getDaysOffPeriodResponses.data!!;
    const finalDaysOffPeriodsDataList = daysOffPeriodsDataList.map(
      (getDaysOffPeriodResponse) =>
        fromGetDaysOffPeriodResponseToDaysOffPeriodData(
          getDaysOffPeriodResponse,
        ),
    );
    context!!.postDaysOffPeriodDeleteUpdateFn(
      workforce.driver.uuid,
      finalDaysOffPeriodsDataList,
    );
  };

  const contextMenu = useContextMenu();
  const actionItems: ContextMenuActionItem[] = [getDeleteOption(deleteAction)];

  return (
    <div
      className="absolute top-2 h-[3.6rem] pointer-events-auto"
      onDoubleClick={() => loadFormActivator.change()}
      onContextMenu={(e: React.MouseEvent) => {
        if (!loadFormActivator.isActive()) {
          contextMenu.open(e);
        }
      }}
      onClick={contextMenu.close}
      style={{
        left: `${startingPoint}rem`,
        width: `${width}rem`,
      }}
    >
      <div
        className={`
          relative h-full mx-1
          rounded-lg
          flex items-center
          px-3
          bg-gray-300
          shadow-sm
          cursor-pointer
          overflow-hidden
          whitespace-nowrap
          text-ellipsis 
          font-normal text-[0.8rem]
        `}
      >
        <div className="flex flex-row items-center justify-between w-full">
          <GoogleIcon code="event_busy" size={1.5} />
          <div>
            <p
              className={`text-center border-[0.05rem] rounded-[0.2rem] text-[0.6rem] text-black font-bold`}
            >
              Days Off
            </p>
            <p className={`font-bold text-[0.6rem]`}>
              {daysOffPeriodData.startDate}
            </p>
          </div>
        </div>
      </div>
      {loadFormActivator.isActive() && (
        <SchedulableModal
          deactivate={loadFormActivator.deactivate}
          props={{
            workforce: workforce,
            calendarBookModalType: "Days-off",
            id: daysOffPeriodData.id,
          }}
        />
      )}
      {contextMenu.isActive() && (
        <ContextMenu
          x={contextMenu.getX()}
          y={contextMenu.getY()}
          deactivateContextMenuFn={contextMenu.close}
          actions={actionItems}
        />
      )}
    </div>
  );
};
