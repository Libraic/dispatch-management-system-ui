import { TableHead } from "#/ui/Table/public/TableHead";
import { LoadsContent } from "#/features/loads/components/View/ui/LoadsContent";
import { useContext } from "react";
import { LoadsTableContext } from "#/features/loads/context/LoadsTableContext";

export const LoadsTable = () => {
  const context = useContext(LoadsTableContext)!!;
  return (
    <div className="overflow-x-auto h-[30rem]">
      <div className="text-solid-black ">
        <TableHead columns={context.columns} />
        <LoadsContent />
      </div>
    </div>
  );
};
