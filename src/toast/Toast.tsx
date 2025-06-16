import errorIcon from "../assets/global/error.svg";
import closeIcon from "../assets/global/close.svg";
import * as React from "react";
import { useEffect, useState } from "react";

export const Toast: React.FC<{ message: string }> = ({ message }) => {
  const [closeIconBackground, setCloseIconBackground] = useState("bg-white");
  const [visible, setVisible] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  console.log("Toast");
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
      className={`flex items-center justify-center py-8 rounded-2xl border border-[#BF3131] bg-[#fcefea] text-black absolute top-6 left-1/2 -translate-x-1/2 w-[30rem] h-[3.5rem] font-inter-400 text-[1.25rem] shadow-md transition-all duration-300 ease-in-out
        ${
          animateOut
            ? "opacity-0 -translate-y-5"
            : animateIn
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5"
        }`}
    >
      <div className="flex flex-row justify-evenly gap-x-4 items-center mx-2">
        <img className="w-7" src={errorIcon} alt="error-icon" />
        <div>
          <p className="text-black font-inter-400 text-[1rem]">
            Something went wrong
          </p>
          <p className="text-black font-inter-300 text-[0.8rem]">{message}</p>
        </div>
        <div className={`${closeIconBackground} rounded-full p-1  w-6 h-6`}>
          <img
            className="hover:cursor-pointer w-full h-full transition-transform duration-200 ease-in-out hover:scale-140"
            onMouseEnter={() => setCloseIconBackground("bg-[#fcefea]")}
            onMouseLeave={() => setCloseIconBackground("bg-white")}
            onClick={() => {
              setAnimateOut(true);
              setTimeout(() => setVisible(false), 300);
            }}
            src={closeIcon}
            alt="close-icon"
          />
        </div>
      </div>
    </div>
  );
};
