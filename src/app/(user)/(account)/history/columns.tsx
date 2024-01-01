"use client";

import { parseDateTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TicketsHistory = {
  CreatedAt: string;
  Id: number;
  Status: number;
  TicketCategory: {
    Title: string;
    Id: number;
  };
  User: {
    Id: number;
    Name: string | null;
    Family: string | null;
    Mobile: string | null;
    NationalCode: string | null;
  };
  Title: string;
  TrackingCode: number;
  Description: string;
};

export const columns: ColumnDef<TicketsHistory>[] = [
  {
    accessorKey: "ticketData",
    header: () => (
      <div className="text-right whitespace-nowrap">
        <span className="hidden md:block">متن پیام</span>
        <div className="md:hidden">مشخصات پیام</div>
      </div>
    ),
    cell({ row }) {
      const description = row.original.Description;
      const title = row.original.Title;
      const category = row.original.TicketCategory.Title;
      const date = row.original.CreatedAt;
      const trackingCode = row.original.TrackingCode;
      return (
        <div>
          <span className="hidden md:block md:min-w-[250px] line-clamp-4">
            {description}
          </span>
          <div className="flex flex-col items-stretch gap-2 md:hidden">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-secondary-black">عنوان:</span>
              <span className="text-[10px] font-light text-secondary-black line-clamp-1">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-secondary-black">نوع:</span>
              <span className="text-[10px] font-light text-secondary-black line-clamp-1">
                {category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-secondary-black">
                تاریخ ارسال:
              </span>
              <span className="text-[10px] font-light text-secondary-black">
                {parseDateTime(date).dateString}
              </span>
            </div>
            <div className="flex items-center">
              <Link
                className="text-[10px] font-light text-primary-black w-full text-center bg-[rgba(189,239,224,0.3)] rounded-lg py-1"
                href={`/follow-up-cases?code=${trackingCode}`}
              >
                پیگیری درخواست
              </Link>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => (
      <div className="text-right">
        <span className="hidden md:block">نوع</span>
        <span className="md:hidden">متن پیام</span>
      </div>
    ),
    cell(props) {
      const description = props.row.original.Description as string;
      const category = props.row.original.TicketCategory.Title as string;
      return (
        <div>
          <span className="md:hidden line-clamp-4 text-[12px] font-light text-secondary-black">
            {description}
          </span>
          <p className="hidden md:block text-[14px] font-light text-primary-black">
            {category}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "CreatedAt",
    header: () => <div className="hidden md:block text-right">تاریخ ارسال</div>,
    cell({ row, cell }) {
      const date = cell.getValue() as string;
      return (
        <div className="hidden p-0 md:block text-[14px] font-light text-primary-black">
          {parseDateTime(date).dateString}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="hidden md:block text-right">بیشتر</div>,
    cell({ row }) {
      const trackingCode = row.original.TrackingCode;
      return (
        <div className="hidden md:flex items-center justify-center overflow-hidden">
          <Link
            className="text-[14px] font-light text-primary-black w-full text-center bg-[rgba(189,239,224,0.3)] rounded-lg py-2 px-4 "
            href={`/follow-up-cases?code=${trackingCode}`}
          >
            پیگیری درخواست
          </Link>
        </div>
      );
    },
  },
];
