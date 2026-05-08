import { Fragment, useContext } from "react";
import { DriverRow } from "#/features/drivers/components/View/internal/DriverRow";
import { DriversTableContext } from "#/features/drivers/context/DriversTableContext";

export const DriversTableContent = () => {
  const context = useContext(DriversTableContext)!!;
  const drivers = context.drivers;
  return (
    <Fragment>
      {drivers.content.map((driver, index) => (
        <DriverRow
          driver={driver}
          currentPage={drivers.page.number}
          items={drivers.content.length}
          key={index}
        />
      ))}
    </Fragment>
  );
};
