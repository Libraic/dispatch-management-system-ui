import * as React from "react";
import { useNavigate } from "react-router-dom";

export const CompanySidebarItemData: React.FC<{
  label: string;
  route?: string;
  img?: string;
}> = ({ label, route, img }) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
      className="flex flex-row items-center pl-2 gap-x-3 text-white text-[0.75rem] font-open-sans font-normal cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isClicked) {
          setIsHovered(false);
        }
      }}
      onClick={() => {
        setIsClicked((prev) => !prev);
        if (route) {
          navigate(route);
        }
      }}
    >
      {img && <img className="w-8 h-8" src={img} alt="img-icon" />}
      <p
        className={`text-[0.8rem] text-white font-open-sans  ${isHovered ? "font-bold" : "font-normal"}`}
      >
        {label}
      </p>
    </div>
  );
};
