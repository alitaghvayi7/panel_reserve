"use client";

import { PanelSidbarNav } from "@/data/Panel";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PanelMainSidebar = () => {
  const pathname = usePathname();
  const activeTab = pathname.split("/")[2];
  //   console.log(pathname.split("/")[2]);
  return (
    <aside className="min-h-screen h-full flex flex-col items-stretch px-4 py-2 bg-[rgba(244,255,252,1)]">
      <div className="flex items-center justify-center p-5">logo</div>
      <div className="border-b border-secondary-gray"></div>
      <div>
        <nav>
          <ul className="flex flex-col items-stretch leading-none gap-2 px-4 py-4">
            {PanelSidbarNav.map((item) => {
              const itemLink = item.link.split("/")[2];
              return (
                <li key={item.id} className={``}>
                  <Link
                    href={item.link}
                    className={`flex items-center gap-2 ${
                      activeTab === itemLink
                        ? "text-[#114737] bg-[#BDEFE0] rounded-lg"
                        : "text-primary-black"
                    } px-4 py-2`}
                  >
                    <div className="w-[20px] h-[20px]">
                      {activeTab === itemLink
                        ? item.activeIcon
                        : item.inactiveIcon}
                    </div>
                    <div>{item.name}</div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default PanelMainSidebar;
