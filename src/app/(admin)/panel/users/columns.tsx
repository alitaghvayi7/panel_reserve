"use client";

import RemoveAdminDialog from "@/components/panel/users/RemoveAdminDialog";
import { convertToPersianNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
  Id: number;
  CreatedAt: string;
  Name: string | null;
  Family: string | null;
  IsMobileVerify: boolean;
  Mobile: string | null;
  IsAdmin: boolean;
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "Id",
    header(props) {
      return <div>شماره</div>;
    },
    cell(props) {
      const userId = props.getValue() as number;
      return <span>{convertToPersianNumber(`${userId}`)}</span>;
    },
  },
  {
    accessorKey: "userName",
    header: "نام و نام خانوادگی",
    cell(props) {
      const family = props.row.original.Family;
      const name = props.row.original.Name;

      return (
        <span>{`${name || ""} ${family || ""}`.trim() || "ثبت نشده"}</span>
      );
    },
  },
  {
    accessorKey: "NationalCode",
    header: "کد ملی",
    cell(props) {
      return (
        <div className="text-[14px] font-light text-primary-black">
          {convertToPersianNumber("0372222222")}
        </div>
      );
    },
  },
  {
    accessorKey: "Mobile",
    header: "شماره تماس",
    cell(props) {
      const cellDate = props.cell.getValue() as string;
      return (
        <div className="text-[14px] font-light text-primary-black text-center">
          {convertToPersianNumber(cellDate || "") || "ثبت نشده"}
        </div>
      );
    },
  },
  {
    accessorKey: "IsAdmin",
    header: "موقعیت",
    cell(props) {
      const isAdmin = props.cell.getValue() as boolean;
      return (
        <div className="text-[14px] font-light text-primary-black text-center">
          {isAdmin ? "ادمین" : "-"}
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
          <RemoveAdminDialog />
        </div>
      );
    },
  },
];
