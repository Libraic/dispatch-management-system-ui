import addIcon from "../../../../assets/global/add-no-border.svg";
import * as React from "react";
import type { PageHeaderData } from "../../../../types/internal/common/page-types.ts";
import { TableName } from "../internal/TableName.tsx";
import { NavigableButton } from "../internal/NavigableButton.tsx";

export const TableHeader: React.FC<{
  companyUuid: string;
  headerData: PageHeaderData;
  viewIcon: string;
  buttonSubroute: string;
  buttonLabel: string;
}> = ({ companyUuid, headerData, viewIcon, buttonSubroute, buttonLabel }) => {
  return (
    <div className="flex items-center justify-between flex-row">
      <TableName headerData={headerData} icon={viewIcon} />
      <NavigableButton
        navigationAddress={`/dashboard/${companyUuid}${buttonSubroute}`}
        label={buttonLabel}
        icon={addIcon}
      />
    </div>
  );
};
