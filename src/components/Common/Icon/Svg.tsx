import React from "react";

export const Svg: React.FC<{
  activeColor: string;
  inactiveColor: string;
  isHovered: boolean;
  svgPath: string;
  size?: number;
}> = ({ activeColor, inactiveColor, isHovered, svgPath, size }) => {
  const iconColor = isHovered ? activeColor : inactiveColor;
  const finalSize = size ? `${size}` : "20";
  return (
    <svg
      viewBox="0 -960 960 960"
      width={finalSize}
      height={finalSize}
      fill={iconColor}
    >
      <path d={svgPath} />
    </svg>
  );
};
