"use client";

import {
  CHEVRON_RIGHT,
  FILTER_ICON,
  SORT_ICON,
} from "@/components/assets/SVG/Icons";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { TMenuItem, TMenuName, queryNames } from "@/types/FilterTickets";

const PanelFilterTickets = () => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<TMenuName | null>(null);
  const [isResetFormDisabled, setIsResetFormDisabled] = useState(true);
  const [filtersChanged, setFiltersChanged] = useState(0);
  const searchParams = useSearchParams();
  const [searchQueries, setSearchQueries] = useState<queryNames>({
    FromDate: searchParams.get("FromDate") || null,
    TicketCategoryId:
      searchParams.get("TicketCategoryId") !== null
        ? Number(searchParams.get("TicketCategoryId"))
        : null,
  });
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);

  useEffect(() => {
    setSearchQueries({
      FromDate: searchParams.get("FromDate") || null,
      TicketCategoryId:
        searchParams.get("TicketCategoryId") !== null
          ? Number(searchParams.get("TicketCategoryId"))
          : null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("FromDate"), searchParams.get("TicketCategoryId")]);

  useEffect(() => {
    if (isSelectMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSelectMenuOpen]);

  useEffect(() => {
    let changedQueries = 0;
    for (const key in searchQueries) {
      if (searchQueries[key as keyof queryNames] !== null) {
        changedQueries += 1;
      }
    }
    changedQueries > 0
      ? setIsResetFormDisabled(false)
      : setIsResetFormDisabled(true);
  }, [searchQueries]);

  useEffect(() => {
    let changedQueries = 0;
    if (filtersChanged <= 0) return;
    for (const key in searchQueries) {
      if (searchQueries[key as keyof queryNames] !== null) {
        changedQueries += 1;
      }
    }
    changedQueries > 0 ? setFiltersChanged(2) : setFiltersChanged(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersChanged]);

  const handleAddSearchFilters = () => {
    let params = searchParams
      .toString()
      .split("&")
      .filter((item) => item.includes("="))
      .map((item) => {
        return item.split("=");
      });
    for (const key in searchQueries) {
      const index = params.findIndex((item) => item[0] === key);
      if (index !== -1) {
        if (searchQueries[key as keyof queryNames]) {
          params[index][1] = `${searchQueries[key as keyof queryNames]}`;
        } else {
          params = params.filter((param) => param[0] !== key);
        }
      } else {
        if (searchQueries[key as keyof queryNames]) {
          params.push([key, `${searchQueries[key as keyof queryNames]}`]);
        }
      }
    }
    const newParams = new URLSearchParams();
    params.forEach((item) => {
      newParams.append(item[0], item[1]);
    });
    router.replace(`/panel/tickets?${newParams.toString()}`);
    setIsSelectMenuOpen(false);
    setFiltersChanged(0);
    setOpenMenu(null);
  };
  return (
    <div className="h-full">
      <div className="h-full relative">
        <button
          onClick={() => setIsSelectMenuOpen((prev) => !prev)}
          className="h-full flex items-center gap-2 bg-[rgba(246,246,246,1)] border-none rounded-lg px-4 py-2"
        >
          <span className="w-[16px] h-[16px]">
            <SORT_ICON />
          </span>
          <span className="text-[12px] font-light text-primary-black">
            مرتب‌سازی
          </span>
        </button>
        <div className={isSelectMenuOpen ? "block" : "hidden overflow-hidden"}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsSelectMenuOpen(false);
              setOpenMenu(null);
              setIsResetFormDisabled(true);
            }}
            className={`fixed top-0 left-0 w-screen h-screen z-[60] ${
              isSelectMenuOpen ? "" : ""
            }`}
          ></div>
          <div className={`bg-black`}>
            <div className="flex flex-col items-stretch px-4 min-w-[250px] py-4 max-h-[500px] absolute left-0 top-[110%] border rounded-lg z-[65] bg-white">
              <div className="w-full flex flex-col items-stretch gap-4 select-none"></div>
              <div className="grid grid-cols-2 grid-rows-1 gap-2 whitespace-nowrap mt-4">
                <button
                  disabled={isResetFormDisabled}
                  onClick={() => {
                    setSearchQueries(() => {
                      return {
                        FromDate: null,
                        TicketCategoryId: null,
                      } as queryNames;
                    });
                    setFiltersChanged(0);
                    setOpenMenu(null);
                  }}
                  className="text-[12px] text-[rgba(17,71,55,1)] font-light text-center px-4 py-2 border border-[rgba(145,229,204,1)] rounded-sm disabled:text-third-black disabled:border-third-gray"
                >
                  تنظیم مجدد
                </button>
                <button
                  onClick={handleAddSearchFilters}
                  disabled={filtersChanged > 0 ? false : true}
                  className="text-[12px] text-[rgba(17,71,55,1)] bg-[rgba(145,229,204,1)] font-light text-center px-4 py-2 border rounded-sm disabled:bg-[rgba(238,238,238,1)] disabled:text-third-black"
                >
                  اعمال
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelFilterTickets;
