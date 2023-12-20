"use client";

import { getLastMonths, months } from "@/lib/getLastMonths";
import { CALENDER_ICON } from "../assets/SVG/Icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const SelectMonth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const month = searchParams.get("month") || "انتخاب";
  return (
    <div>
      <Select
        onValueChange={(e) => {
          router.push(`/wealth?month=${e}`);
        }}
      >
        <SelectTrigger className="flex items-center gap-4">
          <SelectValue
            placeholder={month !== "انتخاب" ? months[+month - 1].name : month}
          />
          <span className="w-[1px] h-[20px] bg-slate-300"></span>
          <span className="w-[16px] h-[16px]">
            <CALENDER_ICON />
          </span>
        </SelectTrigger>
        <SelectContent>
          {getLastMonths().map((item) => (
            <SelectItem key={item.id} value={`${item.id}`}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectMonth;
