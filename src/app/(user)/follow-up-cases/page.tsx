import FollowUpCasesChatBox from "@/components/FollowUpCases/ChatBox";
import FollowUpCasesSearchForm from "@/components/Forms/FollowUpCasesSearchForm";
import HomeButton from "@/components/shared/Buttons/HomeButton";
import SectionTitle from "@/components/shared/SectionTitle";
import { Metadata } from "next";

const FollowUpCases = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const followUpCode = +searchParams.code;

  return (
    <div className="flex flex-col items-stretch lg:mt-10">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-20">
        {/* title */}
        <div className="flex items-center justify-between">
          <div>
            <SectionTitle title="پیگیری درخواست‌ها و شکایات" />
          </div>
          <div className="lg:hidden">
            <HomeButton />
          </div>
        </div>
        {/* form */}
        <div className="flex flex-col items-stretch gap-6">
          <p className="text-[14px] text-primary-black lg:text-[16px]">
            لطفا کد ارسال شده به شماره همراه خود را وارد کنید تا از وضعیت
            درخواست یا شکایت خود با خبر شوید.
          </p>
          <FollowUpCasesSearchForm />
        </div>
      </div>
      {followUpCode ? (
        <div className="mt-16">
          <FollowUpCasesChatBox data={{ code: followUpCode }} />
        </div>
      ) : null}
    </div>
  );
};

export default FollowUpCases;
