"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z.object({
  description: z.string().min(1, { message: "* پاسخ الزامی است." }),
});
const FollowUpCasesUserReplyForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const handleSubmitForm = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form
      onSubmit={handleSubmitForm}
      className="flex flex-col items-stretch gap-2"
    >
      <div className="flex flex-col items-stretch">
        <textarea
          className="w-full max-h-[200px] placeholder:text-third-black placeholder:text-[10px] text-[10px] text-black outline-none p-4 border border-secondary-gray rounded-sm"
          placeholder="پاسخ خود را بنویسید."
          {...register("description")}
        />
        <p className="text-[10px] text-red-500 mt-2">
          {errors.description?.message?.toString()}
        </p>
      </div>
      <button
        type="submit"
        className="bg-third-green px-4 py-4 rounded-sm text-[10px] text-primary-black mr-auto"
      >
        ارسال
      </button>
    </form>
  );
};

export default FollowUpCasesUserReplyForm;
