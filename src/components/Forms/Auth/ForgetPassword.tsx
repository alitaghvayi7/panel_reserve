"use client";

import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import FormButton from "@/components/shared/Buttons/FormButton";
import { useFormTypeStore } from "@/hooks/main-dialog-store";
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "lucide-react";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  phone: z.string().min(1, {
    message: "لطفاً شماره تلفن همراه خود را وارد کنید",
  }),
});

const ForgetPasswordForm = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    register,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSubmitForm = handleSubmit(async (data) => {});
  const handleIsForgetting = useFormTypeStore((state) => state.setFormType);
  return (
    <>
      <DialogHeader className="flex flex-row items-center justify-between space-y-0">
        <DialogTitle className="font-bold text-[10px] lg:text-[14px] leading-[18px]">
          برای بازیابی رمزعبور شماره موبایل خود را وارد کنید.
        </DialogTitle>
        <DialogClose
          onClick={() => {
            setTimeout(() => {
              handleIsForgetting({
                formType: "normal",
              });
            }, 1000);
          }}
          className="rounded-full p-[6px] lg:p-2 bg-[rgba(237,235,250,1)] mt-0"
        >
          <X className="h-4 w-4 lg:h-4 lg:w-4 text-third-black" />
        </DialogClose>
      </DialogHeader>
      <div>
        <form
          onSubmit={handleSubmitForm}
          className="flex flex-col items-stretch gap-2 mt-4 px-2"
        >
          <div className="flex flex-col gap-2">
            <label
              className="text-[12px] font-light text-primary-black"
              htmlFor="phone"
            >
              شماره همراه
            </label>
            <input
              className="outline-none rounded-lg border border-secondary-gray px-4 py-2"
              id="phone"
              {...register("phone")}
            />
            <p className="h-2 text-red-400 text-[12px] leading-none">
              {errors.phone?.message?.toString()}
            </p>
          </div>

          <FormButton
            disabled={isSubmitting}
            className="mt-2 disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
          >
            ارسال لینک بازیابی
          </FormButton>
        </form>
      </div>
    </>
  );
};

export default ForgetPasswordForm;
