import React, { type FC, useCallback, useEffect, useRef } from "react";
import { BORDER_NORMAL_COLOR } from "#/tailwind/tailwind-colors-vars";

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;

type DrumProps = {
  items: string[];
  selected: string;
  onChange: (value: string) => void;
};

export const Carousel: FC<DrumProps> = ({ items, selected, onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const startY = useRef<number>(0);
  const startScrollTop = useRef<number>(0);
  const animationRef = useRef<number | null>(null);
  const velocityRef = useRef<number>(0);
  const lastY = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const isTeleporting = useRef<boolean>(false);

  const count = items.length;
  const drumHeight = ITEM_HEIGHT * VISIBLE_ITEMS;

  const tripleItems: string[] = [...items, ...items, ...items];

  const selectedIndex = items.indexOf(selected);

  const indexToScrollTop = (flatIndex: number): number =>
    flatIndex * ITEM_HEIGHT;

  const scrollTopToIndex = (scrollTop: number): number =>
    Math.round(scrollTop / ITEM_HEIGHT);

  const middleScrollTop = useCallback(
    (logicalIndex: number): number => indexToScrollTop(count + logicalIndex),
    [count],
  );

  const recenterIfNeeded = useCallback((): void => {
    const el = containerRef.current;
    if (!el) return;
    const flatIndex = scrollTopToIndex(el.scrollTop);
    if (flatIndex < count || flatIndex >= count * 2) {
      const logicalIndex = ((flatIndex % count) + count) % count;
      isTeleporting.current = true;
      el.scrollTop = middleScrollTop(logicalIndex);
    }
  }, [count, middleScrollTop]);

  const scrollToLogical = useCallback(
    (logicalIndex: number, smooth = true): void => {
      const el = containerRef.current;
      if (!el) return;
      const target = middleScrollTop(logicalIndex);
      if (smooth) {
        el.scrollTo({ top: target, behavior: "smooth" });
      } else {
        el.scrollTop = target;
      }
    },
    [middleScrollTop],
  );

  useEffect(() => {
    scrollToLogical(selectedIndex, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = (): void => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    if (isTeleporting.current) {
      isTeleporting.current = false;
      return;
    }

    if (isDragging.current) {
      return;
    }

    const flatIndex = scrollTopToIndex(el.scrollTop);
    const logicalIndex = ((flatIndex % count) + count) % count;
    if (items[logicalIndex] !== selected) {
      onChange(items[logicalIndex]);
    }

    recenterIfNeeded();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
    isDragging.current = true;
    startY.current = e.clientY;
    lastY.current = e.clientY;
    lastTime.current = Date.now();
    startScrollTop.current = containerRef.current?.scrollTop ?? 0;
    velocityRef.current = 0;
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!isDragging.current) return;
    const now = Date.now();
    const dt = now - lastTime.current;
    const dy = e.clientY - lastY.current;
    if (dt > 0) velocityRef.current = dy / dt;
    lastY.current = e.clientY;
    lastTime.current = now;
    const delta = startY.current - e.clientY;
    if (containerRef.current) {
      containerRef.current.scrollTop = startScrollTop.current + delta;
    }
  };

  const onPointerUp = (): void => {
    if (!isDragging.current) {
      return;
    }
    isDragging.current = false;
    const el = containerRef.current;
    if (!el) {
      return;
    }

    let velocity = -velocityRef.current * 15;

    const momentum = (): void => {
      if (Math.abs(velocity) < 0.5) {
        const flatIndex = scrollTopToIndex(el.scrollTop);
        const logicalIndex = ((flatIndex % count) + count) % count;
        scrollToLogical(logicalIndex);
        onChange(items[logicalIndex]);
        setTimeout(recenterIfNeeded, 320);
        return;
      }
      el.scrollTop += velocity;
      velocity *= 0.92;
      animationRef.current = requestAnimationFrame(momentum);
    };

    animationRef.current = requestAnimationFrame(momentum);
  };

  return (
    <div
      className="relative select-none"
      style={{ width: 72, height: drumHeight }}
    >
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-20"
        style={{
          height: ITEM_HEIGHT * 2,
        }}
      />

      <div
        className={`absolute left-1.5 right-1.5 pointer-events-none rounded-[10px] border-[0.1rem] ${BORDER_NORMAL_COLOR}`}
        style={{
          top: ITEM_HEIGHT * 2,
          height: ITEM_HEIGHT,
        }}
      />

      <div
        className={`absolute bottom-0 left-0 right-0 pointer-events-none`}
        style={{
          height: ITEM_HEIGHT * 2,
        }}
      />

      <div
        ref={containerRef}
        className="h-full overflow-y-scroll cursor-grab touch-none"
        style={{ scrollbarWidth: "none" }}
        onScroll={handleScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div style={{ height: ITEM_HEIGHT * 2 }} />

        {tripleItems.map((item, flatIdx) => {
          const isSelected = item === selected;
          return (
            <div
              key={flatIdx}
              className={`
                flex items-center justify-center cursor-pointer h-[44px] 
                ${isSelected ? "font-bold" : "font-light"} 
                tracking-wide 
                ${isSelected ? "text-black" : "text-[#757575]"}
              `}
              style={{
                fontSize: isSelected ? 22 : 18,
                transition: "font-size 0.15s ease, color 0.15s ease",
              }}
              onClick={() => {
                const logicalIndex = flatIdx % count;
                scrollToLogical(logicalIndex);
                onChange(items[logicalIndex]);
              }}
            >
              {item}
            </div>
          );
        })}

        <div style={{ height: ITEM_HEIGHT * 2 }} />
      </div>
    </div>
  );
};
