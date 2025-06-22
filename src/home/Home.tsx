import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import { Option } from "./Option.tsx";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";

export const Home = () => {
  const unfocusedTheme: SxProps<Theme> = { fontSize: 44, fill: "#bebebe" };
  const focusedTheme: SxProps<Theme> = { fontSize: 44, fill: "#4e71ff" };
  return (
    <div className="flex justify-center items-center h-screen gap-5">
      <Option
        unfocusedIcon={<PersonAddIcon sx={unfocusedTheme} />}
        focusedIcon={<PersonAddIcon sx={focusedTheme} />}
        action="Add Employee"
        navigateTo="/users"
      />
      <Option
        unfocusedIcon={<AddBusinessRoundedIcon sx={unfocusedTheme} />}
        focusedIcon={<AddBusinessRoundedIcon sx={focusedTheme} />}
        action="Add Company"
        navigateTo="/"
      />
    </div>
  );
};
