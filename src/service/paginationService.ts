import {
  PageableEntity,
  type PaginationData,
} from "../types/api/common/api-query-types.ts";
import { DEFAULT_SIZE } from "../constants/api/api-query-constants.ts";
import axios from "axios";
import { PAGINATION_DETAILS } from "../constants/api/api-paths.ts";

export const getPaginationDetails = async (
  entityType: PageableEntity,
  joinableEntityId?: string,
): Promise<PaginationData> => {
  const params = {
    entity: entityType,
    pageSize: DEFAULT_SIZE,
    joinableEntityId: joinableEntityId,
  };
  if (joinableEntityId) {
    params.joinableEntityId = joinableEntityId;
  }

  try {
    const response = await axios.get<PaginationData>(PAGINATION_DETAILS, {
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
