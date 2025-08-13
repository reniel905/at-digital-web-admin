"use client";

import React, { JSX, useEffect, useState } from "react";
import Tab, { DropdownTab } from "./Tab";
import Logo from "./Logo";
import {
  LayoutDashboard,
  Bell,
  CalendarDays,
  Calculator,
  Settings,
  LogOut,
  MessageSquareText,
  PanelLeftClose,
  PencilRuler,
} from "lucide-react";
import { useSidebar } from "../../context/sidebarContext"; // ✅ import the context

type SideBarProps = {
  isOpen?: boolean; // determines if TopBar is controlling it
};

const SideBar = ({ isOpen }: SideBarProps) => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar(); // ✅ context usage

  const [selectedTab, setSelectedTab] = useState("Dashboard");

  const dropDownItems: {
    title: string;
    route: string;
    icon?: JSX.Element;
  }[] = [
    { title: "Blogs", route: "/admin/content-management/blogs" },
    { title: "Reviews", route: "/admin/content-management/reviews" },
    { title: "Packages", route: "/admin/content-management/packages" },
    { title: "Services", route: "/admin/content-management/services" },
    { title: "Portfolio", route: "/admin/content-management/portfolio" },
  ];

  const tabs: {
    title: string;
    route: string;
    icon?: JSX.Element;
    badgeCount?: number;
  }[] = [
    {
      title: "Dashboard",
      route: "/admin/dashboard",
      icon: <LayoutDashboard strokeWidth={1} />,
    },
    {
      title: "Notifications",
      route: "/admin/notifications",
      icon: <Bell strokeWidth={1} />,
      badgeCount: 18,
    },
    {
      title: "Message",
      route: "/admin/messages",
      icon: <MessageSquareText strokeWidth={1} />,
      badgeCount: 69,
    },
    {
      title: "Bookings",
      route: "/admin/bookings",
      icon: <CalendarDays strokeWidth={1} />,
      badgeCount: 300,
    },
    {
      title: "Quotations",
      route: "/admin/quotations",
      icon: <Calculator strokeWidth={1} />,
    },
  ];

  useEffect(() => {
    setSelectedTab(selectedTab);
  }, [selectedTab]);

  const openPanel =
    "flex flex-col bg-stone-900 p-4 h-screen w-[250px] transition-all ease duration-300 z-50";
  const closePanel =
    "flex flex-col bg-stone-900 p-4 h-screen transition-all w-[100px] ease duration-300 z-50";

  const rotatePanelOpener = "transition rotate-180 ease duration-300";

  const [panelOpenInternal, setPanelOpenInternal] = useState(true);
  const handlePanelClose = () => {
    setPanelOpenInternal((prev) => !prev);
  };

  return (
    <div
      className={`${
        panelOpenInternal ? openPanel : closePanel
      } max-lg:absolute max-lg:left-0`}
    >
      {/* Header with Logo and Close Button */}
      <div className="relative flex flex-row items-center max-lg:hidden">
        {panelOpenInternal ? (
          <div className="w-full h-[64px] flex items-center justify-start">
            <div className="transition-all ease opacity-100">
              <Logo />
            </div>
          </div>
        ) : (
          <div className="w-full h-[64px] flex items-center justify-start">
            <div className="transition-all ease w-0 opacity-0">
              <Logo />
            </div>
          </div>
        )}

        <div
          className="absolute right-0 hover:cursor-pointer hover:bg-neutral-800 p-2 rounded-md"
          onClick={handlePanelClose}
        >
          <PanelLeftClose
            className={
              panelOpenInternal ? "transition ease duration-300" : rotatePanelOpener
            }
            strokeWidth={1}
            color="white"
          />
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex flex-col justify-start">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            title={tab.title}
            route={tab.route}
            isSelected={selectedTab === tab.title}
            icon={tab.icon}
            badgeCount={tab.badgeCount}
            onClick={() => {
              setSelectedTab(tab.title);
              if (typeof isOpen !== "undefined") {
                setIsSidebarOpen(false); // ✅ auto-close only if controlled by TopBar
              }
            }}
            isOpen={panelOpenInternal}
          />
        ))}
        <DropdownTab
          title="Built-in CMS"
          items={dropDownItems}
          icon={<PencilRuler strokeWidth={1} />}
          isOpen={panelOpenInternal}
          disabled={!panelOpenInternal}
        />
      </div>

      {/* Footer Tabs */}
      <div className="flex flex-col justify-end h-full">
        <Tab
          title="Logout"
          route="/login"
          icon={<LogOut strokeWidth={1} />}
          onClick={() => {
            setSelectedTab("");
            if (typeof isOpen !== "undefined") setIsSidebarOpen(false);
          }}
          isOpen={panelOpenInternal}
        />
        <Tab
          title="Settings"
          route="/admin/settings"
          icon={<Settings strokeWidth={1} />}
          onClick={() => {
            setSelectedTab("");
            if (typeof isOpen !== "undefined") setIsSidebarOpen(false);
          }}
          isOpen={panelOpenInternal}
        />
      </div>
    </div>
  );
};

export default SideBar;
