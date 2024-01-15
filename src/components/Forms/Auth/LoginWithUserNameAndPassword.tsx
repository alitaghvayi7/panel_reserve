"use client";

import z, { Schema } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormTypeStore } from "@/hooks/main-dialog-store";
import { useCallback } from "react";
import FormButton from "@/components/shared/Buttons/FormButton";

const schema = z.object({
  username: z.string().min(1, {
    message: "لطفاً نام کاربری خود را وارد کنید",
  }),
  password: z.string().min(1, {
    message: "لطفاً رمز عبور خود را وارد کنید",
  }),
});

const LoginWithUserNameAndPasswordForm = () => {
  const setIsForgetting = useFormTypeStore((state) => state.setFormType);
  const handleIsForgetting = useCallback(() => {
    setIsForgetting({
      formType: "forgetPassword",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    register,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSubmitForm = handleSubmit((data) => {});
  return (
    <div className="flex flex-col items-stretch gap-4 lg:gap-6">
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col items-stretch gap-2 mt-4 px-2"
      >
        <div className="flex flex-col gap-2">
          <label
            className="text-[12px] font-light text-primary-black"
            htmlFor="username"
          >
            نام کاربری
          </label>
          <input
            className="outline-none rounded-lg border border-secondary-gray px-4 py-2"
            id="username"
            {...register("username")}
          />
          <p className="h-2 text-red-400 text-[12px] leading-none">
            {errors.username?.message?.toString()}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-[12px] font-light text-primary-black"
            htmlFor="password"
          >
            رمز عبور
          </label>
          <input
            className="outline-none rounded-lg border border-secondary-gray px-4 py-2"
            id="password"
            {...register("password")}
          />
          <p className="h-2 text-red-400 text-[12px] leading-none">
            {errors.password?.message?.toString()}
          </p>
        </div>
        <FormButton className="mt-2" type="submit">
          ورود
        </FormButton>
      </form>
      <div
        className="text-[12px] lg:text-[20px] text-primary-black font-medium leading-none text-center cursor-pointer w-fit mx-auto"
        onClick={() => {
          handleIsForgetting();
        }}
      >
        فراموشی رمز عبور
      </div>
    </div>
  );
};

export default LoginWithUserNameAndPasswordForm;
