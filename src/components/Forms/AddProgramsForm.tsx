"use client";

import { ADD_IMAGE_ICON, DELETE_ICON } from "@/components/assets/SVG/Icons";
import FormButton from "@/components/shared/Buttons/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const CustomEditor = dynamic(
  () => {
    return import("@/components/custom-editor");
  },
  { ssr: false }
);

const schema = z.object({
  description: z.string().min(1, { message: "لطفاً توضیحات را وارد نمائید." }),
});

const AddProgramsForm = () => {
  const session = useSession();
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSubmitForm = handleSubmit(async (data) => {
    setServerMessage("");

    const req = await fetch(`/api/programs/updatePrograms`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.data?.user?.token || ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: data.description,
      }),
    });

    const res = await req.json();

    if (req.ok) {
      setServerMessage("عملیات با موفقیت انجام شد.");
    } else {
      setError("description", { message: res.message });
    }
  });
  return (
    <div className="w-full max-w-[800px] mx-auto">
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col items-stretch gap-6"
      >
        <div className="flex flex-col items-stretch gap-6">
          <div className="flex flex-col space-y-2 w-full">
            <label
              htmlFor="description"
              className="text-[14px] font-medium text-secondary-black"
            >
              برنامه ها و ایدئولوژی خود را به صورت متن وارد کنید
            </label>
            <Controller
              name="description"
              control={control}
              defaultValue={""}
              render={({ field }) => {
                return <CustomEditor onChange={field.onChange} />;
              }}
            />
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

export default AddProgramsForm;
