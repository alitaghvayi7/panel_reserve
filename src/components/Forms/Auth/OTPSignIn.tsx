"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormTypeStore } from "@/hooks/main-dialog-store";
import { useCallback } from "react";
import FormButton from "@/components/shared/Buttons/FormButton";

const schema = z.object({
  phone: z.string().min(1, {
    message: "لطفاً شماره تلفن همراه خود را وارد کنید",
  }),
  idNumber: z.string().min(1, {
    message: "لطفاً کد ملی خود را وارد کنید",
  }),
});

const OTPSignInForm = () => {
  const setFormType = useFormTypeStore((state) => state.setFormType);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    register,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSubmitForm = handleSubmit((data) => {
    console.log(data);
    setFormType({
      formType: "confirmOTP",
    });
  });
  return (
    <div className="flex flex-col items-stretch gap-4 lg:gap-6">
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
        <div className="flex flex-col gap-2">
          <label
            className="text-[12px] font-light text-primary-black"
            htmlFor="idNumber"
          >
            کد ملی
          </label>
          <input
            className="outline-none rounded-lg border border-secondary-gray px-4 py-2"
            id="idNumber"
            {...register("idNumber")}
          />
          <p className="h-2 text-red-400 text-[12px] leading-none">
            {errors.idNumber?.message?.toString()}
          </p>
        </div>
        <FormButton className="mt-2" type="submit">
          ارسال کد اعتبار سنجی
        </FormButton>
      </form>
    </div>
  );
};

export default OTPSignInForm;
