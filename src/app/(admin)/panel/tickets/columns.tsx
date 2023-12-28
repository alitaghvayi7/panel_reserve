"use client";

import {
  ID_CARD_ICON,
  PEN_ICON,
  PHONE_ICON,
} from "@/components/assets/SVG/Icons";
import { convertToPersianNumber, parseDateTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Tickets = {
  Id: number;
  User: UserInfo;
  Title: string;
  TrackingCode: number;
  Description: string;
  //   description: string;
  //   to: string;
  TicketCategory: {
    Title: string;
    Id: number;
  };
  CreatedAt: string;
};

export type UserInfo = {
  Id: number;
  Name: null | string;
  Family: null | string;
  Mobile: string;
  NationalCode: null | string;
};

export const columns: ColumnDef<Tickets>[] = [
  {
    accessorKey: "User",
    header(props) {
      return <div>درخواست دهنده</div>;
    },
    cell(props) {
      const user = props.getValue() as UserInfo;
      return (
        <div className="flex flex-col leading-none gap-2">
          <div className="text-[14px] font-light text-primary-black">
            {`${user?.Family || ""} ${user?.Name || ""}`.trim() || "بدون نام"}
          </div>
          <div className="flex items-center gap-2">
            <span className="p-[1px] border-[1px] border-[#CCCCCC] rounded-[4px]">
              <PHONE_ICON
                style={{
                  width: "12px",
                  height: "12px",
                }}
                className="rotate-[-45deg]"
              />
            </span>
            <span className="flex items-center justify-center pt-1 text-[12px] font-light text-third-black">
              {convertToPersianNumber(user?.Mobile || "") || "ثبت نشده"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="">
              <ID_CARD_ICON
                style={{
                  width: "16px",
                  height: "12px",
                }}
                className=""
              />
            </span>
            <span className="flex items-center justify-center text-[12px] font-light text-third-black">
              {convertToPersianNumber(user?.NationalCode || "") || "ثبت نشده"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "Description",
    header: "متن پیام",
    cell(props) {
      const description = props.getValue() as string;

      return (
        <p className="text-[14px] font-light text-primary-black line-clamp-2 min-w-[400px] max-w-[500px]">
          {description}
        </p>
      );
    },
  },
  // {
  //   accessorKey: "to",
  //   header: "خطاب",
  //   cell(props) {
  //     return <div>{"وزیر آموزش وپرورش"}</div>;
  //   },
  // },
  {
    accessorKey: "TicketCategory",
    header: "نوع",
    cell(props) {
      const cetegory = props.cell.getValue() as {
        Id: number;
        Title: string;
      };
      return (
        <div className="text-[14px] font-light text-primary-black">
          {cetegory.Title}
        </div>
      );
    },
  },
  {
    accessorKey: "CreatedAt",
    header: "تاریخ آخرین فعالیت",
    cell(props) {
      const cellDate = props.cell.getValue() as string;
      return (
        <div className="text-[14px] font-light text-primary-black text-center">
          {parseDateTime(cellDate).dateString}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "بیشتر",
    cell(props) {
      // console.log(props.row.original);
      return (
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/panel/tickets/${props.row.original.Id}`}
            title="ارسال پاسخ"
          >
            <div className="flex items-center justify-center p-2 bg-[rgba(234,232,247,1)] rounded-[2px]">
              <PEN_ICON
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </div>
          </Link>
        </div>
      );
    },
  },
];
