import * as React from "react";
import { useState } from "react";
import { GoogleIcon } from "#/ui/GoogleIcon/GoogleIcon";
import type { ToastProps } from "#/ui/Toast/ToastComponent/Toast.types";
import { TOAST_DATA } from "#/ui/Toast/ToastComponent/Toast.constants";
import { useToastLifecycle } from "#/ui/Toast/ToastComponent/useToastLifecycle";

export const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const [closeIconBackground, setCloseIconBackground] = useState("bg-white");
  const { visible, animateIn, animateOut, close } = useToastLifecycle();

  const toastStyle = TOAST_DATA[type];

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
            hover:cursor-pointer transition-transform duration-200 ease-in-out hover:scale-140
            flex items-center justify-center
          `}
          onMouseEnter={() =>
            setCloseIconBackground(toastStyle.backgroundColor)
          }
          onMouseLeave={() => setCloseIconBackground("bg-white")}
          onClick={close}
        >
          <GoogleIcon code="close" size={1.25} fontColor="#000" />
        </div>
      </div>
    </div>
  );
};
