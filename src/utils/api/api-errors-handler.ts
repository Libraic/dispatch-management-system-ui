import type {
  FieldError,
  ItemError,
} from "../../types/registration/user/user-registration-data.ts";
import type {
  ApiResponse,
  Error,
  GroupErrorResponse,
} from "../../types/api/common.ts";
import { isAxiosError } from "axios";
import { INTERNAL_SERVER_ERROR } from "../error-messages.ts";

export const getItemsErrors = (
  groupErrorResponse: GroupErrorResponse,
): ItemError[] => {
  const itemsErrors: ItemError[] = [];
  for (const itemError of groupErrorResponse.errors) {
    const fieldErrors: FieldError[] = [];
    for (const fieldError of itemError.groupItemFieldsErrors) {
      const field: FieldError = {
        field: fieldError.field,
        errorMessage: fieldError.errorMessage,
      };
      fieldErrors.push(field);
    }
    const item: ItemError = {
      id: itemError.itemIdentifier,
      fieldErrors: fieldErrors,
    };
    itemsErrors.push(item);
  }

  return itemsErrors;
};

export const handleApiErrors = <T>(
  error: any,
): ApiResponse<T, GroupErrorResponse[] | Error> => {
  if (isAxiosError(error)) {
    if (error.code === "ERR_NETWORK" || !error.response) {
      return {
        error: {
          message: INTERNAL_SERVER_ERROR,
        },
      };
    }
    return error.response.data;
  }

  return {
    error: {
      message: INTERNAL_SERVER_ERROR,
    },
  };
};
