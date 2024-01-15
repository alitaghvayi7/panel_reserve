import { TFilterTicketDate, TSearchParams } from "@/types";
import { DataTable } from "./data-table";

import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/types/Auth";

import PanelPagesLayout from "@/components/panel/PagesLayout";
import { TablePagination } from "@/components/shared/TablePagination";
import AddCvForm from "@/components/Forms/AddCvForm";
import { AwardsData, columns } from "./columns";
import AddAwardForm from "@/components/Forms/AddAwardForm";

const getAwards = async ({
  page,
}: {
  page: number;
}): Promise<{
  TotalRow: number;
  Message: string | null;
  Data: AwardsData[];
  Error: boolean;
}> => {
  const getAwardsList = await fetch(
    `${process.env.WebUrl}/api/awards/getAwards`,
    {
      method: "POST",
      next: {
        tags: ["awards"],
      },
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Page: page,
        PerPage: 10,
        Title: null,
      }),
    }
  );
  if (!getAwardsList.ok) {
    return {
      Data: [],
      Error: true,
      Message: "خطایی رخ داده است",
      TotalRow: 0,
    };
  }
  const res = await getAwardsList.json();
  return res;
};

const PanelAwardsPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const awards = await getAwards({
    page: +searchParams.page || 1,
  });

  if (awards.Error) {
    return <div>خطایی رخ داده است</div>;
  }
  return (
    <PanelPagesLayout
      navbar={"برای بخش جوایز و افتخارات موارد زیر را کامل کنید"}
    >
      {/* form */}
      <div>
        <AddAwardForm />
      </div>
      <div className="w-full border-t my-2"></div>
      {/* table */}
      <div className="flex flex-col items-stretch gap-2">
        <h3>جوایز و افتخارات وارد شده</h3>
        <DataTable columns={columns} data={awards.Data} />
        {/* pagination */}
        <div className="mt-4">
          <TablePagination
            route="/panel/awards"
            currentPage={+searchParams.page || 1}
            perPage={10}
            total={awards.TotalRow}
            searchParams={searchParams}
          />
        </div>
      </div>
    </PanelPagesLayout>
  );
};

export default PanelAwardsPage;
