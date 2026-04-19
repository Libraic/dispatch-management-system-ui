import { Carousel } from "./Carousel";
import { PeriodButton } from "./PeriodButton";
import { type FC, type RefObject, useState } from "react";
import { createPortal } from "react-dom";
import { Z_INDEX_HIGH_PRECEDENCE } from "#/shared/constants/tailwind/tailwindLayout.constants";
import type { Period, Time } from "#/types/internal/planner/planner-types";

const HOURS: string[] = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);

const MINUTES: string[] = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

export const TimeSelector: FC<{
  popoverRef: RefObject<HTMLDivElement | null>;
  closePopover: () => void;
  setTime: (time: Time) => void;
  anchorRect: DOMRect | null;
  timeValue?: Time;
}> = ({
  popoverRef,
  closePopover,
  setTime,
  anchorRect,
  timeValue = { hour: "12", minute: "00", period: "PM" },
}) => {
  const [hour, setHour] = useState<string>(timeValue.hour);
  const [minute, setMinute] = useState<string>(timeValue.minute);
  const [period, setPeriod] = useState<Period>(timeValue.period);

  if (!anchorRect) {
    return null;
  }

  const handleDone = (): void => {
    const time = { hour, minute, period } as Time;
    setTime(time);
    closePopover();
  };

  const tsx = (
    <div
      ref={popoverRef}
      role="dialog"
      aria-label="Time picker"
      className={`fixed ${Z_INDEX_HIGH_PRECEDENCE} w-[260px] rounded-[20px] px-4 pt-5 pb-[18px] backdrop-blur-2xl shadow-[0_2px_10px_rgba(0,0,0,0.6)]`}
      style={{
        top: anchorRect.bottom + 10,
        left: anchorRect.left + anchorRect.width / 2,
        transform: "translateX(-50%)",
      }}
    >
      <div className="flex items-center justify-center mb-1">
        <Carousel items={HOURS} selected={hour} onChange={setHour} />
        <p className={`font-normal text-[1.5rem] pb-1 px-0.5`}>:</p>
        <Carousel items={MINUTES} selected={minute} onChange={setMinute} />
      </div>

      <div className="flex gap-1 rounded-[12px] p-[3px] mb-1">
        {(["AM", "PM"] as Period[]).map((p) => (
          <PeriodButton
            key={p}
            label={p}
            active={period === p}
            onClick={() => setPeriod(p)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleDone}
        className={`mt-3 w-full py-[11px] rounded-[12px] text-[13px] font-bold tracking-widest cursor-pointer transition-opacity duration-150 hover:opacity-85 border-0 hover:text-black text-system-gray`}
      >
        DONE
      </button>
    </div>
  );

  return createPortal(tsx, document.body);
};
