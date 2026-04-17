import type { BaseInputFieldProps } from "#/ui/InputField/types/InputField.types";

export interface InputFieldContainerProps extends BaseInputFieldProps {
  inputMode: InputMode;
  type: string;
  inputPreprocessor?: (value: string) => string;
  isReadOnly?: boolean;
}

export type InputMode =
  | "none"
  | "text"
  | "tel"
  | "url"
  | "email"
  | "numeric"
  | "decimal"
  | "search";
