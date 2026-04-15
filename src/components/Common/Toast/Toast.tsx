import * as React from "react";
import { useEffect, useState } from "react";
import type {
  ToastData,
  ToastTypeEnum,
} from "../../../types/internal/common/toast-types.ts";
import { GoogleIcon } from "../../../shared/components/GoogleIcon/GoogleIcon.tsx";

export const Toast: React.FC<{ message: string; type: ToastTypeEnum }> = ({
  message,
  type,
}) => {
  const [closeIconBackground, setCloseIconBackground] = useState("bg-white");
  const [visible, setVisible] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const toastData: Record<ToastTypeEnum, ToastData> = {
    ERROR: {
      borderColor: "border-[#BF3131]",
      backgroundColor: "bg-[#fcefea]",
      svgColor: "#BF3131",
      iconCode: "info",
      headerMessage: "Something went wrong",
    },
    SUCCESS: {
      borderColor: "border-[#51dc6b]",
      backgroundColor: "bg-[#f1f9f4]",
      svgColor: "#51dc6b",
      iconCode: "check_circle",
      headerMessage: "Action successfully completed",
    },
  };

  const toastStyle = toastData[type];

  useEffect(() => {
    const enterTimeout = setTimeout(() => setAnimateIn(true), 50);
    const exitTimeout = setTimeout(() => {
      setAnimateOut(true);
      setTimeout(() => setVisible(false), 300); // Wait for animation to finish
    }, 4000);

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(exitTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`
        flex items-center justify-center py-8 
        rounded-2xl border ${toastStyle.borderColor} ${toastStyle.backgroundColor} 
        text-black font-inter-400 text-[1.25rem]
        fixed top-6 left-1/2 -translate-x-1/2 min-w-[23rem] w-fit h-[3.5rem]
        shadow-md transition-all duration-300 ease-in-out
        ${
          animateOut
            ? "opacity-0 -translate-y-5"
            : animateIn
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5"
        }
      `}
    >
      <div className="flex flex-row justify-evenly gap-x-4 items-center mx-2">
        <GoogleIcon
          code={toastStyle.iconCode}
          fontColor={toastStyle.svgColor}
          size={1.25}
        />
        <div>
          <p className="text-black font-inter-400 text-[1rem]">
            {toastStyle.headerMessage}
          </p>
          <p className="text-black font-inter-300 text-[0.8rem]">{message}</p>
        </div>
        <div
          className={`
            ${closeIconBackground} rounded-full p-1  w-6 h-6 
            hover:cursor-pointer transition-transform duration-200 ease-in-out hover:scale-140`}
          onMouseEnter={() =>
            setCloseIconBackground(toastStyle.backgroundColor)
          }
          onMouseLeave={() => setCloseIconBackground("bg-white")}
          onClick={() => {
            setAnimateOut(true);
            setTimeout(() => setVisible(false), 300);
          }}
        >
          <GoogleIcon code="close" size={1.25} fontColor="#000" />
        </div>
      </div>
    </div>
  );
};
