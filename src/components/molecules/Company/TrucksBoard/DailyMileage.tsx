import { EditableCell } from "../../Cell/EditableCell.tsx";
import { CellType } from "../../../../types/internal/matrix/matrix-types.ts";
import type {
  Mileage,
  MileageError,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import * as React from "react";

export const DailyMileage: React.FC<{
  mileage: Mileage;
  setDriverWeeklyMileage: (
    mileageIndex: number,
    field: keyof Mileage,
    value: string,
  ) => void;
  index: number;
  error?: MileageError;
}> = ({ mileage, setDriverWeeklyMileage, index, error }) => {
  return (
    <div className="flex w-full h-full">
      <EditableCell
        content={mileage.destinationNote}
        setContent={(content: string) =>
          setDriverWeeklyMileage(index, "destinationNote", content)
        }
      />
      <div className="grid grid-rows-2 w-[60%]">
        <EditableCell
          content={mileage.revenue}
          cellType={CellType.CURRENCY}
          setContent={(content: string) =>
            setDriverWeeklyMileage(index, "revenue", content)
          }
          errorMessage={error?.revenue}
        />
        <EditableCell
          content={mileage.miles}
          cellType={CellType.NUMERIC}
          setContent={(content: string) =>
            setDriverWeeklyMileage(index, "miles", content)
          }
          errorMessage={error?.miles}
        />
      </div>
      <EditableCell
        content={mileage.note}
        setContent={(content: string) =>
          setDriverWeeklyMileage(index, "note", content)
        }
      />
    </div>
  );
};
