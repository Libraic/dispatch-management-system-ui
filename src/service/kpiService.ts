import axios from "axios";
import { KPI_BASE_URL } from "../constants/api/api-paths.ts";
import type { KpiResponse } from "../types/api/kpi/kpi-api-response-types.ts";
import { DEFAULT_DATE_LOCALE } from "../constants/date/date-constants.ts";
import type { TimeFrameUnit } from "../types/internal/reports/timeline-types.ts";

export const fetchKpis = async (
  companyUuid: string,
  startDate: Date,
  endDate: Date,
  timeFrame: TimeFrameUnit,
) => {
  const startIso = new Intl.DateTimeFormat(DEFAULT_DATE_LOCALE).format(
    startDate,
  );
  const endIso = new Intl.DateTimeFormat(DEFAULT_DATE_LOCALE).format(endDate);
  try {
    const response = await axios.get<KpiResponse[]>(KPI_BASE_URL, {
      params: {
        companyUuid: companyUuid,
        start: startIso,
        end: endIso,
        target: "DRIVER",
        window: timeFrame,
        kpis: "Gross,Miles,APM",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
