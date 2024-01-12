import { TSearchParams } from "@/types";
import { nextAuthOptions } from "@/types/Auth";
import { getServerSession } from "next-auth";
import SearchInputForm from "../tickets/SearchInputForm";
import PanelFilterTickets from "../tickets/FilterTickets";
import ActiveSearchFilters from "../tickets/ActiveSearchFilters";

export const menus = [
  {
    id: 1,
    name: "ادمین",
    queryName: "isAdmin",
    children: [],
  },
];

const PanelUsersSearchAndfilter = async ({
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
          <SearchInputForm placeholder="موضوع" searchUrl="/panel/users" />
        </div>
        <div
          key={`${searchParams.status}`}
          className="flex items-stretch gap-2"
        >
          <div>{/* <PanelSortTickets /> */}</div>
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

export default PanelUsersSearchAndfilter;
