"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    id: 1,
    title: "حساب کاربری",
    link: "info",
    pointerStyle:
      "w-[70px] lg:w-[120px] right-[50%] translate-x-[110%] lg:translate-x-[107%]",
  },
  {
    id: 2,
    title: "درخواست‌ها",
    link: "history",
    pointerStyle:
      "w-[70px] lg:w-[120px] right-[50%] -translate-x-[10%] lg:translate-x-[-10%]",
  },
];

const AccountTabs = () => {
  const route = usePathname()
    .split("/")
    .filter((item) => item !== "")[0];
  return (
    <div className="border-b border-third-green flex items-center justify-center gap-6 lg:gap-10 relative">
      {/* pointer */}
      <div
        className={`absolute bottom-[-2px] lg:bottom-[-3px] h-[4px] rounded-full bg-secondary-green duration-150 ${
          tabs.find((item) => item.link === route)?.pointerStyle
        }`}
      ></div>
      {tabs.map((tab) => {
        return (
          <Link
            key={tab.id}
            href={`/${tab.link}`}
            className={`py-2 ${
              tab.link === route
                ? "text-primary-black font-medium text-[12px] lg:text-[20px]"
                : "text-[12px] lg:text-[20px] font-light text-third-black"
            }`}
          >
            {tab.title}
          </Link>
        );
      })}
    </div>
  );
};

export default AccountTabs;
