import { DRIVERS_VIEW_COLUMNS_LAYOUT } from "#/features/drivers/components/View/public/DriversTable/driversTable.constants";
import {
  HOVER_BACKGROUND_NORMAL_COLOR,
  HOVER_BORDER_B_NORMAL_COLOR,
  ODD_BACKGROUND_LIGHT_GRAY,
} from "#/shared/constants/tailwind/tailwindColors.constants";
import { TableCell } from "#/ui/Table/public/TableCell";
import { type FC, Fragment, useContext } from "react";
import { ContextMenu } from "#/ui/ContextMenu/public/ContextMenu";
import { getDeleteOption } from "#/utils/context-menu/context-menu-utils";
import type { ContextMenuActionItem } from "#/types/internal/common/context-menu-types";
import { useContextMenu } from "#/hooks/useContextMenu";
import { deleteDriverById } from "#/features/drivers/api/drivers.api";
import { ToastContext } from "#/ui/Toast/context/ToastContext";
import { DriversTableContext } from "#/features/drivers/context/DriversTableContext";
import type { DriverData } from "#/features/drivers/api/api.types";

type DriverRowProps = {
  driver: DriverData;
  currentPage: number;
  items: number;
};

export const DriverRow: FC<DriverRowProps> = ({
  driver,
  currentPage,
  items,
}) => {
  const { showToast } = useContext(ToastContext);
  const context = useContext(DriversTableContext)!!;

  const deleteDriver = async () => {
    const result = await deleteDriverById(driver.uuid);
    if (!result.ok) {
      showToast(result.error.message);
      return;
    }

    const pageToFetch =
      items === 1 && currentPage !== 0 ? currentPage - 1 : currentPage;
    context.fetchFn(pageToFetch);
  };

  const contextMenu = useContextMenu();
  const actionItems: ContextMenuActionItem[] = [getDeleteOption(deleteDriver)];

  return (
    <Fragment>
      <div
        className={`grid items-center ${DRIVERS_VIEW_COLUMNS_LAYOUT} ${ODD_BACKGROUND_LIGHT_GRAY} h-[2.75rem] font-normal text-[0.85rem] px-[2rem] ${HOVER_BACKGROUND_NORMAL_COLOR} ${HOVER_BORDER_B_NORMAL_COLOR} hover:text-white w-[100%]`}
      >
        <TableCell data={`${driver.firstName} ${driver.lastName}`} />
        <TableCell data={driver.truckNumber} />
        <TableCell data={driver.trailerNumber} />
        <TableCell data={driver.state} />
        <TableCell data={driver.city} />
        <div
          className="hover:cursor-pointer font-black pb-[0.4rem]"
          onClick={contextMenu.open}
        >
          ...
        </div>
      </div>
      {contextMenu.isActive() && (
        <ContextMenu
          x={contextMenu.getX()}
          y={contextMenu.getY()}
          deactivateContextMenuFn={contextMenu.close}
          actions={actionItems}
        />
      )}
    </Fragment>
  );
};
