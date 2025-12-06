import addIcon from "../../../../assets/global/add-no-border.svg";
import * as React from "react";
import type { PageHeaderData } from "../../../../types/internal/common/page-types.ts";
import { TableName } from "../internal/TableName.tsx";
import { TableNavigableButton } from "../internal/TableNavigableButton.tsx";

export const TableHeader: React.FC<{
  companyUuid: string;
  headerData: PageHeaderData;
  viewIcon: string;
  buttonSubroute: string;
  buttonLabel: string;
}> = ({ companyUuid, headerData, viewIcon, buttonSubroute, buttonLabel }) => {
  return (
    <div className="flex items-center justify-between flex-row w-[95%] mx-[2.5rem]">
      <TableName headerData={headerData} icon={viewIcon} />
      <TableNavigableButton
        navigationAddress={`/dashboard/${companyUuid}${buttonSubroute}`}
        label={buttonLabel}
        icon={addIcon}
      />
    </div>
  );
};
