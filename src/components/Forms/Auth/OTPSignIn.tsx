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
  const [setFormType, additionalData] = useFormTypeStore((state) => [
    state.setFormType,
    state.additionalData,
  ]);
  console.log(additionalData?.phoneNumber);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    register,
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: additionalData?.phoneNumber || "",
      idNumber: "",
    },
  });

  const handleSubmitForm = handleSubmit(async (data) => {
    const req = await fetch(`/api/login/otp/send`, {
      method: "POST",
      next: { revalidate: 0 },
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: data.phone,
      }),
    });
    const res = await req.json();
    if (req.ok) {
      console.log(req.status);
      setFormType({
        formType: "confirmOTP",
        additionalData: {
          phoneNumber: data.phone,
        },
      });
    } else {
      if (req.status === 422) {
        setError("phone", {
          message: res.message,
        });
        return;
      }
      setError("root", {
        message: res.message,
      });
    }
  });
  return (
    <div className="">
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
          <p className="text-red-400 text-[12px] leading-none">
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
          <p className="text-red-400 text-[12px] leading-none">
            {errors.idNumber?.message?.toString()}
          </p>
        </div>
        <p className="text-red-400 text-[12px] leading-none">
          {errors.root?.message?.toString()}
        </p>
        <FormButton
          disabled={isSubmitting}
          className="mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
          type="submit"
        >
          {isSubmitting ? "در حال ارسال..." : "ارسال کد اعتبار سنجی"}
        </FormButton>
      </form>
    </div>
  );
};

export default OTPSignInForm;
