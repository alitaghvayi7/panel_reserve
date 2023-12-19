"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormButton from "../shared/Buttons/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { DELETE_ICON, PAPERCLIP_ICON } from "../assets/SVG/Icons";
import { useRef, useState } from "react";

import { SelectSubject } from "./SelectSubject";
import VoiceRecorder from "./VoiceRecorder";
import { useSearchParams } from "next/navigation";
import TicketResult from "../shared/TickectResult";

const schema = z.object({
  defendent: z
    .string()
    .min(1, { message: "وارد کردن این فیلد الزامی است" })
    .max(100, "تعداد کاراکتر وارد شده بیشتر از حد مجاز است"),
  // subject: z.object({
  //   id: z.number(),
  //   title: z.string().min(1, {
  //     message: "وارد کردن این فیلد الزامی است",
  //   }),
  //   subTitle: z.string(),
  // }),
  description: z.string().min(1, { message: "وارد کردن این فیلد الزامی است" }),
});

const Shekayat = () => {
  const searchParams = useSearchParams();
  const [files, setFiles] = useState<any[]>([]);
  const {
    register,
    control,
    handleSubmit,
    setError,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("defendent", data.defendent);
    formData.append("description", data.description);
    formData.append("subject", JSON.stringify(title));
    files.forEach((file) => {
      formData.append(file.name, file);
    });
    const req = await fetch(`/api/test`, {
      method: "POST",
      body: formData,
    });
    const res = await req.json();
    console.log(res);
    // console.log(formData);
  });
  const filesRef = useRef<null | HTMLInputElement>(null);

  const [title, setTitle] = useState({
    id: 0,
    title: "موضوع",
    subTitle: "",
  });
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const ticketResult = searchParams.get("result");
  return (
    <div className={`border-t border-t-secondary-gray relative lg:px-6`}>
      {/* title */}
      <div
        className={`flex items-center justify-center gap-2 whitespace-nowrap absolute -top-[10px] lg:-top-[15px] left-1/2 -translate-x-1/2 bg-white px-8 text-[14px] lg:text-[18px] font-light text-primary-black`}
      >
        ثبت شکایات
      </div>
      {/* form */}
      <div className="mt-8 lg:mt-16 mx-auto lg:max-w-[700px]">
        {ticketResult === "success" || ticketResult === "failed" ? (
          <TicketResult />
        ) : (
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-stretch gap-4 w-full"
          >
            <div className="flex flex-col items-stretch gap-4 mx-auto">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center lg:gap-6">
                <label
                  className="text-[14px] lg:text-[18px] font-light text-primary-black"
                  htmlFor="defendent"
                >
                  از چه سازمان یا فردی شکایت دارید؟
                </label>
                <input
                  id="defendent"
                  className="text-[12px] font-light placeholder:text-third-black rounded-lg border px-4 py-2 mt-2 outline-none min-w-[250px]"
                  type="text"
                  placeholder="وارد کنید"
                  {...register("defendent")}
                />
                <p className="mt-2 text-[10px] text-red-500">
                  {errors.defendent?.message?.toString()}
                </p>
              </div>
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center lg:gap-6">
                <SelectSubject setTitle={setTitle} title={title} />
                {/* <p className="mt-2 text-[10px] text-red-500">
               {errors.subject?.message?.toString()}
             </p> */}
              </div>
            </div>
            <div className="flex flex-col items-stretch gap-2">
              <label
                className="text-[14px] lg:text-[18px] font-light text-primary-black"
                htmlFor="description"
              >
                درخواست خود را وارد کنید.
              </label>
              <div className="">
                <div className="flex flex-col items-stretch rounded-lg border min-h-[200px] pb-4">
                  <textarea
                    id="description"
                    className="text-[14px] font-light placeholder:text-third-black px-4 pt-2 pb-10 mt-2 outline-none w-full h-full"
                    placeholder="متن درخواست..."
                    {...register("description")}
                  />
                  <p className="mt-2 text-[10px] text-red-500 px-4">
                    {errors.description?.message?.toString()}
                  </p>
                  <div className="flex items-start justify-between lg:justify-start gap-2 mt-auto px-4 whitespace-nowrap">
                    <VoiceRecorder mediaRecorder={mediaRecorder} />
                    <div className="flex flex-col items-stretch gap-2 cursor-pointer">
                      <div
                        onClick={() => {
                          filesRef.current?.click();
                        }}
                        className="flex items-center gap-2 rounded-sm bg-primary-gray px-4 py-2"
                      >
                        <input
                          type="file"
                          multiple
                          ref={filesRef}
                          className="hidden"
                          onChange={(e) => {
                            if (!e.target.files) return;
                            setFiles(Array.from(e.target.files));
                          }}
                        />
                        <span className="rounded-full p-2 bg-third-green">
                          <PAPERCLIP_ICON
                            fill="#114737"
                            style={{
                              width: "16px",
                              height: "16px",
                            }}
                          />
                        </span>
                        <span className="text-[12px] font-light text-[rgba(17,71,55,1)] whitespace-nowrap">
                          ارسال عکس و فیلم
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        {files.map((item) => {
                          return (
                            <div
                              key={item.name}
                              className="flex items-center gap-2 w-full max-w-[170px] rounded-sm bg-primary-gray px-4 py-2"
                            >
                              <span className="rounded-full p-2 bg-third-green">
                                <PAPERCLIP_ICON
                                  fill="#114737"
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                  }}
                                />
                              </span>
                              <span className="text-[12px] font-light text-[rgba(17,71,55,1)] line-clamp-1">
                                {item.name}
                              </span>
                              <span
                                onClick={() => {
                                  setFiles((prev) => {
                                    return prev.filter(
                                      (file) => file.name !== item.name
                                    );
                                  });
                                }}
                                className="w-[16px] min-w-[16px] h-[16px] min-h-[16px] cursor-pointer"
                              >
                                <DELETE_ICON />
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[350px] lg:max-w-[200px] mx-auto px-6">
              <FormButton type="submit">ارسال</FormButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Shekayat;
