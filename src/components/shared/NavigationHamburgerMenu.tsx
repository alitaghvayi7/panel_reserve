"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavSections } from "@/data/NavSections";
import { HomeIcon, MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function NavigationHamburgerMenu() {
  const router = useRouter();
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          <MenuIcon className="lg:w-[32px] lg:h-[32px] text-white" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-6 px-6 py-4">
        <DropdownMenuItem onClick={() => router.push("/")}>
          <div className="flex items-center gap-2 leading-none w-full">
            <span>
              <HomeIcon color="#7D7D7D" />
            </span>
            <span className="pt-1">خانه</span>
          </div>
        </DropdownMenuItem>
        {NavSections.map((item) => {
          return (
            <DropdownMenuItem
              onClick={() => router.push(item.link)}
              key={item.id}
            >
              <div className="flex items-center gap-2 leading-none w-full">
                <span className="w-[24px] h-[24px] flex items-center justify-center">
                  {item.miniIcon}
                </span>
                <span className="pt-1">{item.title}</span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
