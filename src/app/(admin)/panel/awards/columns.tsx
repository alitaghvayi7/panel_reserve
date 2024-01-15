"use client";

import { parseDateTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AwardsData = {
  Id: number;
  Title: string;
  Description: string;
  CreatedAt: string;
  Date: string;
  Image: string;
};

export const columns: ColumnDef<AwardsData>[] = [
  {
    accessorKey: "Data",
    header: () => (
      <div className="text-right whitespace-nowrap">
        <span className="hidden md:block">عنوان</span>
        <div className="md:hidden">جوایز و افتخارات</div>
      </div>
    ),
    cell({ row }) {
      const description = row.original.Description;
      const title = row.original.Title;
      const date = row.original.CreatedAt;
      const image = row.original.Image;

      return (
        <div>
          <span className="hidden md:block line-clamp-2 text-[16px] font-light text-primary-black">
            {title}
          </span>
          <div className="flex flex-col items-stretch gap-2 md:hidden">
            <div className="flex items-center self-center">
              <div className="relative w-[80px] h-[80px] overflow-hidden rounded-lg">
                <Image src={image} alt="" fill />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-secondary-black">عنوان:</span>
              <span className="text-[10px] font-light text-secondary-black line-clamp-1">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-secondary-black">تاریخچه:</span>
              <span className="text-[10px] font-light text-secondary-black line-clamp-1">
                {parseDateTime(date).dateString}
              </span>
            </div>
            <div className="flex items-center text-[10px] font-light text-secondary-black">
              <p>{description}</p>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "Image",
    header: () => (
      <div className="text-right">
        <span>عکس</span>
      </div>
    ),
    cell(props) {
      const image = props.cell.getValue() as string;
      return (
        <div>
          <div className="relative w-[64px] h-[64px] overflow-hidden rounded-lg">
            <Image src={image} alt="" fill />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "Description",
    header: () => <div className="hidden md:block text-right">متن</div>,
    cell({ cell }) {
      const description = cell.getValue() as string;

      return (
        <div className="hidden md:block min-w-[250px] line-clamp-4 text-[16px] font-light text-secondary-black">
          <p>{description}</p>
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
        <div className="hidden p-0 md:block text-[16px] font-light text-primary-black">
          {parseDateTime(date).dateString}
        </div>
      );
    },
  },
];
