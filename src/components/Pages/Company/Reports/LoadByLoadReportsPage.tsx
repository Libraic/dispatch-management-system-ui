import { ReportContainer } from "../../../Common/Reports/ReportContainer.tsx";
import { ReportTableContainer } from "../../../Common/Reports/ReportTableContainer.tsx";
import { ReportTable } from "../../../Common/Reports/ReportTable.tsx";
import { ReportTableMenu } from "../../../Common/Reports/ReportTableMenu.tsx";
import { useEffect, useState } from "react";
import {
  DEFAULT_DATE_LOCALE,
  MONTHS,
} from "../../../../constants/date/date-constants.ts";
import { SelectForm } from "../../../Common/Selector/SelectForm.tsx";
import { useParams } from "react-router-dom";
import { fetchLoadByLoadReports } from "../../../../service/kpiService.ts";
import type { LoadByLoadModel } from "../../../../types/internal/kpi/load-by-load-internal-types.ts";
import { flattenLoadByLoadApiData } from "../../../../utils/reports/load-by-load-reports-mappers.ts";
import { LoadByLoadTableHeader } from "../../../Company/Reports/LoadByLoad/LoadByLoadTableHeader.tsx";
import { LoadByLoadTableBody } from "../../../Company/Reports/LoadByLoad/LoadByLoadTableBody.tsx";

export const LoadByLoadReportsPage = () => {
  const companyUuid = useParams().companyUuid!!;
  const [currentMonth, setCurrentMonth] = useState<string>(
    new Date().toLocaleString(DEFAULT_DATE_LOCALE, { month: "long" }),
  );

  const [loadByLoadModels, setLoadByLoadModels] = useState<LoadByLoadModel[]>(
    [],
  );

  useEffect(() => {
    fetchLoadByLoadReports(companyUuid, currentMonth, 2025).then((res) => {
      const loadByLoadModels: LoadByLoadModel[] = flattenLoadByLoadApiData(res);
      setLoadByLoadModels(loadByLoadModels);
    });
  }, [companyUuid, currentMonth]);

  return (
    <ReportContainer>
      <ReportTableMenu>
        <SelectForm
          initialValue={currentMonth}
          data={Object.keys(MONTHS)}
          setElement={setCurrentMonth}
        />
      </ReportTableMenu>
      <ReportTableContainer>
        <ReportTable>
          <LoadByLoadTableHeader currentMonth={currentMonth} />
          <LoadByLoadTableBody data={loadByLoadModels} />
        </ReportTable>
      </ReportTableContainer>
    </ReportContainer>
  );
};
