import React, { type ReactNode, useState } from "react";
import { CompanySidebar } from "./Company/Sidebar/public/CompanySidebar";
import type { SidebarState } from "#/types/internal/sidebar/sidebar-types";
import { Z_INDEX_NORMAL_PRECEDENCE } from "#/shared/constants/tailwind/tailwindLayout.constants";

export const SidebarWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sidebarState, setSidebarState] = useState<SidebarState>("closed");

  const isOpen = sidebarState === "open";

  return (
    <div className="h-screen w-screen flex">
      <div
        className={`
          relative
          ${isOpen ? "w-[10vw]" : "w-[2vw]"}
          transition-[width]
          duration-300
          ease-[cubic-bezier(0.4,0,0.2,1)]
          will-change-[width]
          flex-shrink-0
          ${Z_INDEX_NORMAL_PRECEDENCE}
        `}
      >
        <CompanySidebar
          sidebarState={sidebarState}
          setSidebarState={setSidebarState}
        />
      </div>
      <div className={`flex-1 min-w-0 transition-all duration-300`}>
        {children}
      </div>
    </div>
  );
};
