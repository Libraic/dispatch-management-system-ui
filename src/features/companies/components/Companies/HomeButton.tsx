import { useNavigate } from "react-router-dom";
import { GoogleIcon } from "#/ui/GoogleIcon/GoogleIcon";
import { HOME } from "#/shared/routes/routes";

export const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className="absolute top-5 left-5 hover:cursor-pointer "
      onClick={() => navigate(HOME)}
    >
      <div className="hover:bg-gray-200 rounded-[0.5rem] hover:cursor-pointer">
        <GoogleIcon code="home" weight={200} size={2} />
      </div>
    </div>
  );
};
