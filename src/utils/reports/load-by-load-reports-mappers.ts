import { NOT_AVAILABLE } from "../../constants/common/global-constants.ts";
import type { LoadByLoadResponse } from "../../types/api/reports/load-by-load-types.ts";
import type {
  LoadByLoadModel,
  SpanValue,
} from "../../types/internal/kpi/load-by-load-internal-types.ts";

export const flattenLoadByLoadApiData = (
  loadByLoadApiResponse: LoadByLoadResponse[],
) => {
  const loadByLoadModels: LoadByLoadModel[] = [];
  for (const model of loadByLoadApiResponse) {
    const dailyItems = new Map<string, SpanValue[]>();
    const windowItems = new Map<string, SpanValue[]>();
    for (const loadByLoadDataItem of model.loadByLoadData) {
      for (const loadByLoadDailyItems of loadByLoadDataItem.loadByLoadItemsPerDay) {
        for (const loadByLoadDailyItem of loadByLoadDailyItems) {
          const arr = dailyItems.get(loadByLoadDailyItem.label) ?? [];
          arr.push(
            loadByLoadDailyItem.value !== null
              ? {
                  value: loadByLoadDailyItem.value,
                  span: 1,
                }
              : {
                  value: NOT_AVAILABLE,
                  span: 1,
                },
          );
          dailyItems.set(loadByLoadDailyItem.label, arr);
        }
      }
      for (const loadByLoadWindowItem of loadByLoadDataItem.loadByLoadItemsPerWindow) {
        const arr = windowItems.get(loadByLoadWindowItem.label) ?? [];
        arr.push({
          value: loadByLoadWindowItem.value,
          span: loadByLoadDataItem.loadByLoadItemsPerDay.length,
        });
        windowItems.set(loadByLoadWindowItem.label, arr);
      }
    }
    loadByLoadModels.push({
      subjectName: model.subject.name,
      key: model.subject.uuid,
      dailyItems: dailyItems,
      windowItems: windowItems,
    });
  }

  return loadByLoadModels;
};
