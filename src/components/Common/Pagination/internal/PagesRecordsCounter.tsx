import * as React from "react";

export const PagesRecordsCounter: React.FC<{ records: number }> = ({
  records,
}) => {
  return (
    <div className="border-[0.075rem] rounded-[0.2rem] border-light-purple px-2 font-bold font-roboto text-[0.9rem] text-solid-black">
      {records} Records
    </div>
  );
};
