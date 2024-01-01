"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import FormButton from "../shared/Buttons/FormButton";
import { useState } from "react";
const schema = z.object({
  Name: z.string().min(3, {
    message: "لطفاً نام خود را وارد کنید.",
  }),
  Family: z.string().min(3, {
    message: "لطفاً نام خانوادگی خود را وارد کنید.",
  }),
  Mobile: z.string().min(11, {
    message: "لطفاً شماره تلفن را وارد کنید.",
  }),
  NationalCode: z.string().min(10, {
    message: "لطفاً کد ملی خود را وارد کنید.",
  }),
});
const UpdateUserInfoForm = ({
  data,
  token,
}: {
  data: {
    Id: number;
    Family: string | null;
    Name: string | null;
    Mobile: string | null;
    NationalCode: string | null;
    IsAdmin: boolean;
    IsMobileVerify: boolean;
  };
  token: string;
}) => {
  const [serverError, setServerError] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      Name: data.Name || "",
      Family: data.Family || "",
      Mobile: data.Mobile || "",
      NationalCode: data.NationalCode || "",
    },
  });

  const handleSubmitForm = handleSubmit(async (data) => {
    setServerError("");
    setServerMessage("");
    const req = await fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    const res = await req.json();
    if (req.ok) {
      setServerMessage("با موفقیت بروزرسانی شد.");
    } else {
      setServerError(res.message);
    }
  });
  return (
    <div className="w-[90%] max-w-[450px] mx-auto">
      <form onSubmit={handleSubmitForm}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-stretch">
            <label
              htmlFor="Name"
              className="text-[12px] lg:text-[14px] font-light text-primary-black"
            >
              نام
            </label>
            <input
              className="w-full border rounded-lg px-4 py-2 text-[12px] lg:text-[14px] font-light outline-none mt-2"
              id="Name"
              type="text"
              {...register("Name")}
            />
            {errors.Name && (
              <span className="text-[12px] text-red-500 mt-2">
                {errors.Name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col items-stretch">
            <label
              htmlFor="Family"
              className="text-[12px] lg:text-[14px] font-light text-primary-black"
            >
              نام خانوادگی
            </label>
            <input
              className="w-full border rounded-lg px-4 py-2 text-[12px] lg:text-[14px] font-light outline-none mt-2"
              id="Family"
              type="text"
              {...register("Family")}
            />
            {errors.Family && (
              <span className="text-[12px] text-red-500 mt-2">
                {errors.Family.message}
              </span>
            )}
          </div>
          <div className="flex flex-col items-stretch">
            <label
              htmlFor="NationalCode"
              className="text-[12px] lg:text-[14px] font-light text-primary-black"
            >
              کد ملی
            </label>
            <input
              className="w-full border rounded-lg px-4 py-2 text-[12px] lg:text-[14px] font-light outline-none mt-2"
              id="NationalCode"
              type="text"
              {...register("NationalCode")}
            />
            {errors.NationalCode && (
              <span className="text-[12px] text-red-500 mt-2">
                {errors.NationalCode.message}
              </span>
            )}
          </div>
          <div className="flex flex-col items-stretch">
            <label
              htmlFor="Mobile"
              className="text-[12px] lg:text-[14px] font-light text-primary-black"
            >
              شماره همراه
            </label>
            <input
              className="w-full border rounded-lg px-4 py-2 text-[12px] lg:text-[14px] font-light outline-none mt-2"
              id="Mobile"
              type="text"
              {...register("Mobile")}
            />
            {errors.Mobile && (
              <span className="text-[12px] text-red-500 mt-2">
                {errors.Mobile.message}
              </span>
            )}
          </div>
        </div>
        {serverError && (
          <div className="mt-4 text-[12px] lg:text-[14px] text-red-500">
            {serverError}
          </div>
        )}
        {serverMessage && (
          <div className="mt-4 text-[12px] lg:text-[14px] text-green-500">
            {serverMessage}
          </div>
        )}
        <div className="mt-4">
          <FormButton
            disabled={isSubmitting}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
          >
            {isSubmitting ? "در حال بروزرسانی..." : "ذخیره"}
          </FormButton>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserInfoForm;
