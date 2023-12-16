"use client";

import { z } from "zod";
import FormButton from "../shared/Buttons/FormButton";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const schema = z.object({
  code: z
    .string()
    .min(1, { message: "لطفاً کد پیگیری خود را وارد نمائید." })
    .regex(/^[0-9]+$/, "لطفاً کد پیگیری را درست وارد نمائید."),
});
const FollowUpCasesSearchForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const handleSubmitForm = handleSubmit((data) => {
    router.push(`/follow-up-cases?code=${data.code}`);
    reset();
  });
  return (
    <form
      onSubmit={handleSubmitForm}
      className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4"
    >
      <div className="flex flex-col items-stretch">
        <input
          className="w-full h-full rounded-lg border border-secondary-gray overflow-hidden lg:min-w-[250px] outline-none px-4 py-2 placeholder:text-third-black placeholder:text-[10px] lg:placeholder:text-[12px] lg:placeholder:font-medium"
          placeholder="کد پیگیری"
          type="number"
          {...register("code", {})}
        />
        <p className="text-[10px] mt-2 text-red-400">
          {errors.code?.message?.toString()}
        </p>
      </div>
      <div className="lg:min-w-[170px]">
        <FormButton type="submit">جستجو</FormButton>
      </div>
    </form>
  );
};

export default FollowUpCasesSearchForm;
