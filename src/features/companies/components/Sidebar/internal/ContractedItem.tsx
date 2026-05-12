import { type FC, useState } from "react";
import { GoogleIcon } from "#/ui/GoogleIcon/GoogleIcon";
import { Z_INDEX_NORMAL_PRECEDENCE } from "#/shared/constants/tailwind/tailwindLayout.constants";

type ContractedItemProps = {
  iconCode: string;
  label: string;
};

export const ContractedItem: FC<ContractedItemProps> = ({
  iconCode,
  label,
}) => {
  const [isIconHovered, setIsIconHovered] = useState(false);

  return (
    <div className="relative flex flex-row items-center pl-2 gap-x-3">
      {iconCode && (
        <div
          className="hover:bg-gray-200 rounded-[0.5rem] hover:cursor-pointer"
          onMouseEnter={() => setIsIconHovered(true)}
          onMouseLeave={() => setIsIconHovered(false)}
        >
          <GoogleIcon code={iconCode} weight={200} size={2} />
        </div>
      )}
      {isIconHovered && (
        <p
          className={`
              ml-[0.6rem] px-2 text-[0.8rem] ${Z_INDEX_NORMAL_PRECEDENCE} 
            bg-black text-white font-normal tracking-wide rounded-[0.2rem]
             inline-block whitespace-nowrap
          `}
        >
          {label}
        </p>
      )}
    </div>
  );
};
