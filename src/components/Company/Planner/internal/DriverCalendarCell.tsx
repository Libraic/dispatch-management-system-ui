import React from "react";
import { useActivator } from "../../../../hooks/useActivator.ts";
import {
  type DriverLoadData,
  type LoadData,
  LoadStatusColor,
} from "../../../../types/internal/planner/planner-types.ts";
import {
  extractUnfocusedCellInformation,
  fromLoadResponsesToLoadData,
} from "../../../../utils/planner/planner-utils.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import { LoadFormModal } from "./LoadFormModal.tsx";
import { ContextMenu } from "../../../Common/ContextMenu/public/ContextMenu.tsx";
import { useContextMenu } from "../../../../hooks/useContextMenu.ts";
import removeWhiteIcon from "../../../../assets/planner/load-menu/remove-white.svg";
import removeBlackIcon from "../../../../assets/planner/load-menu/remove-black.svg";
import type { ContextMenuActionItem } from "../../../../types/internal/common/context-menu-types.ts";
import {
  deleteLoadDataBetweenDates,
  getLoadData,
} from "../../../../service/loadsService.ts";
import { useToast } from "../../../../hooks/useToast.ts";
import { ToastRenderer } from "../../../Common/Toast/ToastRenderer.tsx";
import { PLANNER_ROW_HEIGHT } from "../../../../constants/planner/planner-constants.ts";
import { SYSTEM_FONT_BOLD } from "../../../../tailwind/tailwind-font-vars.ts";
import { TABLE_BORDER_BASE_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";
import type { DriverData } from "../../../../types/api/driver/driver-api-response-types.ts";

export const DriverCalendarCell: React.FC<{
  day: string;
  upsertDriverLoadData: (driver: DriverData, loadData: LoadData) => void;
  driverLoadData: DriverLoadData;
  isEditable: boolean;
  postDeleteUpdateFn: (
    driver: DriverData,
    loadDataList: LoadData[],
    loadUuid?: string,
  ) => void;
  styles?: string;
}> = ({
  day,
  upsertDriverLoadData,
  driverLoadData,
  isEditable,
  postDeleteUpdateFn,
}) => {
  const toast = useToast();
  const loadFormActivator = useActivator();
  const unfocusedCellInformation = extractUnfocusedCellInformation(
    day,
    driverLoadData,
  );
  const loadStatus = driverLoadData.loads.get(day)?.loadStatus ?? "Unknown";
  const bgColor = LoadStatusColor[loadStatus];
  const contextMenu = useContextMenu();
  const actionItems: ContextMenuActionItem[] = [
    {
      activeIcon: removeWhiteIcon,
      inactiveIcon: removeBlackIcon,
      label: "Delete",
      action: async () => {
        const uuid = driverLoadData.identifier;
        if (!uuid) {
          return;
        }

        const loadData = driverLoadData.loads.get(day);
        if (!loadData) {
          return;
        }

        if (!loadData.idAcrossTimeframe) {
          return;
        }

        const data = await deleteLoadDataBetweenDates(
          uuid,
          loadData.idAcrossTimeframe,
        );
        if (data.error) {
          toast.withErrorMessage(data.error.message);
          return;
        }

        const getLoadResponse = await getLoadData(uuid);
        if (getLoadResponse.error) {
          toast.withErrorMessage(getLoadResponse.error.message);
          return;
        }

        const loadResponses = getLoadResponse.data!!;
        const loadDataList = fromLoadResponsesToLoadData(loadResponses);
        const newUuid = loadDataList.length === 0 ? undefined : uuid;
        postDeleteUpdateFn(driverLoadData.driver!!, loadDataList, newUuid);
      },
    },
  ];

  return (
    <React.Fragment>
      <div
        className={`border-r-1 ${TABLE_BORDER_BASE_COLOR} border-b-1 flex items-center justify-center whitespace-pre-line text-center text-[0.75rem] ${isEditable && "hover:cursor-pointer"} select-none flex-shrink-0 ${PLANNER_ROW_HEIGHT} ${unfocusedCellInformation !== BLANK_STRING ? bgColor : "bg-red"} ${SYSTEM_FONT_BOLD} text-black/75`}
        onDoubleClick={() => {
          if (isEditable) {
            loadFormActivator.change();
          }
        }}
        onContextMenu={contextMenu.open}
        onClick={contextMenu.close}
      >
        {unfocusedCellInformation}
      </div>
      {loadFormActivator.isActive() && (
        <LoadFormModal
          day={day}
          deactivate={loadFormActivator.deactivate}
          upsertLoadData={upsertDriverLoadData}
          driverLoadData={driverLoadData}
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
