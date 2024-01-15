"use client";

import { ADD_IMAGE_ICON, DELETE_ICON } from "@/components/assets/SVG/Icons";
import FormButton from "@/components/shared/Buttons/FormButton";
import { baseUrl } from "@/services/main";
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

const MAX_FILE_SIZE = 50000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpg", "image/png"];

const schema = z.object({
  title: z.string().min(1, { message: "لطفاً عنوان را وارد نمائید." }),
  description: z.string().min(1, { message: "لطفاً توضیحات را وارد نمائید." }),
  isNewsActive: z.boolean(),
  image: z
    .any()
    .refine((file) => {
      if (!file[0]) {
        return false;
      }
      return true;
    }, "لطفاً عکس را انتخاب نمائید.")
    .refine((file) => {
      if (!file[0]) return;
      return file[0].size <= MAX_FILE_SIZE;
    }, `حجم عکس نباید بیشتر از 50 مگابایت باشد`)
    .refine((file) => {
      if (!file[0]) return;
      return ACCEPTED_IMAGE_TYPES.includes(file[0].type);
    }, "عکس باید با فرمت png یا jpg باشد"),
});

const AddNewsForm = () => {
  const session = useSession();
  const [serverMessage, setServerMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<File | null>(null);

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
    console.log(data.description);
    const formData = new FormData();
    formData.append("Title", data.title);
    formData.append("Description", data.description);
    formData.append("Visibility", data.isNewsActive.toString());
    formData.append("Image", data.image[0]);
    const req = await fetch(`${baseUrl}/api/news/add`, {
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
      setError("description", { message: res.Message });
    }
  });
  return (
    <div className="w-full max-w-[800px] mx-auto">
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col items-stretch gap-6"
      >
        <div className="flex flex-col items-stretch gap-6">
          <div className="flex flex-col space-y-2 w-[50%] mx-auto">
            <p className="text-[14px] font-medium text-secondary-black">
              عکس خبر را وارد کنید
            </p>
            <p className="text-[12px] text-third-black">
              فایل باید فرمت jpg یا png باشد و با حجم کمتر از 50 مگابایت
            </p>
            {imagePreview && (
              <div className="flex items-center justify-between leading-none px-4 py-4 border border-dashed border-[rgba(40,167,128,1)] w-full rounded-lg">
                <span className="h-[50px] aspect-square relative">
                  <Image
                    src={URL.createObjectURL(imagePreview)}
                    alt=""
                    fill
                    className="rounded-md"
                  />
                </span>
                <span className="text-[14px]">{imagePreview.name}</span>
                <span
                  className="w-[20px] h-[20px] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImagePreview(null);
                    setValue("image", null);
                  }}
                >
                  <DELETE_ICON />
                </span>
              </div>
            )}
            {!imagePreview && (
              <label
                htmlFor="image"
                className="w-full cursor-pointer py-2 px-4 rounded-lg flex items-center gap-4 bg-[#FAFAFA] border border-dashed border-[rgba(40,167,128,1)]"
              >
                <span className="w-[52px] h-[52px] flex items-center justify-center p-4 rounded-full bg-[rgba(189,239,224,1)]">
                  <ADD_IMAGE_ICON />
                </span>
                <span className="text-[14px] text-[rgba(17,71,55,1)] font-light">
                  بارگزاری فایل
                </span>
              </label>
            )}
            {!imagePreview && (
              <input
                accept="image/png"
                {...register("image", {
                  onChange(event) {
                    setImagePreview(event.target.files[0]);
                  },
                })}
                id="image"
                type="file"
                className="hidden"
              />
            )}
            {errors.image && (
              <span className="text-red-500 text-[12px]">
                {errors.image.message?.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-[50%] mx-auto">
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
          <div className="flex items-center gap-2 w-full leading-none">
            <label
              htmlFor="isNewsActive"
              className="text-[14px] font-medium text-secondary-black"
            >
              خبر در سایت فعال و نمایش داده شود؟
            </label>
            <input
              type="checkbox"
              className="cursor-pointer"
              {...register("isNewsActive")}
            />
            {errors.isNewsActive && (
              <span className="text-red-500 mt-2 text-[12px]">
                {errors.isNewsActive.message?.toString()}
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

export default AddNewsForm;
