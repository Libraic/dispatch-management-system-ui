import { Outlet } from "react-router-dom";
import { SidebarWrapper } from "#/components/SidebarWrapper";

export const AppLayout = () => {
  return (
    <SidebarWrapper>
      <Outlet />
    </SidebarWrapper>
  );
};
