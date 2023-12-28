"use client";

import { FILTER_ICON, SORT_ICON } from "@/components/assets/SVG/Icons";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { useParams, useSearchParams } from "next/navigation";

const PanelSortTickets = () => {
  //   const params = useSearchParams().forEach((item, key, p) => {
  //     console.log(item, key, p.toString());
  //   });

  return (
    <div>
      <Select>
        <SelectTrigger
          defaultChecked
          className="flex items-center gap-2 bg-[rgba(246,246,246,1)] border-none rounded-lg"
        >
          <span className="text-[12px] font-light text-primary-black">
            مرتب‌سازی
          </span>
          <span className="w-[16px] h-[16px]">
            <SORT_ICON />
          </span>
        </SelectTrigger>
        <SelectContent className="">
          <div></div>
          <div className="flex items-center gap-2 [&_>_*]:flex-1 whitespace-nowrap">
            <button>اعمال</button>
            <button>تنظیم مجدد</button>
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PanelSortTickets;
