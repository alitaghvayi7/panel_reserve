import HomeButton from "@/components/shared/Buttons/HomeButton";
import SectionTitle from "@/components/shared/SectionTitle";
import { DataTable } from "./data-table";
import AuthDialog from "@/components/shared/AuthDialog";
import { CVData, columns } from "./columns";

const data: CVData[] = [
  {
    Id: 32,
    Organization: "ورزات فرهنگ و ارشاد",
    Description:
      "میتونی به سادگی با گوگل، لینکدین یا ایمیل‌های دیگه ثبت نام کنی یا اگر قبلا حساب کاربری داشتی وارد شی",
    From: "2020-10-25",
    To: "2023-10-25",
    Post: "قاضی",
  },
  {
    Id: 354,
    Organization: "ورزات فرهنگ و ارشاد",
    Description:
      "میتونی به سادگی با گوگل، لینکدین یا ایمیل‌های دیگه ثبت نام کنی یا اگر قبلا حساب کاربری داشتی وارد شی",
    From: "2020-10-25",
    To: "2023-10-25",
    Post: "قاضی",
  },
  {
    Id: 7842,
    Organization: "ورزات فرهنگ و ارشاد",
    Description:
      "میتونی به سادگی با گوگل، لینکدین یا ایمیل‌های دیگه ثبت نام کنی یا اگر قبلا حساب کاربری داشتی وارد شی",
    From: "2020-10-25",
    To: "2023-10-25",
    Post: "قاضی",
  },
];

const CVPage = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  // console.log(searchParams);
  return (
    <div className="flex flex-col items-stretch">
      <div className="flex flex-col lg:flex-row lg:gap-10">
        {/* title */}
        <div className="flex items-center justify-between">
          <div>
            <SectionTitle title="رزومه" />
          </div>
          {/*  buttons */}
          <div className="flex overflow-hidden lg:hidden gap-2 items-stretch">
            <HomeButton />
            <AuthDialog />
          </div>
        </div>
        <div className="mt-6 lg:mt-0">
          <p className="text-[14px] lg:text-[16px] text-primary-black">
            در جدول زیر میتوانیدمحل و مدت خدمت دکتر پزشکیان را در سالهای اخیر
            مشاهده کنید.
          </p>
        </div>
      </div>
      <div className="mt-8 w-full lg:max-w-[1100px] mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default CVPage;
