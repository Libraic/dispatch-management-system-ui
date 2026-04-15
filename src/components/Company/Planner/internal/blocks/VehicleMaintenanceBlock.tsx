import {
  type DriverWorkforce,
  type VehicleMaintenanceData,
} from "../../../../../types/internal/planner/planner-types.ts";
import React, { useContext } from "react";
import {
  SYSTEM_FONT_BOLD,
  SYSTEM_FONT_NORMAL,
} from "../../../../../tailwind/tailwind-font-vars.ts";
import { SchedulableModal } from "../forms/SchedulableModal.tsx";
import { useActivator } from "../../../../../hooks/useActivator.ts";
import { useToast } from "../../../../../hooks/useToast.ts";
import { useContextMenu } from "../../../../../hooks/useContextMenu.ts";
import type { ContextMenuActionItem } from "../../../../../types/internal/common/context-menu-types.ts";
import { ContextMenu } from "../../../../Common/ContextMenu/public/ContextMenu.tsx";
import { getStartingPointAndWidthOfBlock } from "../../../../../utils/planner/planner-utils.ts";
import {
  deleteVehicleMaintenanceRecordByUuid,
  getVehicleMaintenanceData,
} from "../../../../../service/vehicleMaintenanceService.ts";
import { getDeleteOption } from "../../../../../utils/context-menu/context-menu-utils.ts";
import { DispatchingContext } from "../../../../../context/DispatchingContext.ts";
import { fromGetVehicleMaintenanceRecordToVehicleMaintenanceData } from "../../../../../utils/planner/vehicle-maintenance-utils.ts";
import { GoogleIcon } from "../../../../../shared/components/GoogleIcon/GoogleIcon.tsx";

export const VehicleMaintenanceBlock: React.FC<{
  workforce: DriverWorkforce;
  vehicleMaintenanceData: VehicleMaintenanceData;
}> = ({ workforce, vehicleMaintenanceData }) => {
  const context = useContext(DispatchingContext);
  const days = context!!.days;
  const { startingPoint, width } = getStartingPointAndWidthOfBlock(
    vehicleMaintenanceData.startDate,
    vehicleMaintenanceData.endDate,
    days,
  );

  const loadFormActivator = useActivator();
  const toast = useToast();

  const deleteAction = async () => {
    if (!vehicleMaintenanceData.id) {
      return;
    }

    const data = await deleteVehicleMaintenanceRecordByUuid(
      vehicleMaintenanceData.id,
    );
    if (data.error) {
      toast.withErrorMessage(data.error.message);
      return;
    }

    const startDate = new Date(days[0]);
    const endDate = new Date(days[days.length - 1]);
    const getVehicleMaintenanceDataResponse = await getVehicleMaintenanceData(
      workforce.relationId,
      startDate,
      endDate,
    );
    if (getVehicleMaintenanceDataResponse.error) {
      toast.withErrorMessage(getVehicleMaintenanceDataResponse.error.message);
      return;
    }

    const vehicleMaintenanceDataList = getVehicleMaintenanceDataResponse.data!!;
    const finalVehicleMaintenanceDataList = vehicleMaintenanceDataList.map(
      (vehicleMaintenanceData) =>
        fromGetVehicleMaintenanceRecordToVehicleMaintenanceData(
          vehicleMaintenanceData,
        ),
    );
    context!!.postVehicleMaintenanceRecordDeleteUpdateFn(
      workforce.driver.uuid,
      finalVehicleMaintenanceDataList,
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
          bg-[#ff5f1f]/50
          shadow-sm
          cursor-pointer
          overflow-hidden
          whitespace-nowrap
          text-ellipsis 
          ${SYSTEM_FONT_NORMAL} text-[0.8rem]
        `}
      >
        <div className="flex flex-row justify-between items-center gap-2 w-full">
          <GoogleIcon code="car_repair" size={1.5} />
          <div>
            <p
              className={`text-center border-[0.05rem] rounded-[0.2rem] text-[0.6rem] text-[#dd571c] ${SYSTEM_FONT_BOLD}`}
            >
              Service
            </p>
            <p className={`${SYSTEM_FONT_BOLD} text-[0.7rem]`}>
              {vehicleMaintenanceData.location}
            </p>
          </div>
        </div>
      </div>
      {loadFormActivator.isActive() && (
        <SchedulableModal
          deactivate={loadFormActivator.deactivate}
          props={{
            id: vehicleMaintenanceData.id,
            calendarBookModalType: "Shop",
            workforce: workforce,
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
