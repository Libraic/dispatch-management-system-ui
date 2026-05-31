import { Fragment, useContext } from "react";
import { LoadsTableContext } from "#/features/loads/context/LoadsTableContext";
import { LoadsRow } from "#/features/loads/components/View/ui/LoadsRow/LoadsRow";

export const LoadsContent = () => {
  const context = useContext(LoadsTableContext)!!;
  const loads = context.loads;
  return (
    <Fragment>
      {loads.content.map((load, index) => (
        <LoadsRow load={load} key={index} />
      ))}
    </Fragment>
  );
};
