import { TFilterTicketDate, TSearchParams } from "@/types";
import { DataTable } from "./data-table";
import { Users, columns } from "./columns";
import PanelTicketsSearchAndFilter from "@/components/panel/tickets/SearchAndFilterForm";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/types/Auth";
import PanelPagesLayout from "@/components/panel/PagesLayout";
import { TablePagination } from "@/components/shared/TablePagination";
import Link from "next/link";
import { UserPageHeaderQueries } from "@/types/Users";

const getUsers = async ({
  filters,
  token,
}: {
  token: string;
  filters: any;
}): Promise<{
  TotalRow: number;
  Message: string | null;
  Data: Users[];
  Error: boolean;
}> => {
  const getUsersList = await fetch(
    `${process.env.WebUrl}/api/user/list/admin`,
    {
      method: "POST",
      next: { revalidate: 60, tags: ["usersList"] },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...filters }),
    }
  );
  if (!getUsersList.ok) {
    return {
      Data: [],
      Error: true,
      Message: "خطایی رخ داده است",
      TotalRow: 0,
    };
  }
  const res = await getUsersList.json();
  return res;
};

const PanelUsersPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const filters = {
    Page: +searchParams.page || 1,
    PerPage: 10,
    Title: null,
    Mobile: null,
    FromDate: null,
    ToDate: null,
    IsAdmin: false,
  };
  const session = await getServerSession(nextAuthOptions);
  const users = await getUsers({
    filters,
    token: session?.user.token || "",
  });

  if (users.Error) {
    return <div>خطایی رخ داده است</div>;
  }

  return (
    <PanelPagesLayout
      navbar={<PanelUsersMainNavbar searchParams={searchParams} />}
    >
      <div>
        <PanelTicketsSearchAndFilter searchParams={searchParams} />
      </div>
      <DataTable columns={columns} data={users.Data} />
      {/* pagination */}
      <div>
        <TablePagination
          route="/panel/users"
          currentPage={+searchParams.page || 1}
          perPage={10}
          total={users.TotalRow}
          searchParams={searchParams}
        />
      </div>
    </PanelPagesLayout>
  );
};

export default PanelUsersPage;

type Tab = {
  id: number;
  name: string;
  query: UserPageHeaderQueries;
  pointerPosition: string;
};
const tabs: Tab[] = [
  {
    id: 1,
    name: "کاربران عضو",
    query: "signed-in",
    pointerPosition: "right-[0px] w-[80px]",
  },
  {
    id: 2,
    name: "کاربران مهمان",
    query: "guest",
    pointerPosition: "right-[105px] w-[100px]",
  },
  {
    id: 3,
    name: "کاربران کارشناس",
    query: "expert",
    pointerPosition: "right-[230px] w-[120px]",
  },
];

const PanelUsersMainNavbar = ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const activeTab = searchParams.type || tabs[0].query;

  return (
    <>
      <div
        className={`absolute bottom-[-2px] h-1 rounded-full bg-[rgba(101,218,183,1)] duration-150 transition-all ${
          tabs.find((item) => item.query === activeTab)?.pointerPosition
        }`}
      ></div>
      <div className="flex items-center gap-10">
        {tabs.map((tab) => (
          <Link
            href={`/panel/users?type=${tab.query}`}
            key={tab.id}
            className={`${
              activeTab === tab.query
                ? "text-primary-black font-medium"
                : "text-third-black font-light"
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </>
  );
};
