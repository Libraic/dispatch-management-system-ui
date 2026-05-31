import { useState } from "react";

export type Activator = {
  isActive: () => boolean;
  activate: () => void;
  deactivate: () => void;
  change: () => void;
};

/**
 * A custom hook that provides activation state management functionality.
 *
 * This hook allows ui to manage a boolean "active" state and provides utility
 * methods to query, activate, deactivate, or toggle the state. This is useful for
 * ui that have to be rendered/hidden based on a certain condition, eliminating
 * the boilerplate code required to manage this state, as well as minimizing
 * the number of parameters that need to be passed to child ui.
 *
 * @returns {Activator} An object with methods for managing the active state:
 * - `isActive`: Returns a boolean indicating if the state is active.
 * - `activate`: Sets the state to active (true).
 * - `deactivate`: Sets the state to inactive (false).
 * - `change`: Toggles the state between active and inactive.
 */
export const useActivator = (initialState?: boolean): Activator => {
  const [isActive, setIsActive] = useState(initialState ?? false);

  return {
    isActive: () => isActive,
    activate: () => setIsActive(true),
    deactivate: () => setIsActive(false),
    change: () => setIsActive((prev) => !prev),
  };
};
