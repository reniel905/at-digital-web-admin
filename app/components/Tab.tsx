import React, { JSX, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useSidebar } from "../contexts/sidebarContext";

const defaultStyle =
  "flex flex-row justify-center items-center text-white hover:bg-neutral-800 hover:cursor-pointer select-none rounded-md mb-2";
const selectedStyle =
  "flex flex-row justify-center items-center bg-neutral-300 text-black hover:cursor-pointer select-none rounded-md transition ease-in-out mb-2";

const dropDownSelect =
  "flex flex-row justify-center items-center bg-neutral-800 text-white hover:cursor-pointer select-none rounded-md transition ease-in-out mb-2";

const defaultTab =
  "rounded-4xl w-[4px] h-[32px] bg-blue-600 scale-y-0 transition ease-in-out opacity-0 duration-400";
const selectedTab =
  "rounded-4xl w-[4px] h-[32px] bg-blue-600 transition scale-y-100 opacity-100 ease-in-out duration-400";

const ChevronUp = "transition ease rotate-180 duration-300 absolute right-0";

type TabProps = {
  title: string;
  isSelected?: boolean;
  route: string;
  icon?: JSX.Element;
  badgeCount?: number;
  onClick?: () => void;
  isOpen?: boolean;
};

const Tab = ({
  title,
  isSelected = false,
  route,
  icon,
  badgeCount = 0,
  onClick,
  isOpen,
}: TabProps) => {
  const [badgeCountNumber, setbadgeCountNumber] = useState(badgeCount);

  useEffect(() => {
    setbadgeCountNumber(badgeCount);
  }, [badgeCount]);

  const exceededBadgeCount = badgeCount > 99;

  return (
    <div>
      <Link href={route}>
        <div
          className={isSelected ? selectedStyle : defaultStyle}
          onClick={onClick}
        >
          <div className={isSelected ? selectedTab : defaultTab}></div>
          <div
            className={`relative flex flex-row justify-${
              isOpen ? `start` : `center`
            } items-center gap-4 w-full m-2 text-sm`}
          >
            <div>{icon}</div>

            {isOpen && title}

            {badgeCountNumber !== 0 && (
              //bads
              <div className="flex flex-row justify-center items-center text-white bg-red-800 w-[24px] h-[24px] rounded-sm text-[12px] absolute right-0">
                {exceededBadgeCount ? "99+" : badgeCount}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

type DropDownItemTabProps = {
  title: string;
  isSelected?: boolean;
  route: string;
  icon?: JSX.Element;
  badgeCount?: number;
  onClick?: () => void;
};

const DropDownItemTab = ({
  title,
  isSelected = false,
  route,
  icon,
  badgeCount = 0,
  onClick,
}: DropDownItemTabProps) => {
  const [badgeCountNumber, setbadgeCountNumber] = useState(badgeCount);
  const { setIsSidebarOpen } = useSidebar(); // ✅ use context

  useEffect(() => {
    setbadgeCountNumber(badgeCount);
  }, [badgeCount]);

  const exceededBadgeCount = badgeCount > 99;

  const handleClick = () => {
    onClick?.(); // run parent callback
    setIsSidebarOpen(false); // ✅ auto-close if controlled by TopBar
  };

  return (
    <div>
      <Link href={route}>
        <div
          className={isSelected ? selectedStyle : defaultStyle}
          onClick={handleClick}
        >
          <div className={isSelected ? selectedTab : defaultTab}></div>
          <div className="relative flex flex-row justify-start items-center gap-4 w-full m-2 text-sm text-nowrap">
            {icon}
            <div className="">{title}</div>
            {badgeCountNumber !== 0 && (
              <div className="flex flex-row justify-center items-center text-white bg-red-800 w-[24px] h-[24px] rounded-sm text-[12px] absolute right-0">
                {exceededBadgeCount ? "99+" : badgeCount}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

type DropDownItem = {
  title: string;
  route: string;
  icon?: JSX.Element;
};

type DropdownTabProps = {
  title: string;
  items: DropDownItem[];
  icon?: JSX.Element;
  isOpen?: boolean;
  disabled?: boolean;
};

export function DropdownTab({
  title,
  items,
  icon,
  isOpen = false,
  disabled = false,
}: DropdownTabProps) {
  const [dropDown, setDropDown] = useState(isOpen);
  const [dropDownDisabled, setDropDownDisabled] = useState(disabled);

  const handleClick = () => {
    setDropDown((prev) => !prev);
  };

  useEffect(() => {
    setDropDownDisabled(disabled);
  });

  const openDropDown = "flex flex-col transition ease duration-300 ";
  const closeDropDown =
    "transition ease opacity-0 -translate-x-full duration-300 ";

  return (
    <>
      <div
        className={dropDown && isOpen ? dropDownSelect : defaultStyle}
        onClick={!dropDownDisabled ? handleClick : undefined}
      >
        <div className={dropDown && isOpen ? selectedTab : defaultTab}></div>
        <div
          className={`relative flex flex-row transition-all ease duration-300 justify-${
            isOpen ? `start` : `center`
          } items-center gap-4 w-full m-2 text-sm text-nowrap`}
        >
          <div>{icon}</div>
          {isOpen && title}
          <div
            className={
              isOpen ? "flex flex-col justify-center items-center" : "hidden"
            }
          >
            {dropDown ? (
              <ChevronDown className={ChevronUp} strokeWidth={1} />
            ) : (
              <ChevronDown
                className="transition ease duration-300 absolute right-0"
                strokeWidth={1}
              />
            )}
          </div>
        </div>
      </div>
      <div className="ml-6">
        <div className="">
          {items.map((item, index) => (
            <div
              key={index}
              style={{ transitionDelay: `${index * 25 + 100}ms` }}
              className={`${dropDown && isOpen ? openDropDown : closeDropDown}`}
            >
              <DropDownItemTab title={item.title} route={item.route} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Tab;
