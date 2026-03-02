import axios from "axios";
import { DRIVERS_MILEAGE_BASE_URL } from "../constants/api/api-paths.ts";
import { handleApiErrors } from "../utils/api/api-common-error-utils.ts";
import {
  COMPANY_ID_QUERY_PARAM,
  END_DATE_QUERY_PARAM,
  START_DATE_QUERY_PARAM,
} from "../constants/api/api-query-constants.ts";
import type {
  ApiResponse,
  NoContentResponse,
} from "../types/api/common/api-response-types.ts";
import type { Error } from "../types/api/common/api-errors-types.ts";
import type {
  GetDriverMileageResponse,
  MileageResponse,
  UpsertDriverMileageRequest,
  UpsertDriverMileageResponse,
} from "../types/api/driver-mileage/driver-mileage-api-types.ts";

export const upsertDriverMileage = async (
  upsertDriversMileageRequest: UpsertDriverMileageRequest,
): Promise<ApiResponse<UpsertDriverMileageResponse, Error>> => {
  try {
    const response = await axios.put(
      DRIVERS_MILEAGE_BASE_URL,
      upsertDriversMileageRequest,
    );
    return response.data;
  } catch (error: any) {
    return handleApiErrors(error);
  }
};

export const getDriversMileageByCompanyUuidAndStartAndEndDate = async (
  companyUuid: string,
  week: string[],
): Promise<ApiResponse<GetDriverMileageResponse[], Error>> => {
  const startDate = week[0];
  const endDate = week[week.length - 1];
  try {
    const response = await axios.get<
      ApiResponse<GetDriverMileageResponse[], Error>
    >(DRIVERS_MILEAGE_BASE_URL, {
      params: {
        [COMPANY_ID_QUERY_PARAM]: companyUuid,
        [START_DATE_QUERY_PARAM]: startDate,
        [END_DATE_QUERY_PARAM]: endDate,
      },
    });
    return response.data;
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const getMileageData = async (
  driverMileageUuid: string,
): Promise<ApiResponse<MileageResponse[], Error>> => {
  const url = DRIVERS_MILEAGE_BASE_URL + `/${driverMileageUuid}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const deleteDriveMileageDataBetweenDates = async (
  driverMileageUuid: string,
  idAcrossTimeframe: string,
): Promise<ApiResponse<NoContentResponse, Error>> => {
  const params = {
    mileage: driverMileageUuid,
    idAcrossTimeframe: idAcrossTimeframe,
  };
  try {
    const response = await axios.delete<
      ApiResponse<GetDriverMileageResponse[], Error>
    >(DRIVERS_MILEAGE_BASE_URL, {
      params: params,
    });
    return response.data;
  } catch (error) {
    return handleApiErrors(error);
  }
};
