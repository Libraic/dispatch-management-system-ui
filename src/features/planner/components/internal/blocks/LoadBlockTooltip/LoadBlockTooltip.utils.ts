import type {
  LoadData,
  LoadLocationData,
} from "#/types/internal/planner/planner-types";
import { divideNumbersAsStrings } from "#/shared/utils/number.utils";
import { formatPhoneNumber } from "#/shared/utils/inputField.utils";

export const getLoadBlockTooltipData = (
  driverFullName: string,
  load: LoadData,
  firstLocation: LoadLocationData,
  lastLocation: LoadLocationData,
) => {
  const data: Map<string, string> = new Map();
  data.set("Driver", driverFullName);
  data.set("Revenue", load.revenue);
  data.set("Loaded Miles", load.loadedMiles);
  if (load.emptyMiles) {
    data.set("Empty Miles", load.emptyMiles);
  }
  data.set("RPM", divideNumbersAsStrings(load.revenue, load.loadedMiles));
  data.set("Broker", load.broker);
  if (load.representative) {
    data.set("Representative", load.representative);
  }
  if (load.representativeContactNumber) {
    data.set(
      "Contact Number",
      formatPhoneNumber(load.representativeContactNumber),
    );
  }
  data.set("Pick Up Location", firstLocation.location);
  data.set("Pick Up Date", firstLocation.date);
  data.set("Delivery Location", lastLocation.location);
  data.set("Delivery Date", lastLocation.date);

  return data;
};
