import type {
  ApiResponse,
  Error,
  GroupsErrorResponse,
} from "../../types/api/common.ts";
import type { ItemError } from "../../types/registration/user/user-registration-data.ts";
import { NETWORK_ERROR } from "../error-messages.ts";

export const ERRORS_KEY = "errors";
export const NETWORK_ERROR_KEY = "ERR_NETWORK";

export const handleErrors = <
  T,
  E extends Error | GroupsErrorResponse,
  ErrorsType extends Record<string, string | ItemError[]>,
>(
  apiResponse: ApiResponse<T, E>,
  getBlankErrors: () => ErrorsType,
  isArrayValueKey: (key: keyof ErrorsType) => boolean,
): ErrorsType | Error | null => {
  if (apiResponse.error) {
    if (ERRORS_KEY in apiResponse.error) {
      const registrationDataErrors = getBlankErrors();
      const groupsErrors = apiResponse.error as GroupsErrorResponse;

      Object.entries(groupsErrors.errors).forEach(([key, value]) => {
        const typedKey = key as keyof ErrorsType;

        if (isArrayValueKey(typedKey)) {
          const itemErrors: ItemError[] = [];

          for (const err of value as Error[]) {
            const itemError = {
              id: err.identifier!,
              field: err.field!,
              errorMessage: err.message,
            };
            itemErrors.push(itemError);
          }

          registrationDataErrors[typedKey] = itemErrors as any;
        } else {
          const err = value as Error;
          registrationDataErrors[typedKey] = err.message as any;
        }
      });

      return registrationDataErrors;
    } else {
      return apiResponse.error as Error;
    }
  }

  return null;
};

export const handleApiErrors = <T>(error: any): ApiResponse<T, Error> => {
  if (error.code === NETWORK_ERROR_KEY) {
    return {
      error: {
        message: NETWORK_ERROR,
      },
    };
  }

  return error.response.data;
};
