import { useContext, useEffect, useState } from "react";
import type { Column } from "#/shared/types/view.types";
import { getLoadsColumns } from "#/features/planner/api/loads.api";
import { ToastContext } from "#/ui/Toast/context/ToastContext";

export const useColumns = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    const getColumns = async () => {
      const response = await getLoadsColumns();
      if (!response.ok) {
        showToast(response.error.message);
        return;
      }

      setColumns(response.data);
    };

    getColumns().then(() => {});
  }, []);

  return columns;
};
