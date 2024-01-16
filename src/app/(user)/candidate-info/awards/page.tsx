import HomeButton from "@/components/shared/Buttons/HomeButton";
import SectionTitle from "@/components/shared/SectionTitle";
import { DataTable } from "./data-table";
import AuthDialog from "@/components/shared/AuthDialog";
import { AwardsData, columns } from "./columns";
import { TablePagination } from "@/components/shared/TablePagination";

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

const AwardsPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const awards = await getAwards({
    page: +searchParams.page || 1,
  });

  if (awards.Error) {
    return <div>خطایی رخ داده است</div>;
  }
  return (
    <div className="flex flex-col items-stretch">
      <div className="flex flex-col lg:flex-row lg:gap-10">
        {/* title */}
        <div className="flex items-center justify-between">
          <div>
            <SectionTitle title="جوایز و افتخارات" />
          </div>
          {/*  buttons */}
          <div className="flex overflow-hidden lg:hidden gap-2 items-stretch">
            <HomeButton />
            <AuthDialog />
          </div>
        </div>
        <div className="mt-6 lg:mt-0">
          <p className="text-[14px] lg:text-[16px] text-primary-black">
            در جدول زیر افتخارات و جوایزی که دکتر پزشکیان در سالهای اخیر کسب
            کرده‌اند را مشاهده کنید.
          </p>
        </div>
      </div>
      <div className="mt-8 w-full lg:max-w-[1100px] mx-auto">
        <DataTable columns={columns} data={awards.Data} />
        {/* pagination */}
        <div className="mt-4">
          <TablePagination
            route="/candidate-info/awards"
            currentPage={+searchParams.page || 1}
            perPage={10}
            total={awards.TotalRow}
            searchParams={searchParams}
          />
        </div>
      </div>
    </div>
  );
};

export default AwardsPage;
