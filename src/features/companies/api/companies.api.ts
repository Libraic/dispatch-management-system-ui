import type {
  ApiError,
  NoContentResponse,
  Page,
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
import type { CompanyData } from "#/types/api/company/company-api-response-types";
import { createCreateCompanyRequestFromCompanyRegistrationData } from "#/utils/company/company-registration-utils";
import type { CompanyRegistrationData } from "#/types/internal/company/company-registration-data";
import { PAGE, SIZE } from "#/shared/api/constants/apiQuery.constants";
import { DEFAULT_PAGE_SIZE } from "#/shared/api/constants/api.constants";

export const getCompanies = async (
  page?: number,
): Promise<Result<Page<CompanyData>, ApiError>> => {
  try {
    const params = {
      [SIZE]: DEFAULT_PAGE_SIZE,
      ...(page !== undefined && { [PAGE]: page }),
    };
    const response = await axios.get(COMPANIES_BASE_URL, {
      params: params,
    });
    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return getApiError(error);
  }
};

export const getCompanyByUuid = async (
  companyUuid: string,
): Promise<Result<CompanyData, ApiError>> => {
  try {
    const url = `${COMPANIES_BASE_URL}/${companyUuid}`;
    const response = await axios.get(url);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: any) {
    return getApiError(error);
  }
};

export const saveCompany = async (
  companyRegistrationData: CompanyRegistrationData,
): Promise<Result<CompanyData, ApiError>> => {
  const createCompanyRequest =
    createCreateCompanyRequestFromCompanyRegistrationData(
      companyRegistrationData,
    );
  try {
    const response = await axios.post(COMPANIES_BASE_URL, createCompanyRequest);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: any) {
    return getApiError(error);
  }
};

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
