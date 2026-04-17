import { useCallback, useEffect, useState } from "react";

export function useToastLifecycle(duration = 4000, exitDuration = 300) {
  const [visible, setVisible] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const enterTimeout = setTimeout(() => setAnimateIn(true), 50);

    const exitTimeout = setTimeout(() => {
      setAnimateOut(true);
      setTimeout(() => setVisible(false), exitDuration);
    }, duration);

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(exitTimeout);
    };
  }, [duration, exitDuration]);

  const close = useCallback(() => {
    setAnimateOut(true);
    setTimeout(() => setVisible(false), exitDuration);
  }, [exitDuration]);

  return {
    visible,
    animateIn,
    animateOut,
    close,
  };
}
