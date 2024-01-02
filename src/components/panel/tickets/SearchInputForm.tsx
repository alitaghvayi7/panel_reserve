"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z.object({
  title: z.string().min(1, { message: "لطفاً موضوع درخواست را وارد نمائید" }),
});
const SearchInputForm = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    let params = searchParams
      .toString()
      .split("&")
      .filter((item) => item.includes("="))
      .map((item) => {
        return item.split("=");
      });

    const titleIndex = params.findIndex((item) => item[0] === "Title");
    if (titleIndex !== -1) {
      params[titleIndex][1] = data.title;
    } else {
      params.push(["Title", data.title]);
    }

    const newParams = new URLSearchParams();
    params.forEach((item) => {
      newParams.append(item[0], item[1]);
    });

    reset();

    router.push(`/panel/tickets?${newParams.toString()}`);
  });
  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
      <div className="border px-[6px] py-[6px] flex items-center gap-6 rounded-md min-w-[500px]">
        <input
          className="outline-none text-[12px] font-medium grow h-full"
          type="text"
          placeholder="موضوع"
          {...register("title")}
        />

        <button
          type="submit"
          className="flex items-center justify-center bg-blue-green text-[10px] font-medium text-white rounded-sm px-5 py-3 leading-none"
        >
          جستجو
        </button>
      </div>
      {errors.title && (
        <p className="text-[12px] text-red-400">
          {errors.title.message?.toString()}
        </p>
      )}
    </form>
  );
};

export default SearchInputForm;
