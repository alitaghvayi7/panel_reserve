"use client";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "../ui/dialog";
import SignInButton from "./Buttons/SignIn";

import { useFormTypeStore } from "@/hooks/main-dialog-store";
import ForgetPasswordForm from "../Forms/Auth/ForgetPassword";
import AuthFormContainer from "../Forms/Auth/FormsContainer";
import ConfirmOTPForm from "../Forms/Auth/ConfirmOTP";
import { PERSON_ICON } from "../assets/SVG/Icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { convertToPersianNumber } from "@/lib/utils";
import { AccountMenuBar } from "./AccountMenuBar";

const formComponents: {
  [key: string]: JSX.Element;
} = {
  normal: <AuthFormContainer />,
  forgetPassword: <ForgetPasswordForm />,
  confirmOTP: <ConfirmOTPForm />,
};

const AuthDialog = () => {
  const session = useSession();
  const [formType, handleFormType] = useFormTypeStore((state) => [
    state.formType,
    state.setFormType,
  ]);
  if (session.status === "authenticated") {
    return <AccountMenuBar />;
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger className="h-full" asChild>
          <SignInButton className="flex items-center justify-center gap-2 h-full whitespace-nowrap p-2 md:px-4">
            <span className="w-[14px] lg:w-[16px] h-[14px] lg:h-[16px]">
              <PERSON_ICON />
            </span>
            <span className="hidden md:inline">ورود/عضویت</span>
          </SignInButton>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay
            className="fixed inset-0 z-[45] bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            onClick={() => {
              setTimeout(() => {
                handleFormType({ formType: "normal" });
              }, 1000);
            }}
          />
          <DialogContent className="max-w-[308px] sm:max-w-[390px] rounded-2xl lg:max-w-[484px] px-4 lg:px-6">
            {formComponents[formType]}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
};

export default AuthDialog;
