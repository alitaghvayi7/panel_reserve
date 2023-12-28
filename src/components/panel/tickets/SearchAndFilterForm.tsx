import { baseUrl } from "@/services/main";
import PanelFilterTickets from "./FilterTickets";
import PanelSortTickets from "./SortTickets";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/types/Auth";
import { TFilterTicketDate, TSearchParams } from "@/types";
import { TMenuItem } from "@/types/FilterTickets";
import ActiveSearchFilters from "./ActiveSearchFilters";
import SearchInputForm from "./SearchInputForm";

export const menus: TMenuItem[] = [
  {
    id: 1,
    name: "نوع",
    queryName: "TicketCategoryId",
    children: [],
  },
  {
    id: 2,
    name: "تاریخ",
    queryName: "FromDate",
    children: [
      {
        Id: "today",
        Title: "امروز",
      },
      {
        Id: "lastWeek",
        Title: "هفته اخیر",
      },
      {
        Id: "lastMonth",
        Title: "ماه اخیر",
      },
    ],
  },
  //   {
  //     id: 3,
  //     name: "نوع",
  //     children: [],
  //   },
];

const PanelTicketsSearchAndFilter = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const session = await getServerSession(nextAuthOptions);
  const req = await fetch(`${process.env.WebUrl}/api/categories/all`, {
    method: "GET",
    next: { tags: ["allCategories"] },
  });
  if (!req.ok) {
    return <div>خطایی رخ داده است</div>;
  }
  const res = await req.json();
  menus[0].children = res.Data;

  return (
    <div className="flex flex-col items-stretch gap-4">
      <div className="flex items-center justify-between">
        <div>
          <SearchInputForm />
        </div>
        <div
          key={`${searchParams.status}`}
          className="flex items-stretch gap-2"
        >
          <div>
            <PanelSortTickets />
          </div>
          <div>
            <PanelFilterTickets menus={menus} />
          </div>
        </div>
      </div>
      {/* active search filters */}
      <div>
        <ActiveSearchFilters menus={menus} />
      </div>
    </div>
  );
};

export default PanelTicketsSearchAndFilter;
