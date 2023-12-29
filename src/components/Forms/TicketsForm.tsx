"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormButton from "../shared/Buttons/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { DELETE_ICON, PAPERCLIP_ICON } from "../assets/SVG/Icons";
import { ReactNode, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TicketResult from "../shared/TickectResult";
import { useSession } from "next-auth/react";
import { SelectSubject } from "../TicketsPage/SelectSubject";
import VoiceRecorder from "../TicketsPage/VoiceRecorder";

const schema = z.object({
  Title: z
    .string()
    .min(1, { message: "وارد کردن این فیلد الزامی است" })
    .max(100, "تعداد کاراکتر وارد شده بیشتر از حد مجاز است"),
  Description: z.string().min(1, { message: "وارد کردن این فیلد الزامی است" }),
});

const TicketForm = ({
  data,
}: {
  data: {
    Id: number;
    Title: string;
    Questions: any[];
    Description: string | null;
  };
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const session = useSession();
  const [files, setFiles] = useState<any[]>([]);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioBlobRef = useRef<Blob | null>(null);
  const filesRef = useRef<null | HTMLInputElement>(null);
  const [title, setTitle] = useState({
    id: 0,
    title: "موضوع",
    subTitle: "",
  });
  const ticketResult = searchParams.get("result");

  const {
    register,
    control,
    handleSubmit,
    setError,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = handleSubmit(async (formData) => {
    const TicketAttachment: any[] = [];
    const formDataObj = new FormData();
    formDataObj.append("TicketCategoryId", `${data.Id}`);
    formDataObj.append("Description", formData.Description);
    formDataObj.append("Title", formData.Title);
    // if (audioBlobRef.current) {
    //   // formData.append("Voice", audioBlobRef.current);
    //   TicketAttachment.push(audioBlobRef.current);
    // }
    files.forEach((file) => {
      //   TicketAttachment.push(file);
      formDataObj.append("TicketAttachment", file);
    });

    // formDataObj.append("TicketAttachment", TicketAttachment);
    const req = await fetch(`/api/tickets/create`, {
      method: "POST",
      next: { revalidate: 0 },
      headers: {
        Authorization:
          session.status === "authenticated"
            ? `Bearer ${session.data?.user.token}`
            : "",
      },
      body: formDataObj,
    });
    if (req.ok) {
      const res = await req.json();
      router.replace(
        `/tickets/${data.Id}?result=success&trackingCode=${res.Data.TrackingCode}`
      );
    } else {
      setError("root", {
        message: "خطایی رخ داده است.",
      });
      router.replace(`/tickets/${data.Id}?result=failed`);
    }
  });

  return (
    <div className={`border-t border-t-secondary-gray relative lg:px-6`}>
      {/* title */}
      <div
        className={`flex items-center justify-center gap-2 whitespace-nowrap absolute -top-[10px] lg:-top-[15px] left-1/2 -translate-x-1/2 bg-white px-8 text-[14px] lg:text-[18px] font-light text-primary-black`}
      >
        ثبت {data.Title}
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
              <InputWithLabel>
                <label
                  className="text-[14px] lg:text-[18px] font-light text-primary-black"
                  htmlFor="Title"
                >
                  عنوان درخواست خود را وارد کنید:
                </label>
                <input
                  id="Title"
                  className="text-[12px] font-light placeholder:text-third-black rounded-lg border px-4 py-2 outline-none min-w-[250px]"
                  type="text"
                  placeholder="عنوان"
                  {...register("Title")}
                />
                <p className="mt-2 text-[10px] text-red-500">
                  {errors.Title?.message?.toString()}
                </p>
              </InputWithLabel>
              {/* <div className="flex flex-col lg:flex-row items-stretch lg:items-center lg:gap-6">
                <SelectSubject setTitle={setTitle} title={title} />
              </div> */}
            </div>
            <div className="flex flex-col items-stretch gap-2">
              <label
                className="text-[14px] lg:text-[18px] font-light text-primary-black"
                htmlFor="Description"
              >
                درخواست خود را وارد کنید.
              </label>
              <div className="">
                <div className="flex flex-col items-stretch rounded-lg border min-h-[200px] pb-4">
                  <textarea
                    id="Description"
                    className="text-[14px] font-light placeholder:text-third-black px-4 pt-2 pb-10 mt-2 outline-none w-full h-full"
                    placeholder="متن درخواست..."
                    {...register("Description")}
                  />
                  <p className="mt-2 text-[10px] text-red-500 px-4">
                    {errors.Description?.message?.toString()}
                  </p>
                  <div className="flex items-start justify-between lg:justify-start gap-2 mt-auto px-4 whitespace-nowrap">
                    <VoiceRecorder
                      mediaRecorder={mediaRecorder}
                      audioBlobRef={audioBlobRef}
                    />
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
                            // console.log(e.target?.files[0]);
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
            {errors.root?.type && (
              <p className="text-[12px] text-red-400">
                {errors.root?.message?.toString()}
              </p>
            )}
            <div className="w-full max-w-[350px] lg:max-w-[250px] mx-auto px-6">
              <FormButton
                className="disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "در حال ارسال..." : "ارسال"}
              </FormButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TicketForm;

const InputWithLabel = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center lg:gap-6">
      {children}
    </div>
  );
};
