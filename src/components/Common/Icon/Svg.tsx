import React from "react";

const getIconColor = (
  activeColor: string,
  isHovered?: boolean,
  inactiveColor?: string,
) => {
  if (!inactiveColor || isHovered === undefined) {
    return activeColor;
  }

  return isHovered ? activeColor : inactiveColor;
};

export const Svg: React.FC<{
  activeColor: string;
  svgPath: string;
  isHovered?: boolean;
  inactiveColor?: string;
  size?: number;
}> = ({ activeColor, inactiveColor, isHovered, svgPath, size }) => {
  const iconColor = getIconColor(activeColor, isHovered, inactiveColor);
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
