import type { Renderable } from "../classes/Renderable.ts";
import {
  Entity,
  type SearchCriteria,
} from "../../api/common/api-query-types.ts";

export type LiveSearchEndpointConfig = {
  endpoint: string;
  searchField: string;
};

export const LIVE_SEARCH_ENDPOINTS: Record<Entity, LiveSearchEndpointConfig> = {
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
  Dispatcher: {
    endpoint: "http://localhost:8090/api/dispatchers",
    searchField: "name",
  },
  City: {
    endpoint: "http://localhost:8090/api/cities",
    searchField: "prefix",
  },
} as const;

/**
 * Represents the properties required for the LiveSearchInputForm component.
 *
 * @template D - The data type used for constructing a Renderable object.
 */
export interface LiveSearchInputFormProps<D> {
  /** The type of entity being searched for, e.g., "Driver", "Truck", etc. */
  entityType: Entity;

  /** A constructor function used to create a new Renderable object from the given data type. */
  constructor: new (dto: D) => Renderable;

  /** The ID of the joinable entity associated with the current entity type. */
  joinableEntityId?: string;

  /** The name of the joinable entity associated with the current entity type. */
  joinableEntityName?: string;

  /** The error text displayed if an input validation error occurs. */
  errorMessage?: string;

  /** Additional search criteria to be applied to the API request, e.g., joinable fields, additional filters, etc. */
  customSearchCriteria?: SearchCriteria[];

  isMandatory?: boolean;

  /** The label used for the <input> tag inside the live-search Input Form component. */
  label: string;

  /** The placeholder text shown in the underlying <input> tag. */
  placeholder: string;

  /** The value of the query parameter that will be used to filter data. */
  value: string;

  /** A callback function to save the currently entered data. */
  saveData: (value: Renderable) => void;

  // TODO: Consider deleting this prop
  /** A callback function to clear the entered data in the input field. */
  cleanData?: () => void;
}
