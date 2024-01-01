import HomeButton from "@/components/shared/Buttons/HomeButton";
import SectionTitle from "@/components/shared/SectionTitle";
import { DataTable } from "./data-table";
import AuthDialog from "@/components/shared/AuthDialog";
import { AwardsData, columns } from "./columns";

const data: AwardsData[] = [
  {
    CreatedAt: "2023-12-29T16:18:35.7912977Z",
    Id: 32,
    Title: "جایزه بین المللی فیزیک",
    Description:
      "میتونی به سادگی با گوگل، لینکدین یا ایمیل‌های دیگه ثبت نام کنی یا اگر قبلا حساب کاربری داشتی وارد شی",
    Date: "2023-12-29T16:18:35.7912977Z",
    Image: "/Images/awards.png",
  },
  {
    CreatedAt: "2023-12-29T16:18:35.7912977Z",
    Id: 543,
    Title: "جایزه بین المللی فیزیک",
    Description:
      "میتونی به سادگی با گوگل، لینکدین یا ایمیل‌های دیگه ثبت نام کنی یا اگر قبلا حساب کاربری داشتی وارد شی",
    Date: "2023-12-29T16:18:35.7912977Z",
    Image: "/Images/awards.png",
  },
  {
    CreatedAt: "2023-12-29T16:18:35.7912977Z",
    Id: 453,
    Title: "جایزه بین المللی فیزیک",
    Description:
      "میتونی به سادگی با گوگل، لینکدین یا ایمیل‌های دیگه ثبت نام کنی یا اگر قبلا حساب کاربری داشتی وارد شی",
    Date: "2023-12-29T16:18:35.7912977Z",
    Image: "/Images/awards.png",
  },
  {
    CreatedAt: "2023-12-29T16:18:35.7912977Z",
    Id: 1453,
    Title: "جایزه بین المللی فیزیک",
    Description:
      "میتونی به سادگی با گوگل، لینکدین یا ایمیل‌های دیگه ثبت نام کنی یا اگر قبلا حساب کاربری داشتی وارد شی",
    Date: "2023-12-29T16:18:35.7912977Z",
    Image: "/Images/awards.png",
  },
];

const AwardsPage = ({
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
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AwardsPage;
