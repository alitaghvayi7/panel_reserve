import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const FormButton = ({
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
        "bg-blue-green w-full h-full rounded-lg text-[12px] lg:text-[16px] font-medium text-white px-10 py-2 lg:py-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default FormButton;
