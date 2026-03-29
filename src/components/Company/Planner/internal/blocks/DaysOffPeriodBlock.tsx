import { getStartingPointAndWidthOfBlock } from "../../../../../utils/planner/planner-utils.ts";
import { useActivator } from "../../../../../hooks/useActivator.ts";
import { useToast } from "../../../../../hooks/useToast.ts";
import React, { useContext } from "react";
import { DispatchingContext } from "../../../../../context/DispatchingContext.ts";
import { useContextMenu } from "../../../../../hooks/useContextMenu.ts";
import type { ContextMenuActionItem } from "../../../../../types/internal/common/context-menu-types.ts";
import { getDeleteOption } from "../../../../../utils/context-menu/context-menu-utils.ts";
import {
  SYSTEM_FONT_BOLD,
  SYSTEM_FONT_NORMAL,
} from "../../../../../tailwind/tailwind-font-vars.ts";
import daysOffIcon from "../../../../../assets/planner/blocks/days-off.svg";
import { SchedulableModal } from "../forms/SchedulableModal.tsx";
import { ContextMenu } from "../../../../Common/ContextMenu/public/ContextMenu.tsx";
import type {
  DaysOffPeriodData,
  DriverWorkforce,
} from "../../../../../types/internal/planner/planner-types.ts";
import {
  deleteDaysOffPeriodByUuid,
  getDaysOffPeriodData,
} from "../../../../../service/daysOffService.ts";
import { toIsoDate } from "../../../../../utils/global/date-utils.ts";
import { fromGetDaysOffPeriodResponseToDaysOffPeriodData } from "../../../../../utils/planner/days-off-utils.ts";

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

    const startDate = new Date(days[0]);
    const endDate = new Date(days[days.length - 1]);
    const getDaysOffPeriodResponses = await getDaysOffPeriodData(
      workforce.relationId,
      startDate,
      endDate,
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
          ${SYSTEM_FONT_NORMAL} text-[0.8rem]
        `}
      >
        <div className="flex flex-row items-center justify-between w-full">
          <img src={daysOffIcon} alt="pickup" className="w-6 h-6" />

          <div>
            <p
              className={`text-center border-[0.05rem] rounded-[0.2rem] text-[0.6rem] text-black ${SYSTEM_FONT_BOLD}`}
            >
              Days Off
            </p>
            <p className={`${SYSTEM_FONT_BOLD} text-[0.6rem]`}>
              {toIsoDate(daysOffPeriodData.startDate)}
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
