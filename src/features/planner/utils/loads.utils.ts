import type { LoadLocationData } from "#/types/internal/planner/planner-types";

export const getFirstPickUpLocation = (locations: LoadLocationData[]) => {
  for (const location of locations) {
    if (location.label === "Pick Up") {
      return location;
    }
  }

  return undefined;
};

export const getLastDeliveryLocation = (locations: LoadLocationData[]) => {
  for (let i = locations.length - 1; i >= 0; i--) {
    if (locations[i].label === "Delivery") {
      return locations[i];
    }
  }

  return undefined;
};
