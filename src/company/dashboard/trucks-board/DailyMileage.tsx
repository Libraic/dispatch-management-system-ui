import { EditableCell } from "../../../matrix/EditableCell.tsx";
import { CellType } from "../../../types/matrix/matrix-types.ts";
import type { Mileage } from "../../../types/financial/trucks-board.ts";
import * as React from "react";
import { BLANK_STRING } from "../../../utils/constants/global.ts";

export const DailyMileage: React.FC<{
  mileage: Mileage;
  setDriverWeeklyMileage: (
    mileageIndex: number,
    field: keyof Mileage,
    value: string,
  ) => void;
  index: number;
}> = ({ mileage, setDriverWeeklyMileage, index }) => {
  return (
    <div className="flex w-full h-full">
      <EditableCell
        content={mileage.destinationNote}
        setContent={(content: string) =>
          setDriverWeeklyMileage(index, "destinationNote", content)
        }
      />
      <div className="grid grid-rows-2 w-full">
        <EditableCell
          content={mileage.revenue}
          cellType={CellType.CURRENCY}
          setContent={(content: string) =>
            setDriverWeeklyMileage(index, "revenue", content)
          }
        />
        <EditableCell
          content={mileage.miles}
          cellType={CellType.NUMERIC}
          setContent={(content: string) =>
            setDriverWeeklyMileage(index, "miles", content)
          }
        />
      </div>
      <EditableCell
        content={mileage.note ?? BLANK_STRING}
        setContent={(content: string) =>
          setDriverWeeklyMileage(index, "note", content)
        }
      />
    </div>
  );
};
