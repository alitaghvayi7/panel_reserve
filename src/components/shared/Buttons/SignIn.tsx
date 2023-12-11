import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const SignInButton = ({
  className = "bg-primary-blue rounded-lg text-[20px] font-medium text-white px-10 py-2",
  children,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button className={`${className}`} {...props}>
      {children}
    </button>
  );
};

export default SignInButton;
