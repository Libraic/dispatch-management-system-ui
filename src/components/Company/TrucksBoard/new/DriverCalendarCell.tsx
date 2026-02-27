import React from "react";
import { useActivator } from "../../../../hooks/useActivator.ts";
import {
  type DriverMileageData,
  LoadStatusColor,
  type MileageData,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import type { Driver } from "../../../../types/internal/classes/Driver.ts";
import { extractUnfocusedCellInformation } from "../../../../utils/trucks-board/trucks-board-utils.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import { MileageFormModal } from "./MileageFormModal.tsx";
import { ContextMenu } from "../../../Common/ContextMenu/public/ContextMenu.tsx";
import { useContextMenu } from "../../../../hooks/useContextMenu.ts";
import removeWhiteIcon from "../../../../assets/trucks-board/mileage-menu/remove-white.svg";
import removeBlackIcon from "../../../../assets/trucks-board/mileage-menu/remove-black.svg";
import type { ContextMenuActionItem } from "../../../../types/internal/common/context-menu-types.ts";
import {
  deleteDriveMileageDataBetweenDates,
  getMileageData,
} from "../../../../service/driverMileageService.ts";
import { toIsoDate } from "../../../../utils/global/date-utils.ts";
import { useToast } from "../../../../hooks/useToast.ts";
import { ToastRenderer } from "../../../Common/Toast/ToastRenderer.tsx";
import { TRUCKS_BOARD_ROW_HEIGHT } from "../../../../constants/trucks-board/trucks-board-constants.ts";
import { SYSTEM_FONT_BOLD } from "../../../../tailwind/tailwind-font-vars.ts";

export const DriverCalendarCell: React.FC<{
  day: string;
  upsertDriverMileageData: (driver: Driver, mileage: MileageData) => void;
  driverMileageData: DriverMileageData;
  isEditable: boolean;
  postDeleteUpdateFn: (
    driver: Driver,
    mileageData: MileageData[],
    driverMileageUuid?: string,
  ) => void;
  styles?: string;
}> = ({
  day,
  upsertDriverMileageData,
  driverMileageData,
  isEditable,
  postDeleteUpdateFn,
  styles,
}) => {
  const toast = useToast();
  const mileageFormActivator = useActivator();
  const unfocusedCellInformation = extractUnfocusedCellInformation(
    day,
    driverMileageData,
  );
  const loadStatus =
    driverMileageData.mileage.get(day)?.loadStatus ?? "Unknown";
  const bgColor = LoadStatusColor[loadStatus];
  const contextMenu = useContextMenu();
  const actionItems: ContextMenuActionItem[] = [
    {
      activeIcon: removeWhiteIcon,
      inactiveIcon: removeBlackIcon,
      label: "Delete",
      action: async () => {
        const uuid = driverMileageData.identifier;
        if (!uuid) {
          return;
        }

        const mileageData = driverMileageData.mileage.get(day);
        if (!mileageData) {
          return;
        }

        const pickUpDate = mileageData.pickUpDate;
        const deliveryDate = mileageData.deliveryDate;
        if (pickUpDate && deliveryDate) {
          const data = await deleteDriveMileageDataBetweenDates(
            uuid,
            toIsoDate(pickUpDate),
            toIsoDate(deliveryDate),
          );
          if (data.error) {
            toast.withErrorMessage(data.error.message);
            return;
          }

          const mileageResponses = await getMileageData(uuid);
          if (mileageResponses.error) {
            toast.withErrorMessage(mileageResponses.error.message);
            return;
          }

          const mileageDataList = mileageResponses.data!!.map(
            (mileageResponse) => {
              return {
                revenue: mileageResponse.revenue,
                miles: mileageResponse.miles,
                broker: mileageResponse.broker,
                representative: mileageResponse.representative,
                representativeContactNumber:
                  mileageResponse.representativeContactNumber,
                pickUpLocation: mileageResponse.pickUpLocation,
                deliveryLocation: mileageResponse.deliveryLocation,
                pickUpDate: new Date(mileageResponse.pickUpDate),
                deliveryDate: new Date(mileageResponse.deliveryDate),
                loadStatus: mileageResponse.loadStatus,
                date: mileageResponse.date,
              } as MileageData;
            },
          );
          const newUuid = mileageDataList.length === 0 ? undefined : uuid;
          postDeleteUpdateFn(
            driverMileageData.driver!!,
            mileageDataList,
            newUuid,
          );
        }
      },
    },
  ];

  return (
    <React.Fragment>
      <div
        className={`${styles ?? BLANK_STRING} flex items-center justify-center whitespace-pre-line text-center text-[0.75rem] ${isEditable && "hover:cursor-pointer"} select-none flex-shrink-0 ${TRUCKS_BOARD_ROW_HEIGHT} ${unfocusedCellInformation !== BLANK_STRING ? bgColor : "bg-red"} ${SYSTEM_FONT_BOLD} text-black/75`}
        onDoubleClick={() => {
          if (isEditable) {
            mileageFormActivator.change();
          }
        }}
        onContextMenu={contextMenu.open}
        onClick={contextMenu.close}
      >
        {unfocusedCellInformation}
      </div>
      {mileageFormActivator.isActive() && (
        <MileageFormModal
          day={day}
          deactivate={mileageFormActivator.deactivate}
          upsertDriverMileageData={upsertDriverMileageData}
          driverMileageData={driverMileageData}
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
      <ToastRenderer toast={toast} />
    </React.Fragment>
  );
};
