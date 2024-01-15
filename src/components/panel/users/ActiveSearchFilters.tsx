"use client";

import { TFilterTicketDate } from "@/types";
import { TMenuItem, TUserFilterMenuItem } from "@/types/FilterTickets";
import { XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
const filtersDate: {
  name: TFilterTicketDate;
  value: string;
}[] = [
  {
    name: "today",
    value: "امروز",
  },
  {
    name: "lastWeek",
    value: "هفته اخیر",
  },
  {
    name: "lastMonth",
    value: "ماه اخیر",
  },
];
const UserPageActiveSearchFilters = ({
  menus,
}: {
  menus: TUserFilterMenuItem[];
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  let hasFilters = false;
  const filters: {
    [key: string]: string | null;
  } = {
    FromDate: null,
    TicketCategoryId: null,
    SortBy: null,
    Title: null,
  };

  let filtersCount = 0;
  for (const key in filters) {
    if (searchParams.get(key)) {
      filtersCount++;
      filters[key] = searchParams.get(key) || null;
    }
  }
  if (filtersCount > 0) {
    hasFilters = true;
  }

  const isAdmin = useMemo(() => {
    return menus
      .find((item) => item.name === "ادمین")
      ?.children.find((child) => `${child.Id}` === filters.TicketCategoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.TicketCategoryId]);

  const handleRemoveFilter = (paramName: string) => {
    let params = searchParams
      .toString()
      .split("&")
      .map((item) => {
        return item.split("=");
      });
    params = params.filter((param) => param[0] !== paramName);
    const newParams = new URLSearchParams();
    params.forEach((item) => {
      newParams.append(item[0], item[1]);
    });

    router.push(`/panel/tickets?${newParams.toString()}`);
  };
  return hasFilters ? (
    <div className="flex items-center gap-4">
      <span className="text-[12px] font-medium text-third-black">
        فیلترهای اعمال شده:
      </span>
      <div className="flex items-center gap-2">
        {/* category */}
        {filters.TicketCategoryId && (
          <button
            onClick={() => {
              handleRemoveFilter("TicketCategoryId");
            }}
            className="flex items-center gap-1 text-[12px] text-third-black bg-primary-gray rounded-md p-2"
          >
            <span>
              <XIcon className="w-[16px] h-[16px]" strokeWidth={1} />
            </span>
            <span>{isAdmin && "ادمین"}</span>
          </button>
        )}
        {/* title */}
        {filters.Title && (
          <button
            onClick={() => {
              handleRemoveFilter("Title");
            }}
            className="flex items-center gap-1 text-[12px] text-third-black bg-primary-gray rounded-md p-2"
          >
            <span>
              <XIcon className="w-[16px] h-[16px]" strokeWidth={1} />
            </span>
            <span>{filters.Title}</span>
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default UserPageActiveSearchFilters;
