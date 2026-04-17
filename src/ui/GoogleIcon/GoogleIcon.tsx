import React from "react";
import type { GoogleIconProps } from "./GoogleIcon.types";

export const GoogleIcon: React.FC<GoogleIconProps> = ({
  code,
  size,
  weight,
  fontColor,
}) => {
  const finalWeight = weight ?? 300;
  const finalSize = size ? `${size}rem` : "2rem";
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontVariationSettings: `'wght' ${finalWeight}`,
        fontSize: finalSize,
        color: fontColor,
      }}
    >
      {code}
    </span>
  );
};
