import {
  Entity,
  type PaginationData,
} from "#/types/api/common/api-query-types";
import { DEFAULT_SIZE } from "#/shared/api/constants/apiQuery.constants";
import axios from "axios";
import { PAGINATION_DETAILS } from "#/shared/api/constants/apiPaths.constants";

export const getPaginationDetails = async (
  entityType: Entity,
  size: number = DEFAULT_SIZE,
  joinableEntityId?: string,
  joinableEntityName?: string,
): Promise<PaginationData> => {
  const params = {
    pageSize: size,
    entity: entityType,
    joinableEntityId: joinableEntityId ?? null,
    joinableEntityName: joinableEntityName ?? null,
  };

  try {
    const response = await axios.get<PaginationData>(PAGINATION_DETAILS, {
      params: params,
    });
    return response.data;
  } catch {
    return {
      size: DEFAULT_SIZE,
      pages: 0,
    };
  }
};
