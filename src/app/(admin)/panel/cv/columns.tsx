"use client";

import RemoveCvDialog from "@/components/panel/cv/RemoveCvDialog";
import { parseDateTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CVData = {
  Id: number;
  Organization: string;
  Post: string;
  Duration: string;
  Description: string;
};

export const columns: ColumnDef<CVData>[] = [
  {
    accessorKey: "Data",
    header: () => (
      <div className="text-right whitespace-nowrap">
        <span className="hidden md:block">نام سازمان</span>
      </div>
    ),
    cell({ row }) {
      const description = row.original.Description;
      const organization = row.original.Organization;
      const post = row.original.Post;
      const duration = row.original.Duration;

      return (
        <div>
          <span className="hidden md:block line-clamp-2 text-[16px] font-light text-primary-black">
            {organization}
          </span>
          <div className="flex flex-col items-stretch gap-2 md:hidden">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-secondary-black">
                نام سازمان:
              </span>
              <span className="text-[10px] font-light text-secondary-black line-clamp-1">
                {organization}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-secondary-black">سمت:</span>
              <span className="text-[10px] font-light text-secondary-black line-clamp-1">
                {post}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-secondary-black">مدت کار:</span>
              <div className="flex items-center gap-1 text-[10px] font-light text-secondary-black line-clamp-1">
                {duration}
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[10px] text-secondary-black">
                دستاوردها:
              </span>
              <p className="text-[10px] font-light text-secondary-black line-clamp-4">
                {description}
              </p>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "Post",
    header: () => (
      <div className="text-right">
        <span>سمت</span>
      </div>
    ),
    cell(props) {
      const post = props.cell.getValue() as string;
      return (
        <div>
          <span>{post}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "Description",
    header: () => <div className="hidden md:block text-right">دستاوردها</div>,
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
    accessorKey: "Duration",
    header: () => <div className="hidden md:block text-right">مدت کار</div>,
    cell({ row, cell }) {
      const duration = cell.getValue() as string;
      return (
        <div className="hidden p-0 md:block text-[16px] font-light text-primary-black">
          <div className="flex items-center">{duration}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => {
      return <div className="text-right">بیشتر</div>;
    },
    cell(props) {
      // console.log(props.row.original);
      return (
        <div className="flex items-center justify-center gap-2">
          <RemoveCvDialog
            duration={props.row.original.Duration}
            id={props.row.original.Id}
            post={props.row.original.Post}
            title={props.row.original.Organization}
          />
        </div>
      );
    },
  },
];
