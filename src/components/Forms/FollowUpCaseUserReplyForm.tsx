"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z.object({
  description: z.string().min(1, { message: "* پاسخ الزامی است." }),
});
const FollowUpCasesUserReplyForm = ({ ticketId }: { ticketId: number }) => {
  const router = useRouter();
  const session = useSession();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const handleSubmitForm = handleSubmit(async (data) => {
    const req = await fetch("/api/tickets/reply/user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.data?.user.token}`,
      },
      body: JSON.stringify({
        id: ticketId,
        description: data.description,
      }),
    });
    const res = await req.json();
    if (req.ok) {
      router.refresh();
    } else {
      setError("description", {
        message: res.message,
      });
    }
  });
  return (
    <form
      onSubmit={handleSubmitForm}
      className="flex flex-col items-stretch gap-2"
    >
      <div className="flex flex-col items-stretch">
        <textarea
          className="w-full max-h-[200px] placeholder:text-third-black text-[10px] lg:text-[14px] text-black outline-none p-4 border border-secondary-gray rounded-sm"
          placeholder="پاسخ خود را بنویسید."
          {...register("description")}
        />
        <p className="text-[10px] text-red-500 mt-2">
          {errors.description?.message?.toString()}
        </p>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-third-green px-4 py-4 rounded-sm text-[10px] lg:text-[14px] text-primary-black mr-auto disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {isSubmitting ? "در حال ارسال..." : "ارسال"}
      </button>
    </form>
  );
};

export default FollowUpCasesUserReplyForm;
