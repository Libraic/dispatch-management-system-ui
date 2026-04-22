import type { TailwindProperties } from "#/types/internal/style";

export interface BaseInputFieldProps {
  label: string;
  placeholder: string;
  inputFieldValue: string;
  saveInputData: (value: string) => void;
  isMandatory?: boolean;
  errorMessage?: string;
  onFocus?: () => void;
  tailwindProperties?: TailwindProperties;
  formatter?: (value: string) => string;
  validator?: (value: string) => boolean;
}
