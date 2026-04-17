import { type FC, useEffect, useRef, useState } from "react";
import { SYSTEM_FONT_NORMAL } from "#/tailwind/tailwind-font-vars";
import { InputFieldLabel } from "#/ui/InputField/components/public/InputFieldLabel";
import { TimeSelector } from "#/ui/TimePicker/internal/TimeSelector";
import type { Time } from "#/types/internal/planner/planner-types";

type TimePickerProps = {
  time: Time;
  setTime: (time: Time) => void;
  label?: string;
};

export const TimePicker: FC<TimePickerProps> = ({ time, setTime, label }) => {
  const [open, setOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const animFrameRef = useRef<number | null>(null);

  const startTracking = () => {
    const track = () => {
      if (inputRef.current) {
        setAnchorRect(inputRef.current.getBoundingClientRect());
      }
      animFrameRef.current = requestAnimationFrame(track);
    };
    animFrameRef.current = requestAnimationFrame(track);
  };

  const stopTracking = () => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  };

  useEffect(() => {
    if (!open) {
      stopTracking();
      return;
    }

    startTracking();

    const handler = (e: globalThis.MouseEvent): void => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      stopTracking();
      document.removeEventListener("mousedown", handler);
    };
  }, [open]);

  return (
    <>
      <div className="min-h-[6.5rem]">
        <div className="relative inline-block">
          <InputFieldLabel label={label ?? "Time"} isFocused={open} />
          <div
            ref={inputRef}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => {
              setOpen((o) => !o);
            }}
            onKeyDown={(e) => e.key === "Enter" && setOpen((o) => !o)}
            className="py-[1rem] flex items-center gap-2.5 px-5 rounded-[2rem] cursor-pointer w-[200px] backdrop-blur-md border-2 border-light-gray focus:border-solid-blue group"
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-black/50 group-focus:text-solid-blue"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span
              className={`flex-1 ${SYSTEM_FONT_NORMAL} text-[0.85rem] tracking-[0.04em]`}
            >
              {`${time.hour}:${time.minute} ${time.period}`}
            </span>
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={2}
              strokeLinecap="round"
              className="shrink-0"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {open && anchorRect && (
            <TimeSelector
              popoverRef={popoverRef}
              closePopover={() => setOpen(false)}
              setTime={setTime}
              anchorRect={anchorRect}
              timeValue={time}
            />
          )}
        </div>
      </div>
    </>
  );
};
