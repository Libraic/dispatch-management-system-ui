import * as React from "react";
import type { PageHeaderData } from "../../../../types/internal/common/page-types.ts";
import { TableName } from "../internal/TableName.tsx";
import { NavigableButton } from "../internal/NavigableButton.tsx";

export const TableHeader: React.FC<{
  companyUuid: string;
  headerData: PageHeaderData;
  iconCode: string;
  buttonSubroute: string;
  buttonLabel: string;
}> = ({ companyUuid, headerData, iconCode, buttonSubroute, buttonLabel }) => {
  return (
    <div className="flex items-center justify-between flex-row">
      <TableName headerData={headerData} iconCode={iconCode} />
      <NavigableButton
        navigationAddress={`/dashboard/${companyUuid}${buttonSubroute}`}
        label={buttonLabel}
        iconCode="add"
      />
    </div>
  );
};
