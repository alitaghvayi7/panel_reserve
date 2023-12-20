import SuggestionsPageMainSelectBox from "@/components/TicketsPage/MainSelectBox";
import AuthDialog from "@/components/shared/AuthDialog";
import HomeButton from "@/components/shared/Buttons/HomeButton";
import SectionTitle from "@/components/shared/SectionTitle";
import { suggestionsType } from "@/data/SuggestionsType";
import { redirect } from "next/navigation";

const TicketsPage = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const formType = searchParams.form;

  return (
    <div className="flex flex-col items-stretch lg:mt-10 lg:max-w-[1400px] lg:mx-auto">
      <div className="flex flex-col gap-10 lg:gap-20">
        <div className="flex flex-col lg:items-start lg:flex-row gap-6 lg:gap-[5rem]">
          {/* title */}
          <div className="flex items-center justify-between gap-6">
            <div>
              <SectionTitle title="پیشنهادات و انتقادات" />
            </div>
            {/*  buttons */}
            <div className="flex overflow-hidden lg:hidden gap-4 items-stretch">
              <HomeButton />
              <AuthDialog />
            </div>
          </div>
          <div className="flex flex-col items-stretch gap-2">
            <div className="text-[14px] lg:text-[16px] text-primary-black">
              لطفاً نوع درخواست خود را وارد نمائید.
            </div>
            <div>
              <SuggestionsPageMainSelectBox />
            </div>
          </div>
        </div>
        <div className="mt-4">
          {formType &&
            suggestionsType.find((item) => item.link === formType)?.component}
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
