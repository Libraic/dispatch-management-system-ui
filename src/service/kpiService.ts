import axios from "axios";
import {
  FINANCIAL_REPORTS_BASE_URL,
  LOAD_BY_LOAD_REPORTS_URL,
} from "../constants/api/api-paths.ts";
import type { KpiResponse } from "../types/api/reports/kpi-api-response-types.ts";
import { DEFAULT_DATE_LOCALE } from "../constants/date/date-constants.ts";
import type { TimeFrameUnit } from "../types/internal/reports/timeline-types.ts";
import type { LoadByLoadResponse } from "../types/api/reports/load-by-load-types.ts";

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
    const response = await axios.get<KpiResponse[]>(
      FINANCIAL_REPORTS_BASE_URL,
      {
        params: {
          companyUuid: companyUuid,
          start: startIso,
          end: endIso,
          target: "DRIVER",
          window: timeFrame,
          kpis: "Gross,Miles,APM",
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchLoadByLoadReports = async (
  companyUuid: string,
  month: string,
  year: number,
) => {
  try {
    const response = await axios.get<LoadByLoadResponse[]>(
      LOAD_BY_LOAD_REPORTS_URL,
      {
        params: {
          companyUuid: companyUuid,
          year: year,
          month: month.toUpperCase(),
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
