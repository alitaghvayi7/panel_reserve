"use client";

import FormButton from "@/components/shared/Buttons/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { use, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { RangeDatePicker } from "../shared/RangeDatePicker";
import { useRouter } from "next/navigation";

const schema = z.object({
  organization: z
    .string()
    .min(1, { message: "لطفاً نام سازمان را وارد نمائید." }),
  description: z
    .string()
    .min(1, { message: "لطفاً توضیحات را وارد نمائید." })
    .max(100, {
      message: "توضیحات نباید بیشتر از 100 کاراکتر باشد.",
    }),
  post: z.string().min(1, { message: "لطفاً نام پست را وارد نمائید." }),
  duration: z.string().min(1, { message: "لطفاً مدت زمان را وارد نمائید." }),
});

const AddCvForm = () => {
  const session = useSession();
  const [serverMessage, setServerMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSubmitForm = handleSubmit(async (data) => {
    setServerMessage("");

    const req = await fetch(`/api/cv/addCv`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.data?.user?.token || ""}`,
      },
      body: JSON.stringify({ ...data }),
    });

    const res = await req.json();
    if (req.ok) {
      setServerMessage("عملیات با موفقیت انجام شد.");
      reset();
      router.refresh();
    } else {
      setError("description", { message: res.message });
    }
  });
  return (
    <div className="w-full max-w-[600px] mx-auto">
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col items-stretch gap-6"
      >
        <div className="flex flex-col items-stretch gap-6">
          <div className="flex flex-col space-y-2 w-[60%] mx-auto">
            <label
              htmlFor="organization"
              className="text-[14px] font-medium text-secondary-black"
            >
              نام سازمانی که در آنجا مشغول به کار بودید را وارد کنید
            </label>
            <input
              id="organization"
              type="text"
              className="outline-none border p-2 rounded-lg placeholder:text-third-black text-[14px]"
              placeholder="نام سازمان"
              {...register("organization")}
            />
            {errors.organization && (
              <span className="text-red-500 text-[12px]">
                {errors.organization.message?.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-[60%] mx-auto">
            <label
              htmlFor="post"
              className="text-[14px] font-medium text-secondary-black"
            >
              عنوان شغلی یا سمت خود را وارد کنید
            </label>
            <input
              id="post"
              type="text"
              className="outline-none border p-2 rounded-lg placeholder:text-third-black text-[14px]"
              placeholder="عنوان شغلی"
              {...register("post")}
            />
            {errors.post && (
              <span className="text-red-500 text-[12px]">
                {errors.post.message?.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label
              htmlFor="description"
              className="text-[14px] font-medium text-secondary-black"
            >
              دستاوردهایی که در آن سازمان ایجاد کردید را بنویسید.
            </label>
            <textarea
              placeholder="متن باید کمتر از 100 کاراکتر باشد."
              id="description"
              {...register("description")}
              className="outline-none border p-2 rounded-lg placeholder:text-third-black text-[14px] min-h-[200px]"
            ></textarea>
            {errors.description && (
              <span className="text-red-500 text-[12px]">
                {errors.description.message?.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-[60%] mx-auto">
            <label
              htmlFor="post"
              className="text-[14px] font-medium text-secondary-black"
            >
              مدت کار
            </label>
            <Controller
              name="duration"
              control={control}
              defaultValue={""}
              render={({ field }) => {
                return <RangeDatePicker field={{ ...field }} />;
              }}
            />
            {errors.duration && (
              <span className="text-red-500 text-[12px]">
                {errors.duration.message?.toString()}
              </span>
            )}
          </div>
        </div>
        {serverMessage && (
          <p className="text-[14px] text-green-400">{serverMessage}</p>
        )}
        <div className="mx-auto max-w-[300px]">
          <FormButton
            disabled={isSubmitting}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
          >
            {isSubmitting ? "در حال ارسال..." : "ارسال"}
          </FormButton>
        </div>
      </form>
    </div>
  );
};

export default AddCvForm;
