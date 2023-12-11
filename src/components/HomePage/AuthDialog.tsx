"use client";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "../UI/dialog";
import SignInButton from "../shared/Buttons/SignIn";

import OTPSignIn from "../Forms/Auth/OTPSignIn";
import { useFormTypeStore } from "@/hooks/main-dialog-store";
import ForgetPasswordForm from "../Forms/Auth/ForgetPassword";
import AuthFormContainer from "../Forms/Auth/FormsContainer";
import ConfirmOTPForm from "../Forms/Auth/ConfirmOTP";

const formComponents: {
  [key: string]: JSX.Element;
} = {
  normal: <AuthFormContainer />,
  forgetPassword: <ForgetPasswordForm />,
  confirmOTP: <ConfirmOTPForm />,
};

const AuthDialog = () => {
  const [formType, handleFormType] = useFormTypeStore((state) => [
    state.formType,
    state.setFormType,
  ]);
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <SignInButton>ورود</SignInButton>
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
