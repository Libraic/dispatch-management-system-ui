import {
  BACKGROUND_BLUE_GREY_COLOR,
  BACKGROUND_PALE_BLUE,
  BORDER_PALE_BLUE,
  OUTLINE_PALE_BLUE,
  TEXT_SOLID_GRAY,
} from "../../../../tailwind/tailwind-colors-vars.ts";
import { useEffect, useState } from "react";
import { fetchKpis } from "../../../../service/kpiService.ts";
import { useParams } from "react-router-dom";
import type { KpiModel } from "../../../../types/internal/kpi/kpi-internal-types.ts";
import { fromKpiDataToKpiModels } from "../../../../utils/reports/financial-reports-mappers.ts";
import {
  BLANK_STRING,
  DOLLAR_SIGN,
} from "../../../../constants/common/global-constants.ts";
import { IntervalPicker } from "../../../Common/Timeline/IntervalPicker.tsx";
import { TimeFramePicker } from "../../../Common/Timeline/TimeFramePicker.tsx";
import {
  TimeFrame,
  type TimeFrameUnit,
} from "../../../../types/internal/reports/timeline-types.ts";
import { useInterval } from "../../../../hooks/useInterval.ts";
import { ReportContainer } from "../../../Common/Reports/ReportContainer.tsx";
import { ReportTableContainer } from "../../../Common/Reports/ReportTableContainer.tsx";
import { ReportTable } from "../../../Common/Reports/ReportTable.tsx";
import { ReportTableMenu } from "../../../Common/Reports/ReportTableMenu.tsx";
import {
  SYSTEM_FONT_NORMAL,
  SYSTEM_FONT_THIN,
} from "../../../../tailwind/tailwind-font-vars.ts";

export const FinancialReportsPage = () => {
  const gridTemplate = "grid grid-cols-[9rem_5rem_5rem]";
  const companyUuid = useParams().companyUuid!!;
  const [kpiModels, setKpiModels] = useState<KpiModel[]>([]);
  const [timeFrame, setTimeFrame] = useState<TimeFrameUnit>(TimeFrame.MONTH);
  const intervalData = useInterval();
  const startDate = intervalData.getStartDate();
  const endDate = intervalData.getEndDate();

  useEffect(() => {
    fetchKpis(companyUuid, startDate, endDate, timeFrame).then((kpiData) => {
      const kpiModels: KpiModel[] = fromKpiDataToKpiModels(kpiData);
      setKpiModels(kpiModels);
    });
  }, [companyUuid, startDate, endDate, timeFrame]);

  return (
    <ReportContainer>
      <ReportTableMenu>
        <TimeFramePicker option={timeFrame} setOption={setTimeFrame} />
        <IntervalPicker intervalData={intervalData} />
      </ReportTableMenu>

      <ReportTableContainer>
        <ReportTable>
          <thead>
            <tr>
              <th className="w-fit p-3"></th>
              {kpiModels.length !== 0 &&
                kpiModels[0].kpisData.map((kpiModelData, index) => (
                  <th
                    key={index}
                    className={`w-[12rem] text-center p-2 ${BACKGROUND_PALE_BLUE} ${SYSTEM_FONT_THIN} ${TEXT_SOLID_GRAY}`}
                  >
                    <p className="text-[1rem] pb-1">{kpiModelData.label}</p>
                    <p className="text-[0.8rem]">{`${kpiModelData.start === kpiModelData.end ? kpiModelData.start : `${kpiModelData.start} - ${kpiModelData.end}`}`}</p>
                  </th>
                ))}
            </tr>
            <tr>
              <th></th>
              {kpiModels.length !== 0 &&
                kpiModels[0].kpisData.map((kpiModelData, index) => (
                  <th
                    key={index}
                    className={`${BACKGROUND_PALE_BLUE} font-roboto`}
                  >
                    <div className={`${gridTemplate} text-center`}>
                      {kpiModelData.kpis.map((kpiValue, dIndex) => (
                        <p
                          className={`pl-3 ${SYSTEM_FONT_NORMAL}`}
                          key={`${index}-${dIndex}`}
                        >
                          {kpiValue.type}
                        </p>
                      ))}
                    </div>
                  </th>
                ))}
            </tr>
          </thead>

          <tbody
            className={`font-roboto font-light ${BACKGROUND_BLUE_GREY_COLOR}`}
          >
            {kpiModels.map((kpiModel) => (
              <tr key={kpiModel.uuid}>
                <td
                  className={`w-[12rem] p-3 sticky left-0 z-100 outline-2 -outline-offset-1 ${OUTLINE_PALE_BLUE} ${BACKGROUND_BLUE_GREY_COLOR}`}
                >
                  {kpiModel.subjectName}
                </td>

                {kpiModel.kpisData.map((kpiDataModel, kpiIndex) => (
                  <td
                    key={`${kpiModel.uuid}-${kpiIndex}`}
                    className={`w-[12rem] pl-1 text-left border-2 ${BORDER_PALE_BLUE}`}
                  >
                    <div className={`${gridTemplate} text-center`}>
                      {kpiDataModel.kpis.map((kpiValue, dIndex) => (
                        <div
                          key={dIndex}
                          className={`truncate border-l-2 first:border-l-0 ${BORDER_PALE_BLUE}`}
                        >
                          {`${kpiValue.hasCurrency ? DOLLAR_SIGN : BLANK_STRING} ${kpiValue.value}`}
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </ReportTable>
      </ReportTableContainer>
    </ReportContainer>
  );
};
