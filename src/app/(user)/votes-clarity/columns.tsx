"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type VotesClarity = {
  id: string;
  parliamentCode: string;
  title: string;
  status: VoteStatus;
  date: string;
};

export type VoteStatus = "agreed" | "against" | "abstain";

const persianVoteName = {
  agreed: "موافق",
  against: "مخالف",
  abstain: "ممتنع",
};

export const columns: ColumnDef<VotesClarity>[] = [
  {
    accessorKey: "parliamentCode",
    header: () => (
      <div className="text-right whitespace-nowrap">
        <span className="hidden md:block">کد نماینده</span>
        <div className="md:hidden">مشخصات رای</div>
      </div>
    ),
    cell({ row }) {
      const parliamentCode: string = row.getValue("parliamentCode");
      const date: string = row.getValue("date");
      const status: VoteStatus = row.getValue("status");
      return (
        <div>
          <span className="hidden md:block">{parliamentCode}</span>
          <div className="flex flex-col gap-2 md:hidden">
            <span>{parliamentCode}</span>
            <span>{date}</span>
            <span>{persianVoteName[status]}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: () => <div className="text-right">عنوان رای‌گیری</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="hidden md:block text-right">رای</div>,
    cell({ row }) {
      const vote: VoteStatus = row.getValue("status");
      const voteName = persianVoteName[vote];
      return <div className="hidden p-0 md:block">{voteName}</div>;
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="hidden md:block text-right">تاریخ</div>,
    cell({ row }) {
      return <div className="hidden p-0 md:block">{row.getValue("date")}</div>;
    },
  },
];
