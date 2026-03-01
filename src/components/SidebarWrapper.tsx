import React from "react";
import { CompanySidebar } from "./Company/Sidebar/public/CompanySidebar.tsx";
import type { SidebarState } from "../types/internal/sidebar/sidebar-types.ts";

export const SidebarWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [sidebarState, setSidebarState] =
    React.useState<SidebarState>("closed");
  return (
    <div className="h-screen w-screen flex flex-row gap-y-1 bg-[#f9f9f9]">
      <div
        className={`${sidebarState === "closed" ? "w-[2%]" : "w-[10%]"} z-[1000000]`}
      >
        <CompanySidebar
          sidebarState={sidebarState}
          setSidebarState={setSidebarState}
        />
      </div>

      <div className={`${sidebarState === "closed" ? "w-[98%]" : "w-[90%]"}`}>
        {children}
      </div>
    </div>
  );
};
