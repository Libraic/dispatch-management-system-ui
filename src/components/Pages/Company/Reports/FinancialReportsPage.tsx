import {
  BACKGROUND_PALE_BLUE,
  BORDER_PALE_BLUE,
  OUTLINE_PALE_BLUE,
  TEXT_SOLID_GRAY,
} from "../../../../tailwind/tailwind-colors-vars.ts";
import { useEffect, useState } from "react";
import { fetchKpis } from "../../../../service/kpiService.ts";
import { useParams } from "react-router-dom";
import type { KpiModel } from "../../../../types/internal/kpi/kpi-internal-types.ts";
import { fromKpiDataToKpiModels } from "../../../../utils/kpi/kpi-mappers.ts";
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
    <div className="w-screen h-screen flex flex-col justify-center items-center p-6">
      <div className="flex justify-end items-center w-[90%] overflow-x-auto pt-10 gap-x-[10rem]">
        <TimeFramePicker option={timeFrame} setOption={setTimeFrame} />
        <IntervalPicker intervalData={intervalData} />
      </div>
      <div className="w-[90%] overflow-x-auto pt-10">
        <table className="min-w-max border-collapse">
          <thead>
            <tr>
              <th className="w-fit p-3"></th>
              {kpiModels.length !== 0 &&
                kpiModels[0].kpisData.map((kpiModelData, index) => (
                  <th
                    key={index}
                    className={`w-[12rem] text-center p-2 ${BACKGROUND_PALE_BLUE} font-plus-jakarta-sans font-thin ${TEXT_SOLID_GRAY}`}
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
                          className="pl-3 font-plus-jakarta-sans"
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

          <tbody className="font-roboto font-light bg-[#f5f7fc]">
            {kpiModels.map((kpiModel) => (
              <tr key={kpiModel.uuid}>
                <td
                  className={`w-[12rem] p-3 sticky left-0 z-100 outline-2 -outline-offset-1 ${OUTLINE_PALE_BLUE} bg-[#f5f7fc]`}
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
        </table>
      </div>
    </div>
  );
};
