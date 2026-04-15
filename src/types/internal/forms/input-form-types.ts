import type { TailwindProperties } from "../style.ts";
import type { InputMode } from "../common/props-types.ts";

interface BaseInputFormData {
  label: string;
  placeholder: string;
  inputFieldValue: string;
  saveInputData: (value: string) => void;
  isMandatory?: boolean;
  errorMessage?: string;
  onFocus?: () => void;
  tailwindProperties?: TailwindProperties;
}

export interface TextualInputFormData extends BaseInputFormData {}

export interface InputFormContainerData extends BaseInputFormData {
  inputMode: InputMode;
  type: string;
  inputPreprocessor?: (value: string) => string;
  isReadOnly?: boolean;
}
