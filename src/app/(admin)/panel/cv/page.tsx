import { TFilterTicketDate, TSearchParams } from "@/types";
import { DataTable } from "./data-table";

import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/types/Auth";

import PanelPagesLayout from "@/components/panel/PagesLayout";
import { TablePagination } from "@/components/shared/TablePagination";
import AddCvForm from "@/components/Forms/AddCvForm";
import { CVData, columns } from "./columns";

const getCv = async ({
  page,
}: {
  page: number;
}): Promise<{
  TotalRow: number;
  Message: string | null;
  Data: CVData[];
  Error: boolean;
}> => {
  const getCvList = await fetch(`${process.env.WebUrl}/api/cv/getCv`, {
    method: "POST",
    next: {
      tags: ["cv"],
    },
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Page: page,
      PerPage: 10,
      Title: null,
    }),
  });
  if (!getCvList.ok) {
    return {
      Data: [],
      Error: true,
      Message: "خطایی رخ داده است",
      TotalRow: 0,
    };
  }
  const res = await getCvList.json();
  return res;
};

const PanelCvPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const cv = await getCv({
    page: +searchParams.page || 1,
  });

  if (cv.Error) {
    return <div>خطایی رخ داده است</div>;
  }
  return (
    <PanelPagesLayout navbar={"برای بخش رزومه موارد زیر را کامل کنید"}>
      {/* form */}
      <div>
        <AddCvForm />
      </div>
      <div className="w-full border-t my-2"></div>
      {/* table */}
      <div className="flex flex-col items-stretch gap-2">
        <h3>رزومه وارد شده</h3>
        <DataTable columns={columns} data={cv.Data} />
        {/* pagination */}
        <div className="mt-4">
          <TablePagination
            route="/panel/cv"
            currentPage={+searchParams.page || 1}
            perPage={10}
            total={cv.TotalRow}
            searchParams={searchParams}
          />
        </div>
      </div>
    </PanelPagesLayout>
  );
};

export default PanelCvPage;
