import type { Renderable } from "./api/Renderable.ts";

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

export type LiveSearchResultData = {
  items: Renderable[];
  onClick: (item: Renderable) => void;
};
