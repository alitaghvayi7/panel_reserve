"use client";

import FormButton from "@/components/shared/Buttons/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "لطفاً عنوان را وارد نمائید." }),
  description: z.string().min(1, { message: "لطفاً توضیحات را وارد نمائید." }),
});

const AddWealthForm = () => {
  const session = useSession();
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSubmitForm = handleSubmit(async (data) => {
    setServerMessage("");
    const formData = new FormData();
    formData.append("Title", data.title);
    formData.append("Description", data.description);

    const req = await fetch(`/api/wealth/admin`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.data?.user?.token || ""}`,
      },
      body: formData,
    });

    const res = await req.json();
    if (req.ok) {
      setServerMessage("عملیات با موفقیت انجام شد.");
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
              htmlFor="title"
              className="text-[14px] font-medium text-secondary-black"
            >
              عنوان را وارد کنید
            </label>
            <input
              id="title"
              type="text"
              className="outline-none border p-2 rounded-lg placeholder:text-third-black text-[14px]"
              placeholder="عنوان"
              {...register("title")}
            />
            {errors.title && (
              <span className="text-red-500 text-[12px]">
                {errors.title.message?.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label
              htmlFor="description"
              className="text-[14px] font-medium text-secondary-black"
            >
              توضیحات را وارد کنید
            </label>
            <textarea
              placeholder="متن را وارد کنید"
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

export default AddWealthForm;
