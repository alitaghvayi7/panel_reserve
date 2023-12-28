// "use client";

import { TicketsHeaderType } from "@/data/Tickets";
import { TSearchParams } from "@/types";
import Link from "next/link";

type Tab = {
  id: number;
  name: string;
  query: TicketsHeaderType;
  pointerPosition: string;
};
const tabs: Tab[] = [
  {
    id: 1,
    name: "همه درخواست‌ها",
    query: "All",
    pointerPosition: "right-[0px] w-[115px]",
  },
  {
    id: 2,
    name: "پاسخ داده شده",
    query: "AdminReply",
    pointerPosition: "right-[140px] w-[110px]",
  },
  {
    id: 3,
    name: "درخواست‌های جدید",
    query: "New",
    pointerPosition: "right-[270px] w-[150px]",
  },
];

const PanelTicketsMainNavbar = ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const activeTab = searchParams.status || tabs[0].query;

  return (
    <>
      <div
        className={`absolute bottom-[-2px] h-1 rounded-full bg-[rgba(101,218,183,1)] duration-150 transition-all ${
          tabs.find((item) => item.query === activeTab)?.pointerPosition
        }`}
      ></div>
      <div className="flex items-center gap-10">
        {tabs.map((tab) => (
          <Link
            href={`/panel/tickets?status=${tab.query}`}
            key={tab.id}
            className={`${
              activeTab === tab.query
                ? "text-primary-black font-medium"
                : "text-third-black font-light"
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default PanelTicketsMainNavbar;
