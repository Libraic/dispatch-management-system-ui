import * as React from "react";
import type { PageHeaderData } from "#/types/internal/common/page-types";
import { TableName } from "#/ui/Table/internal/TableName";
import { NavigableButton } from "#/ui/Table/internal/NavigableButton";

type TableHeaderProps = {
  companyUuid: string;
  headerData: PageHeaderData;
  buttonSubroute?: string;
  buttonLabel?: string;
};

export const TableHeader: React.FC<TableHeaderProps> = ({
  companyUuid,
  headerData,
  buttonSubroute,
  buttonLabel,
}) => {
  return (
    <div className="flex items-center justify-between flex-row mt-10">
      <TableName headerData={headerData} />
      {buttonSubroute && buttonLabel && (
        <NavigableButton
          navigationAddress={`/${companyUuid}${buttonSubroute}`}
          label={buttonLabel}
          iconCode="add"
        />
      )}
    </div>
  );
};
