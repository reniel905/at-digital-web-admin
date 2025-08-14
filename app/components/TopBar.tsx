"use client";

import React from "react";
import { Menu } from "lucide-react";
import { AdminLogo } from "./Logo";
import SideBar from "./SideBar";
import { useSidebar } from "../contexts/sidebarContext";

const TopBar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  const handlePanelOpen = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div>
      <div className="relative flex flex-row justify-start items-center h-16 w-screen bg-stone-900">
        <div
          className="flex flex-row justify-center items-center m-4 hover:cursor-pointer hover:bg-neutral-800 selection:bg-neutral-800 p-2 rounded-md"
          onClick={handlePanelOpen}
        >
          <Menu strokeWidth={1} color="white" />
        </div>
        <AdminLogo />
      </div>
      <div className={`${isSidebarOpen ? "transition-all ease duration-600" : "transition-all ease -translate-x-full duration-600"}`}>
        <SideBar isOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default TopBar;
