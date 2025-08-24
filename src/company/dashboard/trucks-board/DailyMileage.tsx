import { EditableCell } from "../../../matrix/EditableCell.tsx";
import { CellType } from "../../../types/matrix/matrix-types.ts";
import type {
  DriverWeeklyMileage,
  Mileage,
} from "../../../types/financial/trucks-board.ts";
import type { Dispatch, SetStateAction } from "react";
import * as React from "react";
import { BLANK_STRING } from "../../../utils/constants/global.ts";
import { alterDriverWeeklyMileageMileages } from "../../../utils/financial/trucks-board-utils.ts";

export const DailyMileage: React.FC<{
  mileage: Mileage;
  setDriverWeeklyMileage: Dispatch<SetStateAction<DriverWeeklyMileage>>;
  index: number;
}> = ({ mileage, setDriverWeeklyMileage, index }) => {
  return (
    <div className="flex w-full h-full">
      <EditableCell
        content={mileage.destinationNote}
        setContent={(content: string) =>
          alterDriverWeeklyMileageMileages(
            setDriverWeeklyMileage,
            "destinationNote",
            content,
            index,
          )
        }
      />
      <div className="grid grid-rows-2 w-full">
        <EditableCell
          content={mileage.revenue}
          cellType={CellType.CURRENCY}
          setContent={(content: string) =>
            alterDriverWeeklyMileageMileages(
              setDriverWeeklyMileage,
              "revenue",
              content,
              index,
            )
          }
        />
        <EditableCell
          content={mileage.miles}
          cellType={CellType.NUMERIC}
          setContent={(content: string) =>
            alterDriverWeeklyMileageMileages(
              setDriverWeeklyMileage,
              "miles",
              content,
              index,
            )
          }
        />
      </div>
      <EditableCell
        content={mileage.note ?? BLANK_STRING}
        setContent={(content: string) =>
          alterDriverWeeklyMileageMileages(
            setDriverWeeklyMileage,
            "note",
            content,
            index,
          )
        }
      />
    </div>
  );
};
