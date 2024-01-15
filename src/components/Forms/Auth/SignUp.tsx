import FormButton from "@/components/shared/Buttons/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z.object({
  firstName: z.string().min(1, "لطفاً نام خود را وارد کنید"),
  lastName: z.string().min(1, "لطفاً نام خانوادگی خود را وارد کنید"),
  phone: z.string().min(1, "لطفاً شماره تلفن همراه خود را وارد کنید"),
  idNumber: z.string().min(1, "لطفاً کد ملی خود را وارد کنید"),
  password: z.string().min(1, "لطفاً رمز عبور خود را وارد کنید"),
});

const SignUpForm = () => {
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
    <div className="">
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col items-stretch gap-1 2xl:gap-2 mt-2 2xl:mt-4 px-2"
      >
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label
            className="text-[12px] font-light text-primary-black"
            htmlFor="firstName"
          >
            نام
          </label>
          <input
            className="outline-none rounded-lg border border-secondary-gray px-4 py-2"
            id="firstName"
            {...register("firstName")}
          />
          <p className="h-2 text-red-400 text-[10px] lg:text-[12px] leading-none">
            {errors.firstName?.message?.toString()}
          </p>
        </div>
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label
            className="text-[12px] font-light text-primary-black"
            htmlFor="lastName"
          >
            نام خانوادگی
          </label>
          <input
            className="outline-none rounded-lg border border-secondary-gray px-4 py-2"
            id="lastName"
            {...register("lastName")}
          />
          <p className="h-2 text-red-400 text-[10px] lg:text-[12px] leading-none">
            {errors.lastName?.message?.toString()}
          </p>
        </div>
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label
            className="text-[12px] font-light text-primary-black"
            htmlFor="phone"
          >
            شماره همراه
          </label>
          <input
            className="outline-none rounded-lg border border-secondary-gray px-4 py-2"
            id="phone"
            {...register("phone")}
          />
          <p className="h-2 text-red-400 text-[10px] lg:text-[12px] leading-none">
            {errors.phone?.message?.toString()}
          </p>
        </div>
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label
            className="text-[12px] font-light text-primary-black"
            htmlFor="idNumber"
          >
            کد ملی
          </label>
          <input
            className="outline-none rounded-lg border border-secondary-gray px-4 py-2"
            id="idNumber"
            {...register("idNumber")}
          />
          <p className="h-2 text-red-400 text-[10px] lg:text-[12px] leading-none">
            {errors.idNumber?.message?.toString()}
          </p>
        </div>
        <div className="flex flex-col gap-1 2xl:gap-2">
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
          <p className="h-2 text-red-400 text-[10px] lg:text-[12px] leading-none">
            {errors.password?.message?.toString()}
          </p>
        </div>
        <FormButton className="mt-2" type="submit">
          عضویت
        </FormButton>
      </form>
    </div>
  );
};

export default SignUpForm;
