import type { PaginationData } from "../types/api/common/api-query-types.ts";
import { DEFAULT_SIZE } from "../constants/api/api-query-constants.ts";
import axios from "axios";

export const getPaginationDetails = async (
  joinableEntityId: string,
  paginationUrl: string,
): Promise<PaginationData> => {
  const params = {
    pageSize: DEFAULT_SIZE,
    joinableEntityId: joinableEntityId,
  };
  try {
    const response = await axios.get<PaginationData>(paginationUrl, {
      params: params,
    });
    return response.data;
  } catch (error: any) {
    return {
      size: DEFAULT_SIZE,
      pages: 0,
    };
  }
};
