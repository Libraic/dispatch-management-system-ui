import type { StateData } from "../../types/internal/common/props-types.ts";
import React from "react";

export const createStateData = <T, E>(
  data: T,
  error: E,
  setData: React.Dispatch<React.SetStateAction<T>>,
): StateData<T, E> => {
  return { data, error, setData };
};
