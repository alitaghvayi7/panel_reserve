"use client";

import { useState } from "react";
import LoginWithUserNameAndPasswordForm from "./LoginWithUserNameAndPassword";
import OTPSignIn from "./OTPSignIn";
import SignUpForm from "./SignUp";
import { cn } from "@/lib/utils";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

const tabs = [
  {
    id: 1,
    name: "ورود با نام کاربری",
    borderPosition: "after:left-[100%] after:-translate-x-full after:w-1/3",
    form: <LoginWithUserNameAndPasswordForm />,
  },
  {
    id: 2,
    name: "عضویت",
    borderPosition:
      "after:left-[42%] sm:after:left-[44%] lg:after:left-[35%] after:w-[50px] lg:after:w-1/3",
    form: <SignUpForm />,
  },
  {
    id: 3,
    name: "ورود بدون عضویت",
    borderPosition: "after:left-[0%] after:w-[36%] md:after:w-1/3",
    form: <OTPSignIn />,
  },
];
const AuthFormContainer = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <DialogHeader className="flex flex-row items-center justify-between space-y-0">
        <DialogTitle className="font-bold text-[10px] lg:text-[14px] leading-[18px]">
          برای ورود از طریق یکی از قسمت‌های زیر اقدام کنید.
        </DialogTitle>
        <DialogClose className="rounded-full p-[6px] lg:p-2 bg-[rgba(237,235,250,1)] mt-0">
          <X className="h-4 w-4 lg:h-4 lg:w-4 text-third-black" />
        </DialogClose>
      </DialogHeader>

      <div className="flex flex-col">
        <div
          className={`flex relative items-center justify-between px-2 sm:px-4 lg:px-6 border-b border-b-third-green pb-2 after:content-[''] after:h-[4px] after:rounded-full after:absolute after:bg-secondary-green after:bottom-[-2px] after:transition-all after:duration-150 ${activeTab.borderPosition}`}
        >
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={cn(
                "text-center cursor-pointer text-[12px] lg:text-[14px]",
                activeTab.name === tab.name
                  ? "font-medium text-primary-black"
                  : "text-third-black font-light"
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab.name}
            </div>
          ))}
        </div>
        {activeTab.form}
      </div>
    </>
  );
};

export default AuthFormContainer;
