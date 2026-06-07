import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleIcon } from "#/ui/GoogleIcon/GoogleIcon";

type ExpandedItemProps = {
  label: string;
  hasSubmenu: boolean;
  route?: string;
  iconCode?: string;
};

export const ExpandedItem: FC<ExpandedItemProps> = ({
  label,
  hasSubmenu,
  route,
  iconCode,
}) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative flex flex-row items-center pl-2 gap-x-3 hover:cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isClicked) {
          setIsHovered(false);
        }
      }}
      onClick={() => {
        setIsClicked((prev) => (hasSubmenu ? !prev : prev));
        if (route) {
          navigate(route);
        }
      }}
    >
      {iconCode && (
        <div className="hover:bg-gray-200 rounded-[0.5rem] hover:cursor-pointer">
          <GoogleIcon code={iconCode} weight={200} size={2} />
        </div>
      )}
      <p
        className={`text-[0.8rem] text-black ${isHovered || isClicked ? "font-bold" : "font-normal"} tracking-wide`}
      >
        {label}
      </p>
    </div>
  );
};
