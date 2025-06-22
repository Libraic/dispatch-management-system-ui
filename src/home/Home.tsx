import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import { Option } from "./Option.tsx";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";
import {
  COMPANY_REGISTRATION,
  USER_REGISTRATION,
} from "../utils/routes/routes.ts";

export const Home = () => {
  const unfocusedTheme: SxProps<Theme> = { fontSize: 44, fill: "black" };
  const focusedTheme: SxProps<Theme> = { fontSize: 44, fill: "#4e71ff" };
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5">
      <Option
        unfocusedIcon={<PersonAddAlt1OutlinedIcon sx={unfocusedTheme} />}
        focusedIcon={<PersonAddAlt1OutlinedIcon sx={focusedTheme} />}
        header="Add Employee"
        description="Add a new employee to the system"
        bgColor="bg-[#e6eaff]"
        navigateTo={USER_REGISTRATION}
      />
      <Option
        unfocusedIcon={<AddBusinessOutlinedIcon sx={unfocusedTheme} />}
        focusedIcon={<AddBusinessOutlinedIcon sx={focusedTheme} />}
        header="Add Company"
        description="Add a new company to the system"
        bgColor="bg-[#fee2e7]"
        navigateTo={COMPANY_REGISTRATION}
      />
    </div>
  );
};
