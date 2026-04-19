import {
  deleteLoadByUuid,
  getLoadData,
  upsertLoad,
} from "#/features/planner/api/loads.api";
import { useContext } from "react";
import { ToastContext } from "#/ui/Toast/context/ToastContext";
import { DispatchingContext } from "#/context/DispatchingContext";
import type {
  DriverWorkforce,
  LoadData,
  LoadStatus,
} from "#/types/internal/planner/planner-types";
import { fromGetLoadResponseToLoadData } from "#/features/planner/utils/loads.utils";

export function useLoadBlock(load: LoadData, driverLoadData: DriverWorkforce) {
  const context = useContext(DispatchingContext)!;
  const { showToast } = useContext(ToastContext);

  const updateStatus = async (loadStatus: LoadStatus) => {
    const response = await upsertLoad(
      load,
      driverLoadData.relationId,
      loadStatus,
    );

    if (!response.ok) {
      showToast(response.error.message);
      return;
    }

    const newLoadData = fromGetLoadResponseToLoadData(response.data);
    context.upsertLoadFn(driverLoadData, newLoadData);
  };

  const deleteLoad = async () => {
    const response = await deleteLoadByUuid(load.id!);

    if (!response.ok) {
      showToast(response.error.message);
      return;
    }

    const startDate = new Date(context.days[0]);
    const endDate = new Date(context.days[context.days.length - 1]);

    const reload = await getLoadData(
      driverLoadData.relationId,
      startDate,
      endDate,
    );

    if (!reload.ok) {
      showToast(reload.error.message);
      return;
    }

    const loadDataList = reload.data!.map((l) =>
      fromGetLoadResponseToLoadData(l),
    );

    context.postLoadDeleteUpdateFn(driverLoadData.driver!, loadDataList);
  };

  return {
    updateStatus,
    deleteLoad,
  };
}
