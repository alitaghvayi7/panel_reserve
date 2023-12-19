import { cn } from "@/lib/utils";
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  LegacyRef,
} from "react";

// const SignInButton = ({
//   className,
//   children,
//   ...props
// }: DetailedHTMLProps<
//   ButtonHTMLAttributes<HTMLButtonElement>,
//   HTMLButtonElement
// >) => {
//   return (
//     <button
//       className={cn(
//         "bg-primary-blue rounded-lg text-[14px] lg:text-[14px] font-medium text-white px-4 py-2",
//         className
//       )}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };
const SignInButton = React.forwardRef<
  HTMLButtonElement | null,
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>(function SignInButton({ className, children, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        "bg-primary-blue rounded-lg text-[14px] lg:text-[14px] font-medium text-white px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export default SignInButton;
