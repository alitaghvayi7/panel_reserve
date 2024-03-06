import HomeButton from "@/components/shared/Buttons/HomeButton";
import SectionTitle from "@/components/shared/SectionTitle";
import { DataTable } from "./data-table";
import AuthDialog from "@/components/shared/AuthDialog";
import { CVData, columns } from "./columns";
import { TSearchParams } from "@/types";
import { TablePagination } from "@/components/shared/TablePagination";

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

const CVPage = async ({ searchParams }: { searchParams: TSearchParams }) => {
  // console.log(searchParams);
  const cv = await getCv({
    page: +searchParams.page || 1,
  });

  if (cv.Error) {
    return <div>خطایی رخ داده است</div>;
  }

  return (
    <div className="flex flex-col items-stretch">
      <div className="flex flex-col lg:flex-row lg:gap-10">
        {/* title */}
        <div className="flex items-center justify-between">
          <div>
            <SectionTitle title="رزومه" />
          </div>
        </div>
        <div className="mt-6 lg:mt-0">
          <p className="text-[14px] lg:text-[16px] text-primary-black">
            در جدول زیر می‌توانید محل و مدت خدمت دکتر پزشکیان را در سال‌های اخیر
            مشاهده کنید.
          </p>
        </div>
      </div>
      <div className="mt-8 w-full lg:max-w-[1100px] mx-auto">
        <DataTable columns={columns} data={cv.Data} />
      </div>
      {/* pagination */}
      <div className="mt-4">
        <TablePagination
          route="/candidate-info/cv"
          currentPage={+searchParams.page || 1}
          perPage={10}
          total={cv.TotalRow}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
};

export default CVPage;
