"use client";

import { useForm } from "react-hook-form";
import FormButton from "../shared/Buttons/FormButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = z.object({
  description: z.string().min(1, { message: "پاسخ الزامی است" }),
});

const ReplyToUserForm = ({ ticketId }: { ticketId: number }) => {
  const session = useSession();
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    const req = await fetch(`/api/tickets/reply/admin`, {
      method: "POST",
      next: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.data?.user.token}`,
      },
      body: JSON.stringify({
        id: ticketId,
        description: data.description,
      }),
    });
    const res = await req.json();
    if (req.ok) {
      reset();
      router.refresh();
    } else {
      setError("description", {
        message: res.message,
      });
    }
  });

  return (
    <div className="mt-4">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-stretch gap-4"
      >
        <div className="">
          <textarea
            {...register("description")}
            className="text-[14px] placeholder:text-[rgba(204,204,204,1)] w-full outline-none border rounded-md px-4 py-3 min-h-[200px]"
            placeholder="پاسخ خود را به کاربر بنویسید"
          ></textarea>
          {errors.description && (
            <p className="text-red-400 text-[12px]">
              {errors.description.message?.toString()}
            </p>
          )}
        </div>
        <div className="mx-auto max-w-[250px]">
          <FormButton
            disabled={isSubmitting}
            className="disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            type="submit"
          >
            {isSubmitting ? "در حال ارسال..." : "ارسال"}
          </FormButton>
        </div>
      </form>
    </div>
  );
};

export default ReplyToUserForm;
