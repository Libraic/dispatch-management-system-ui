import axios from "axios";
import { KPI_BASE_URL } from "../constants/api/api-paths.ts";
import type { KpiResponse } from "../types/api/kpi/kpi-api-response-types.ts";

export const fetchKpis = async (companyUuid: string) => {
  try {
    const response = await axios.get<KpiResponse[]>(KPI_BASE_URL, {
      params: {
        companyUuid: companyUuid,
        start: "2025-01-01",
        end: "2025-12-31",
        target: "DRIVER",
        window: "MONTH",
        kpis: "Gross,Miles,APM",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
