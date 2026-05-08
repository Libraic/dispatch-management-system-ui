import type { Page } from "#/shared/types/api.types";

export const getEmptyPage = <T>(): Page<T> => {
  return {
    content: [],
    page: {
      number: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    },
  };
};
