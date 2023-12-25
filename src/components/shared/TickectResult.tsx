"use client";

import { useSearchParams } from "next/navigation";
import FormButton from "./Buttons/FormButton";
import { SUCCESS_ICON } from "../assets/SVG/Icons";
import Link from "next/link";

const TicketResult = () => {
  const searchParams = useSearchParams();
  const result = searchParams.get("result");
  const trackingCode = searchParams.get("trackingCode");
  return (
    <div className="flex flex-col gap-8 max-w-[300px] mx-auto">
      <div className="flex flex-col items-center gap-4 leading-none">
        {result === "success" ? (
          <div className="w-[33px] h-[33px] mb-2">
            <SUCCESS_ICON />
          </div>
        ) : (
          <div className="w-[33px] lg:w-[40px] h-[33px] lg:h-[40px] select-none mb-2 rounded-full text-white bg-red-500 flex items-center justify-center">
            <span className="leading-none text-[14px] lg:text-[18px] lg:pt-1 font-bold">
              X
            </span>
          </div>
        )}
        {result === "success" ? (
          <div className="text-[14px] lg:text-[20px] font-medium text-primary-black">
            درخواست شما با موفقیت ثبت شد
          </div>
        ) : (
          <div className="text-[14px] lg:text-[20px] font-medium text-primary-black">
            درخواست شما با شکست مواجه شد
          </div>
        )}
        {result === "success" ? (
          <>
            <div className="text-[14px] lg:text-[20px] font-medium text-primary-black flex items-center gap-2">
              <span>شماره پیگیری:</span>
              <span>{trackingCode}</span>
            </div>
            <p className="text-[10px] lg:text-[12px] font-light text-primary-black">
              جهت پیگیری درخواست، شماره پیگیری را نزد خود نگه دارید.
            </p>
          </>
        ) : (
          <p className="text-[12px] lg:text-[14px] text-primary-black">
            لطفاً در زمان دیگری تلاش فرمائید
          </p>
        )}
      </div>
      <Link href={`/`}>
        <FormButton>بازگشت به خانه</FormButton>
      </Link>
    </div>
  );
};

export default TicketResult;
