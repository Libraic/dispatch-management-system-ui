import type { KpiResponse } from "../../types/api/kpi/kpi-api-response-types.ts";
import type {
  KpiData,
  KpiModel,
} from "../../types/internal/kpi/kpi-internal-types.ts";

export const fromKpiDataToKpiModels = (
  kpiResponses: KpiResponse[],
): KpiModel[] => {
  const kpiModels: KpiModel[] = [];
  for (const kpiResponse of kpiResponses) {
    const kpisData: KpiData[] = [];
    const kpisDetails = kpiResponse.kpis;
    const numberOfDiscriminators = kpisDetails[0].discriminators.length;
    for (let i = 0; i < numberOfDiscriminators; ++i) {
      const kpis = [];
      for (let j = 0; j < kpisDetails.length; ++j) {
        const kpiValue = {
          type: kpisDetails[j].type,
          value: kpisDetails[j].discriminators[i].value,
          hasCurrency: kpisDetails[j].discriminators[i].hasCurrency,
        };
        kpis.push(kpiValue);
      }
      const kpiData = {
        start: kpisDetails[0].discriminators[i].startDate,
        end: kpisDetails[0].discriminators[i].endDate,
        label: kpisDetails[0].discriminators[i].label,
        kpis: kpis,
      };
      kpisData.push(kpiData);
    }
    const model: KpiModel = {
      uuid: kpiResponse.subject.uuid,
      subjectName: kpiResponse.subject.name,
      kpisData: kpisData,
    };
    kpiModels.push(model);
  }
  return kpiModels;
};
