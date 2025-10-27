import {
  DRIVERS_VIEW_COLUMNS,
  DRIVERS_VIEW_COLUMNS_LAYOUT,
} from "../../../../constants/driver/driver-constants.ts";

export const DriversTableHeader = () => {
  return (
    <>
      <div
        className={`grid ${DRIVERS_VIEW_COLUMNS_LAYOUT} h-[2.75rem] w-[95%] bg-[#ebecf0] font-inter font-bold text-[0.85rem] px-[2rem] rounded-t-[0.3rem]`}
      >
        {DRIVERS_VIEW_COLUMNS.map((column, index) => (
          <div className="flex items-center" key={index}>
            {column}
          </div>
        ))}
      </div>
    </>
  );
};
