import React from "react";

type LoadBlockTooltipInfoProps = {
  label: string;
  value: string;
};

export const LoadBlockTooltipInfo: React.FC<LoadBlockTooltipInfoProps> = ({
  label,
  value,
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
};
