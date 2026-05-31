import type { Pagination } from "#/shared/hooks/usePagination";
import type { Page } from "#/shared/types/api.types";
import type { Load } from "#/features/loads/components/View/view.types";
import type { Column } from "#/shared/types/view.types";

export interface LoadsTableContextData {
  pagination: Pagination;
  loads: Page<Load>;
  columns: Column[];
  layout: string;
  fetchFn: (pageNumber: number) => void;
}
