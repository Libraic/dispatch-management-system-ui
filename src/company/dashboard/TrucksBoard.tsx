import { LiveSearchCell } from "../../matrix/LiveSearchCell.tsx";
import { Driver } from "../../types/api/Driver.ts";

export const TrucksBoard = () => {
  const columnsLayout =
    "grid-cols-[9rem_17rem_6rem_10rem_12rem_12rem_12rem_12rem_12rem_12rem_12rem]";

  function getWeekWithNames(date: Date): string[] {
    // Ensure week starts on Monday
    const dayOfWeek = (date.getDay() + 6) % 7; // Monday=0, Sunday=6
    const monday = new Date(date);
    monday.setDate(date.getDate() - dayOfWeek);

    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const result: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);

      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");

      result.push(`${weekdays[i]} ${month}.${day}`);
    }

    return result;
  }

  const date = new Date("2025-06-27"); // Friday
  const primaryColumns = ["Dispatcher", "Driver", "Truck", "Revenue"];
  const weekDays = getWeekWithNames(date);
  const columns = [...primaryColumns, ...weekDays];

  return (
    <div className="w-screen h-screen flex flex-col items-center mt-10">
      <div className="w-[90%] h-[90%] overflow-x-auto hide-scrollbar ">
        <div
          className={`min-w-[1000px] ${columnsLayout} grid text-left font-open-sans font-medium rounded-tl-[0.3rem] rounded-tr-[0.3rem] h-[3rem] bg-[#d4ddf8]`}
        >
          {columns.map((day, index) => (
            <div className="flex items-center px-4" key={index}>
              {day}
            </div>
          ))}
        </div>

        <div
          className={`min-w-[1000px] min-h-[6rem] ${columnsLayout} grid grid-cols-3 rounded-[0.3rem] font-open-sans font-light bg-white`}
        >
          <div className="px-4 flex items-center bg-[#f5f7fc] border-r-1 border-[#e6ebfa]">
            Sergio xt 103 (786-802-1867)
          </div>
          <LiveSearchCell searchKey="DRIVER" constructor={Driver} />
          <div className="px-4 flex items-center bg-[#f5f7fc] border-r-1 border-[#e6ebfa]">
            53' FB <br />
            Cong <br />
            96'' tall
          </div>
          <div className="grid grid-rows-2">
            <div className="px-4 flex items-center bg-[#f5f7fc] border-r-1 border-b-1 border-[#e6ebfa] font-bold">
              $6,700
            </div>
            <div className="px-4 flex items-center bg-[#f5f7fc] border-r-1 border-[#e6ebfa] font-bold">
              2.07
            </div>
          </div>
          {weekDays.map((_, index) => (
            <div
              className="flex items-center px-4 bg-[#f5f7fc] border-r-1 border-[#e6ebfa]"
              key={index}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
