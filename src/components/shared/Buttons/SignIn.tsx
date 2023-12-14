import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const SignInButton = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      className={cn(
        "bg-primary-blue rounded-lg text-[14px] lg:text-[14px] font-medium text-white px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default SignInButton;
