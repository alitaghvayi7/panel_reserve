"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignInButton from "./Buttons/SignIn";
import { PERSON_ICON } from "../assets/SVG/Icons";
import { useSession } from "next-auth/react";
import { convertToPersianNumber } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

export function AccountMenuBar() {
  const session = useSession();
  const router = useRouter();

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <SignInButton className="flex items-center justify-center gap-2 h-full leading-none whitespace-nowrap p-2 outline-none">
          <span className="w-[14px] lg:w-[16px] h-[14px] lg:h-[16px]">
            <PERSON_ICON />
          </span>
          <span className="hidden sm:flex items-center justify-center text-[12px] lg:text-[14px] leading-none">
            {(session.data && session.data.user?.name?.trim()) ||
              (session.data &&
                convertToPersianNumber(session.data.user?.phone || ""))}
          </span>
          <span className="hidden sm:inline">
            <ChevronDown />
          </span>
        </SignInButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2 py-2 lg:py-4 ml-4 lg:ml-0">
        <DropdownMenuItem
          onClick={() => router.push("/info")}
          className="px-4 lg:pl-10"
        >
          حساب کاربری
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/history")}
          className="px-4 lg:pl-10"
        >
          درخواست‌ها
        </DropdownMenuItem>
        {session.data?.user.isAdmin && (
          <DropdownMenuItem
            onClick={() => router.push("/panel")}
            className="px-4 lg:pl-10"
          >
            پنل ادمین
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-4 lg:pl-10">خروج</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
