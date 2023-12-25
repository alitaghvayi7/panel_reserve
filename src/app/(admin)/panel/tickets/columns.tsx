"use client";

import { parseDateTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Tickets = {
  id: number;
  user: {
    id: number;
    name: string;
    family: string;
  };
  //   description: string;
  //   to: string;
  category: {
    Title: string;
    id: number;
  };
  createdAt: string;
};

export const columns: ColumnDef<Tickets>[] = [
  {
    accessorKey: "user",
    header(props) {
      return <div>درخواست دهنده</div>;
    },
    cell(props) {
      const user = props.getValue() as {
        id: number;
        name: string;
        family: string;
      };
      return (
        <div className="flex flex-col">
          <span>{user.id}</span>
          <span>
            {user.family} {user.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "متن پیام",
    cell(props) {
      return (
        <div className="line-clamp-2 max-w-[400px]">
          در قسمت پشتی طراحی جالبی برای قرار گیری سه سنسور دوربین این گوشی
          هوشمند در نظر گرفته شده است. حاشیه‌ متفاوت در نظر گرفته شده برای سنسور
          دوربین اصلی قدرتمند هم، این سنسور را از ما‌بقی سنسور‌ها متمایز کرده
          است. وزن ۲۰۴ گرمی این گوشی شاید به نسبت بسیاری از گوشی‌های میان‌رده
          دیگر وزن سنگین‌تری باشد
        </div>
      );
    },
  },
  {
    accessorKey: "to",
    header: "خطاب",
    cell(props) {
      return <div>{"وزیر آموزش وپرورش"}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "نوع",
    cell(props) {
      const cetegory = props.cell.getValue() as {
        id: number;
        Title: string;
      };
      return <div>{cetegory.Title}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ آخرین فعالیت",
    cell(props) {
      const cellDate = props.cell.getValue() as string;
      return <div>{parseDateTime(cellDate).dateString}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "بیشتر",
    cell(props) {
      return (
        <div className="flex gap-2">
          <div>delete</div>
          <div>edit</div>
        </div>
      );
    },
  },
];
