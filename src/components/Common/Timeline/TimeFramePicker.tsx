import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  TimeFrame,
  type TimeFrameUnit,
} from "../../../types/internal/reports/timeline-types.ts";
import { BLANK_STRING } from "../../../constants/common/global-constants.ts";
import * as React from "react";

export const TimeFramePicker: React.FC<{
  option: TimeFrameUnit;
  setOption: (option: TimeFrameUnit) => void;
}> = ({ option, setOption }) => {
  const [options, setOptions] = useState<TimeFrameUnit[]>([TimeFrame.MONTH]);
  const [width, setWidth] = useState<string>(BLANK_STRING);

  return (
    <div
      className={`flex flex-row justify-center items-center ${width}`}
      onMouseEnter={() => {
        setOptions(Object.values(TimeFrame));
        setWidth("w-[25rem]");
      }}
      onMouseLeave={() => {
        setOptions([option]);
        setWidth(BLANK_STRING);
      }}
    >
      <AnimatePresence>
        {options.map((option) => (
          <motion.div
            key={option}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center w-[6.5rem] h-[2.6rem] first:rounded-l-[0.4rem] last:rounded-r-[0.4rem] bg-gray-50 border-1 border-pale-blue font-plus-jakarta-sans font-thin text-[0.85rem] hover:bg-light-blue hover:cursor-pointer hover:text-white hover:border-light-blue border-collapse"
            onClick={() => {
              setOption(option);
              setOptions([option]);
              setWidth(BLANK_STRING);
            }}
          >
            <p>{option}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
