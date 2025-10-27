import type { Renderable } from "../classes/Renderable.ts";
import type { SearchCriteria } from "../../api/common/api-query-types.ts";

export type LiveSearchEndpointConfig = {
  endpoint: string;
  searchField: string;
};

export enum LiveSearchKey {
  USER = "USER",
  COMPANY = "COMPANY",
  DRIVER = "DRIVER",
  TRUCK = "TRUCK",
  TRAILER = "TRAILER",
}

export const LIVE_SEARCH_ENDPOINTS: Record<string, LiveSearchEndpointConfig> = {
  USER: {
    endpoint: "http://localhost:8090/api/users",
    searchField: "fullName",
  },
  COMPANY: {
    endpoint: "http://localhost:8090/api/companies",
    searchField: "name",
  },
  DRIVER: {
    endpoint: "http://localhost:8090/api/drivers",
    searchField: "fullName",
  },
  TRUCK: {
    endpoint: "http://localhost:8090/api/trucks",
    searchField: "truckNumber",
  },
  TRAILER: {
    endpoint: "http://localhost:8090/api/trailers",
    searchField: "trailerNumber",
  },
} as const;

export type LiveSearchCellData<D, R> = {
  defaultSearchKey: string;
  constructor: new (dto: D) => Renderable;
  object: Renderable | null;
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
  searchKey: string;

  /** Indicates whether the input field is mandatory. Defaults to false if not specified. */
  isMandatory?: boolean;

  /** The error text displayed if an input validation error occurs. */
  errorText?: string;

  /** A callback function to save the currently entered data. */
  saveData: (value: Renderable) => void;

  /** A callback function to clear the entered data in the input field. */
  cleanData: () => void;

  /** A constructor function used to create a new Renderable object from the given data type. */
  constructor: new (dto: D) => Renderable;
}
