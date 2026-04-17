import React from "react";

export type StateData<D, E> = {
  data: D;
  error: E;
  setData: React.Dispatch<React.SetStateAction<D>>;
};

export type FieldRequirement = "mandatory" | "optional";
