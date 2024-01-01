"use client";

import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { EDIT_ICON } from "@/components/assets/SVG/Icons";
import FormButton from "@/components/shared/Buttons/FormButton";
import { useFormTypeStore } from "@/hooks/main-dialog-store";
import { X } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";

const otpLength = 4;

const ConfirmOTPForm = () => {
  const route = usePathname();
  const otpBoxReference = useRef<null | HTMLInputElement>(null);
  const submitButtonRef = useRef<null | HTMLButtonElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const [activeInput, setActiveInput] = useState(0);
  const [setFormType, additionalData] = useFormTypeStore((state) => [
    state.setFormType,
    state.additionalData,
  ]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!additionalData?.phoneNumber)
      return setFormType({
        formType: "normal",
      });
    if (additionalData.phoneNumber && otp.join("").length === 4) {
      const req = await fetch(`/api/login/otp/verify`, {
        method: "POST",
        next: { revalidate: 0 },
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: additionalData.phoneNumber,
          otp: otp.join(""),
        }),
      });
      const res = await req.json();
      if (req.ok) {
        await signIn(
          "LoginWithOTP",
          { callbackUrl: route },
          {
            Token: res.Data.Token,
          }
        );
      } else {
        if (req.status === 422) {
          setError("کد وارد شده صحیح نمی‌باشد.");
        } else if (req.status === 429) {
          setError("کد وارد شده منقضی شده است. لطفا مجدد درخواست دهید");
        }
      }
    }
    setLoading(false);
  };

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 4) {
      const newValue = value.substring(0, 4).split("");
      setActiveInput(newValue.length - 1);
      setOtp(newValue);
    } else if (value.length >= 1) {
      setOtp((prev) => {
        prev[activeInput] = value[0];
        return [...prev];
      });
      setActiveInput((prev) => {
        if (prev === otpLength - 1) return prev;
        return prev + 1;
      });
    }
    // else if (value.length === 0) {
    //   setOtp((prev) => {
    //     prev[activeInput] = "";
    //     return [...prev];
    //   });
    //   setActiveInput((prev) => {
    //     if (prev === 0) return prev;
    //     return prev - 1;
    //   });
    // }
    // console.log(e.target.value);
  };
  useEffect(() => {
    const otpLentgth = otp.join("").trim().length;
    if (otpLentgth === 4) {
      submitButtonRef.current?.focus();
    }
  }, [otp]);
  useEffect(() => {
    if (otpBoxReference.current) {
      otpBoxReference.current?.focus();
    }
  }, [activeInput]);
  return (
    <>
      <DialogHeader className="flex flex-row items-center justify-between space-y-0">
        <DialogTitle className="font-bold text-[10px] lg:text-[14px] leading-[18px]">
          کد اعتبار سنجی را وارد کنید.
        </DialogTitle>
        <DialogClose
          onClick={() => {
            setTimeout(() => {
              setFormType({
                formType: "normal",
                additionalData: {},
              });
            }, 1000);
          }}
          className="rounded-full p-[6px] lg:p-2 bg-[rgba(237,235,250,1)] mt-0"
        >
          <X className="h-4 w-4 lg:h-4 lg:w-4 text-third-black" />
        </DialogClose>
      </DialogHeader>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <span className="w-[22px] h-[16px]">
            <EDIT_ICON />
          </span>
          <button
            onClick={() => {
              setFormType({
                formType: "normal",
              });
            }}
            className="text-[14px] leading-4 text-third-black border-b border-b-third-black"
          >
            ویرایش شماره تماس
          </button>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="w-full flex flex-col gap-4 px-6 mt-6 max-w-[400px] mx-auto"
        >
          <div dir="ltr" className="flex items-center justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                onKeyUp={(e) => {
                  e.stopPropagation();
                  if (e.key === "Backspace" && index === activeInput) {
                    setOtp((prev) => {
                      prev[index] = "";
                      console.log([...prev]);
                      return [...prev];
                    });
                    setActiveInput((prev) => {
                      if (prev === 0) return prev;
                      return prev - 1;
                    });
                  }
                }}
                ref={activeInput === index ? otpBoxReference : null}
                type="number"
                value={otp[index]}
                className="rounded-md lg:rounded-lg border max-w-[45px] lg:max-w-[60px] aspect-square flex-1 h-full outline-none text-center"
                onChange={handleOnChangeInput}
              />
            ))}
          </div>
          <p className="text-[10px] lg:text-[12px] text-red-400">{error}</p>
          <FormButton
            disabled={loading}
            ref={submitButtonRef}
            type="submit"
            className="disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "در حال ارسال..." : "ورود"}
          </FormButton>
        </form>
      </div>
    </>
  );
};

export default ConfirmOTPForm;
