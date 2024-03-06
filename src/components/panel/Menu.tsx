"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PERSON_ICON } from "../assets/SVG/Icons";
import { useSession } from "next-auth/react";
import { convertToPersianNumber } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import SignInButton from "../shared/Buttons/SignIn";

export function PanelAccountMenuBar() {
  const session = useSession();
  const router = useRouter();

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <SignInButton className="flex items-center justify-center gap-2 h-full leading-none whitespace-nowrap p-2 outline-none bg-[#EEEEEE]">
          <span className="w-[14px] lg:w-[16px] h-[14px] lg:h-[16px]">
            <PERSON_ICON fill="#7D7D7D" />
          </span>
          <span className="hidden sm:flex items-center justify-center text-[12px] leading-none text-[#7D7D7D]">
            {(session.data && session.data.user?.name?.trim()) ||
              (session.data &&
                convertToPersianNumber(session.data.user?.phone || ""))}
          </span>
          <span className="hidden sm:inline">
            <ChevronDown color="#7D7D7D" />
          </span>
        </SignInButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="py-2 ml-4 lg:ml-0">
        <DropdownMenuItem
          onClick={() => router.push("/")}
          className="px-4 lg:pl-10"
        >
          مشاهده سایت
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-4 lg:pl-10">خروج</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
