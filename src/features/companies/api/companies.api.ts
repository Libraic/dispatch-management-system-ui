import type {
  ApiError,
  NoContentResponse,
  Result,
} from "#/shared/types/api.types";
import type { CompanySettings } from "#/features/companies/components/CompanySettings/Settings/Settings.types";
import type {
  GetCompanySettingsResponse,
  UpdateCompanySettingsRequest,
} from "#/features/companies/api/api.types";
import axios from "axios";
import {
  COMPANIES_BASE_URL,
  COMPANIES_SETTINGS_URL,
} from "#/shared/api/constants/apiPaths.constants";
import { getApiError } from "#/shared/api/utils/api.utils";

export const changeSettings = async (
  companyId: string,
  settings: CompanySettings,
): Promise<Result<NoContentResponse, ApiError>> => {
  const request: UpdateCompanySettingsRequest = {
    timezone: settings.timezone.value,
  };

  const url = getCompanySettingsUrl(companyId);
  try {
    const response = await axios.put(url, request);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown) {
    return getApiError(error);
  }
};

export const getSettings = async (
  companyId: string,
): Promise<Result<GetCompanySettingsResponse, ApiError>> => {
  const url = getCompanySettingsUrl(companyId);
  try {
    const response = await axios.get(url);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown) {
    return getApiError(error);
  }
};

const getCompanySettingsUrl = (uuid: string) =>
  `${COMPANIES_BASE_URL}/${uuid}${COMPANIES_SETTINGS_URL}`;
