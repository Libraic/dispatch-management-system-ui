import {
  type KeyboardEvent,
  type RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BLANK_STRING } from "#/constants/common/global-constants";
import type { Period, Time } from "#/types/internal/planner/planner-types";
import type { ActiveTimePart } from "#/ui/TimePicker/public/TimePicker.types";

type UseTimePartNavigationProps = {
  time: Time;
  setTime: (time: Time) => void;
  inputRef: RefObject<HTMLDivElement | null>;
  onStartInlineEditing?: () => void;
};

const normalizeHour = (value: string): string | null => {
  const parsedValue = Number(value);
  if (!Number.isInteger(parsedValue)) {
    return null;
  }

  if (parsedValue > 12) {
    return "12";
  }

  if (parsedValue === 0) {
    return "01";
  }

  return String(parsedValue).padStart(2, "0");
};

const normalizeMinute = (value: string): string | null => {
  const parsedValue = Number(value);
  if (!Number.isInteger(parsedValue)) {
    return null;
  }

  if (parsedValue > 59) {
    return "59";
  }

  return String(parsedValue).padStart(2, "0");
};

export const useTimePartNavigation = ({
  time,
  setTime,
  inputRef,
  onStartInlineEditing,
}: UseTimePartNavigationProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [activePart, setActivePart] = useState<ActiveTimePart>("hour");
  const [draftTime, setDraftTime] = useState<Time>(time);
  const [activeInput, setActiveInput] = useState<string>(BLANK_STRING);

  const finishInlineEditing = useCallback(
    (nextTime: Time = draftTime): void => {
      setTime(nextTime);
      setDraftTime(nextTime);
      setActiveInput(BLANK_STRING);
      setEditMode(false);
    },
    [draftTime, setTime],
  );

  const moveToNextPart = (nextPart: ActiveTimePart): void => {
    setActivePart(nextPart);
    setActiveInput(BLANK_STRING);
  };

  const enterInlineEditing = useCallback((): void => {
    onStartInlineEditing?.();
    setDraftTime(time);
    setActivePart("hour");
    setActiveInput(BLANK_STRING);
    setEditMode(true);
    inputRef.current?.focus();
  }, [inputRef, onStartInlineEditing, time]);

  const commitHour = (value: string): boolean => {
    const normalizedHour = normalizeHour(value);
    if (normalizedHour === null) {
      return false;
    }

    setDraftTime((currentTime) => ({
      ...currentTime,
      hour: normalizedHour,
    }));
    moveToNextPart("minute");
    return true;
  };

  const commitMinute = (value: string): boolean => {
    const normalizedMinute = normalizeMinute(value);
    if (normalizedMinute === null) {
      return false;
    }

    setDraftTime((currentTime) => ({
      ...currentTime,
      minute: normalizedMinute,
    }));
    moveToNextPart("period");
    return true;
  };

  const commitPeriod = (value: Period): void => {
    const nextTime = {
      ...draftTime,
      period: value,
    };
    finishInlineEditing(nextTime);
  };

  const getDraftTimeWithActiveInput = useCallback((): Time => {
    if (activeInput === BLANK_STRING) {
      return draftTime;
    }

    if (activePart === "hour") {
      const normalizedHour = normalizeHour(activeInput);
      if (normalizedHour === null) {
        return draftTime;
      }

      return {
        ...draftTime,
        hour: normalizedHour,
      };
    }

    if (activePart === "minute") {
      const normalizedMinute = normalizeMinute(activeInput);
      if (normalizedMinute === null) {
        return draftTime;
      }

      return {
        ...draftTime,
        minute: normalizedMinute,
      };
    }

    return draftTime;
  }, [activeInput, activePart, draftTime]);

  useEffect(() => {
    if (!editMode) {
      setDraftTime(time);
    }
  }, [editMode, time]);

  const exitInlineEditing = useCallback((): void => {
    const nextTime = getDraftTimeWithActiveInput();
    setTime(nextTime);
    setDraftTime(nextTime);
    setActiveInput(BLANK_STRING);
    setEditMode(false);
  }, [getDraftTimeWithActiveInput, setTime]);

  const cancelInlineEditing = useCallback((): void => {
    setDraftTime(time);
    setActiveInput(BLANK_STRING);
    setEditMode(false);
  }, [time]);

  const handleInlineKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    const claimEvent = (): void => {
      e.preventDefault();
      e.stopPropagation();
    };

    if (!editMode) {
      if (e.key === "Enter") {
        claimEvent();
        enterInlineEditing();
      }
      return;
    }

    if (e.key === "Escape") {
      claimEvent();
      cancelInlineEditing();
      return;
    }

    if (e.key === "Backspace") {
      claimEvent();
      setActiveInput((currentInput) => currentInput.slice(0, -1));
      return;
    }

    if (e.key === "Enter") {
      claimEvent();
      if (activePart === "hour") {
        commitHour(activeInput || draftTime.hour);
      } else if (activePart === "minute") {
        commitMinute(activeInput || draftTime.minute);
      } else {
        finishInlineEditing();
      }
      return;
    }

    if (activePart === "period") {
      const periodKey = e.key.toUpperCase();
      if (periodKey === "A" || periodKey === "P") {
        claimEvent();
        commitPeriod(periodKey === "A" ? "AM" : "PM");
      }
      return;
    }

    if (!/^\d$/.test(e.key)) {
      return;
    }

    claimEvent();
    const nextInput = `${activeInput}${e.key}`.slice(-2);
    setActiveInput(nextInput);

    if (nextInput.length < 2) {
      return;
    }

    if (activePart === "hour") {
      commitHour(nextInput);
    } else if (activePart === "minute") {
      commitMinute(nextInput);
    }
  };

  return {
    activeInput,
    activePart,
    draftTime,
    editMode,
    cancelInlineEditing,
    enterInlineEditing,
    exitInlineEditing,
    handleInlineKeyDown,
  };
};
