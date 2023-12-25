import PanelTicketsMainNavbar from "@/components/panel/tickets/MainNavbar";
import { getPersianDate } from "@/lib/utils";
import { TSearchParams } from "@/types";
import { DataTable } from "./data-table";
import { Tickets, columns } from "./columns";

const data: Tickets[] = [
  {
    id: 13,
    category: {
      id: 1,
      Title: "درد و دل",
    },
    createdAt: "2023-12-25T12:30:07.4926266Z",
    user: {
      family: "محمد",
      id: 3,
      name: "متقی",
    },
  },
  {
    id: 13,
    category: {
      id: 1,
      Title: "درد و دل",
    },
    createdAt: "2023-12-25T12:30:07.4926266Z",
    user: {
      family: "محمد",
      id: 3,
      name: "متقی",
    },
  },
  {
    id: 13,
    category: {
      id: 1,
      Title: "درد و دل",
    },
    createdAt: "2023-12-25T12:30:07.4926266Z",
    user: {
      family: "محمد",
      id: 3,
      name: "متقی",
    },
  },
  {
    id: 13,
    category: {
      id: 1,
      Title: "درد و دل",
    },
    createdAt: "2023-12-25T12:30:07.4926266Z",
    user: {
      family: "محمد",
      id: 3,
      name: "متقی",
    },
  },
];

const PanelTicketsPage = ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const date = getPersianDate();
  const tab = searchParams.tab;
  return (
    <div className="flex flex-col gap-6">
      <header className="border-b border-third-green py-4 flex items-center justify-between relative">
        <div>
          <PanelTicketsMainNavbar searchParams={searchParams} />
        </div>
        <div className="flex items-center gap-2 text-[12px] font-medium text-third-black leading-none">
          <span>تاریخ امروز</span>
          <span>{date}</span>
        </div>
      </header>
      <main>
        <DataTable columns={columns} data={data} />
      </main>
    </div>
  );
};

export default PanelTicketsPage;
