import PanelTicketsMainNavbar from "@/components/panel/tickets/MainNavbar";
import { getPersianDate, parseRelativeDate } from "@/lib/utils";
import { TFilterTicketDate, TSearchParams } from "@/types";
import { DataTable } from "./data-table";
import { Tickets, columns } from "./columns";
import PanelTicketsSearchAndFilter from "@/components/panel/tickets/SearchAndFilterForm";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/types/Auth";
import { TicketStatus, TicketsHeaderType } from "@/data/Tickets";
import PanelPagesLayout from "@/components/panel/PagesLayout";
import { TablePagination } from "@/components/shared/TablePagination";
import { Suspense } from "react";

const getTickets = async ({
  filters,
  token,
}: {
  token: string;
  filters: any;
}): Promise<{
  TotalRow: number;
  Message: string | null;
  Data: Tickets[];
  Error: boolean;
}> => {
  const getTicketsList = await fetch(
    `${process.env.WebUrl}/api/tickets/list/admin`,
    {
      method: "POST",
      next: { revalidate: 60, tags: ["tickets"] },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...filters }),
    }
  );
  if (!getTicketsList.ok) {
    return {
      Data: [],
      Error: true,
      Message: "خطایی رخ داده است",
      TotalRow: 0,
    };
  }
  const res = await getTicketsList.json();
  return res;
};

const PanelTicketsPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const filters = {
    Page: searchParams.page || 1,
    PerPage: 10,
    Title: searchParams.Title,
    Status: TicketStatus[(searchParams.status as TicketsHeaderType) || "All"],
    FromDate: parseRelativeDate(searchParams.FromDate as TFilterTicketDate),
    SortBy: null,
    IsDesc: true,
    TicketCategoryId: searchParams.TicketCategoryId,
  };

  const session = await getServerSession(nextAuthOptions);
  const tickets = await getTickets({
    filters,
    token: session?.user.token || "",
  });

  if (tickets.Error) {
    return <div>خطایی رخ داده است</div>;
  }

  return (
    <PanelPagesLayout
      navbar={<PanelTicketsMainNavbar searchParams={searchParams} />}
    >
      <div>
        <PanelTicketsSearchAndFilter searchParams={searchParams} />
      </div>
      <DataTable columns={columns} data={tickets.Data} />
      {/* pagination */}
      <div>
        <TablePagination
          route="/panel/tickets"
          currentPage={+searchParams.page || 1}
          perPage={10}
          total={tickets.TotalRow}
          searchParams={searchParams}
        />
      </div>
    </PanelPagesLayout>
  );
};

export default PanelTicketsPage;
