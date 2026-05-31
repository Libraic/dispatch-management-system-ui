import * as React from "react";
import type { PageHeaderData } from "#/types/internal/common/page-types";
import { TableName } from "#/ui/Table/internal/TableName";
import { NavigableButton } from "#/ui/Table/internal/NavigableButton";

type TableHeaderProps = {
  companyUuid: string;
  headerData: PageHeaderData;
  iconCode: string;
  buttonSubroute?: string;
  buttonLabel?: string;
};

export const TableHeader: React.FC<TableHeaderProps> = ({
  companyUuid,
  headerData,
  iconCode,
  buttonSubroute,
  buttonLabel,
}) => {
  return (
    <div className="flex items-center justify-between flex-row">
      <TableName headerData={headerData} iconCode={iconCode} />
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
