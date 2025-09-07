import { TrucksBoard } from "./TrucksBoard.tsx";
import { useParams } from "react-router-dom";
import { getWeekWithNames } from "../../../utils/global/date.ts";
import { WeeklyBoardBar } from "./WeeklyBoardBar.tsx";

export const BigBoard = () => {
  const { companyUuid } = useParams();
  const weeks = getWeekWithNames(new Date());
  return (
    <div className="flex flex-col min-h-screen">
      {/* TrucksBoard scrolls inside remaining space */}
      <div className="flex-1 overflow-y-auto">
        <TrucksBoard companyUuid={companyUuid!!} week={weeks[0]} />
      </div>

      {/* Always pinned at bottom */}
      <div className="flex flex-row justify-center mt-4 mb-4">
        <WeeklyBoardBar interval="01-01-2025 - 07-01-2025" />
        <WeeklyBoardBar interval="08-01-2025 - 14-01-2025" />
      </div>
    </div>
  );
};
