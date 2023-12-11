"use client";

import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/UI/dialog";
import { EDIT_ICON } from "@/components/assets/SVG/Icons";
import FormButton from "@/components/shared/Buttons/FormButton";
import { useFormTypeStore } from "@/hooks/main-dialog-store";
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

const otpSchema = z.array(z.string().length(1));
const otpLength = 4;
const ConfirmOTPForm = () => {
  const otpBoxReference = useRef<null | HTMLInputElement>(null);
  const submitButtonRef = useRef<null | HTMLButtonElement>(null);
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const [activeInput, setActiveInput] = useState(0);
  const setFormType = useFormTypeStore((state) => state.setFormType);
  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(otpSchema),
  });
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length >= 4) {
      const newValue = value.substring(0, 4).split("");
      setActiveInput(newValue.length - 1);
      setOtp(newValue);
    } else if (value.length === 0) {
      setOtp((prev) => {
        prev[activeInput] = "";
        return [...prev];
      });
      setActiveInput((prev) => {
        if (prev === 0) return prev;
        return prev - 1;
      });
    } else if (value.length === 1) {
      setOtp((prev) => {
        prev[activeInput] = value[0];
        return [...prev];
      });
      setActiveInput((prev) => {
        if (prev === otpLength - 1) return prev;
        return prev + 1;
      });
    }
    console.log(e.target.value);
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
                formType: "confirmOTP",
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
          className="w-full flex flex-col gap-4 px-6 mt-6"
        >
          <div dir="ltr" className="flex items-center justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={activeInput === index ? otpBoxReference : null}
                type="number"
                value={otp[index]}
                className="rounded-lg border w-[80px] h-[50px] outline-none text-center"
                onChange={handleOnChangeInput}
              />
            ))}
          </div>
          <FormButton ref={submitButtonRef} type="submit" className="">
            ورود
          </FormButton>
        </form>
      </div>
    </>
  );
};

export default ConfirmOTPForm;
