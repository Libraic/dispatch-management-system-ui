import React from "react";

export type InputMode =
  | "none"
  | "text"
  | "tel"
  | "url"
  | "email"
  | "numeric"
  | "decimal"
  | "search";

export type StateData<D, E> = {
  data: D;
  error: E;
  setData: React.Dispatch<React.SetStateAction<D>>;
};

export type FieldRequirement = "mandatory" | "optional";
