import PayCheck from "@/components/WealthPage/PayCheck";
import SelectMonth from "@/components/WealthPage/SelectMonth";

import AuthDialog from "@/components/shared/AuthDialog";
import HomeButton from "@/components/shared/Buttons/HomeButton";
import SectionTitle from "@/components/shared/SectionTitle";

const WealthPage = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  return (
    <div className="flex flex-col items-stretch lg:mt-10 gap-8">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-20">
        {/* title */}
        <div className="flex items-center justify-between">
          <div>
            <SectionTitle title="شفافیت اموال" />
          </div>
          {/*  buttons */}
          <div className="flex overflow-hidden lg:hidden gap-2 items-stretch">
            <HomeButton />
            <AuthDialog />
          </div>
        </div>
      </div>
      {/* main content */}
      <main className="flex flex-col items-stretch gap-12">
        <div className="flex flex-col items-stretch gap-6">
          <p>
            برای دیدن فیش حقوقی ماه های پیش دکتر پزشکیان از گزینه زیر اقدام
            کنید.
          </p>
          <div>
            <SelectMonth />
          </div>
        </div>
        <div>
          {searchParams.month ? (
            +searchParams.month > 0 && +searchParams.month < 13 ? (
              <PayCheck month={+searchParams.month} />
            ) : (
              <div>ماه مورد نظر یافت نشد</div>
            )
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default WealthPage;
