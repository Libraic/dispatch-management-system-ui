import type { Renderable } from "../classes/Renderable.ts";
import {
  PageableEntity,
  type SearchCriteria,
} from "../../api/common/api-query-types.ts";

export type LiveSearchEndpointConfig = {
  endpoint: string;
  searchField: string;
};

export const LIVE_SEARCH_ENDPOINTS: Record<
  PageableEntity,
  LiveSearchEndpointConfig
> = {
  User: {
    endpoint: "http://localhost:8090/api/users",
    searchField: "fullName",
  },
  Company: {
    endpoint: "http://localhost:8090/api/companies",
    searchField: "name",
  },
  Driver: {
    endpoint: "http://localhost:8090/api/drivers",
    searchField: "fullName",
  },
  Truck: {
    endpoint: "http://localhost:8090/api/trucks",
    searchField: "truckNumber",
  },
  Trailer: {
    endpoint: "http://localhost:8090/api/trailers",
    searchField: "trailerNumber",
  },
} as const;

export type LiveSearchCellData<D, R> = {
  entityType: PageableEntity;
  constructor: new (dto: D) => Renderable;
  object: Renderable | null;
  joinableEntityId?: string;
  joinableField?: string;
  saveObject?: (renderable: Renderable) => R;
  customSearchCriteria?: SearchCriteria[];
  errorMessage?: string;
};

/**
 * Represents the properties required for the LiveSearchInputForm component.
 *
 * @template D - The data type used for constructing a Renderable object.
 */
export interface LiveSearchInputFormProps<D> {
  /** The label used for the InputForm component. */
  label: string;

  /** The placeholder text shown when the input field is empty. */
  placeholder: string;

  /** The current value of the input field. */
  value: string;

  /** The value of the query parameter that will be used to filter data. */
  entityType: PageableEntity;

  /** Indicates whether the input field is mandatory. Defaults to false if not specified. */
  isMandatory?: boolean;

  /** The error text displayed if an input validation error occurs. */
  errorText?: string;

  joinableEntityId?: string;

  /** A callback function to save the currently entered data. */
  saveData: (value: Renderable) => void;

  /** A callback function to clear the entered data in the input field. */
  cleanData: () => void;

  /** A constructor function used to create a new Renderable object from the given data type. */
  constructor: new (dto: D) => Renderable;

  customSearchCriteria?: SearchCriteria[];
}
