import { getZonedDateParts } from "#/shared/utils/timezone.utils";
import { useEffect, useState } from "react";

export const useTime = (timezone: string) => {
  const [zonedParts, setZonedParts] = useState(() =>
    getZonedDateParts(timezone),
  );

  useEffect(() => {
    const updateTime = () => {
      setZonedParts(getZonedDateParts(timezone));
    };

    updateTime();

    const interval = setInterval(updateTime, 60_000);

    return () => clearInterval(interval);
  }, [timezone]);

  return zonedParts;
};
