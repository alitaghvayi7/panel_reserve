import FollowUpCasesChatBox from "@/components/FollowUpCasesPage/ChatBox";
import FollowUpCasesSearchForm from "@/components/Forms/FollowUpCasesSearchForm";
import AuthDialog from "@/components/shared/AuthDialog";
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
    <div className="flex flex-col items-stretch lg:mt-10 max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-20">
        {/* title */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <SectionTitle title="پیگیری درخواست‌ها و شکایات" />
          </div>
          {/*  buttons */}
          <div className="flex overflow-hidden lg:hidden gap-2 items-stretch">
            <HomeButton />
            <AuthDialog />
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
