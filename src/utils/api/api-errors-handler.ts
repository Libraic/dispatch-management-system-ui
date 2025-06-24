import type {
  FieldError,
  ItemError,
} from "../../types/registration/user/user-registration-data.ts";
import type { GroupErrorResponse } from "../../types/api/common.ts";

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
