import SuggestionsPageMainSelectBox from "@/components/TicketsPage/MainSelectBox";
import AuthDialog from "@/components/shared/AuthDialog";
import HomeButton from "@/components/shared/Buttons/HomeButton";
import SectionTitle from "@/components/shared/SectionTitle";
import { ReactNode } from "react";

const Layouyt = async ({ children }: { children: ReactNode }) => {
  const req = await fetch(`${process.env.WebUrl}/api/categories/all`, {
    method: "GET",
    next: { tags: ["allCategories"] },
  });
  if (!req.ok) {
    return <div>خطایی رخ داده است</div>;
  }
  const res = await req.json();
  return (
    <div className="flex flex-col items-stretch lg:mt-10 lg:max-w-[1200px] lg:mx-auto">
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
              <SuggestionsPageMainSelectBox categories={res} />
            </div>
          </div>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Layouyt;
