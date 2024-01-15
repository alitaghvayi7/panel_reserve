import AuthDialog from "@/components/shared/AuthDialog";
import HomeButton from "@/components/shared/Buttons/HomeButton";
import SectionTitle from "@/components/shared/SectionTitle";
import { parseDateTime } from "@/lib/utils";
export const dynamic = "force-dynamic";
const ProgramsPage = async () => {
  const { dateString, timeString, weekday } = parseDateTime(
    new Date().toISOString()
  );
  const programsDataReq = await fetch(
    `${process.env.WebUrl}/api/programs/getPrograms`,
    {
      next: {
        tags: ["programs"],
      },
      method: "POST",
    }
  );
  const programsData = await programsDataReq.json();

  return (
    <div className="flex flex-col items-stretch">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-10">
        {/* title */}
        <div className="flex items-center justify-between">
          <div>
            <SectionTitle title="برنامه و ایدوئولوژی" />
          </div>
          {/*  buttons */}
          <div className="flex overflow-hidden lg:hidden gap-2 items-stretch">
            <HomeButton />
            <AuthDialog />
          </div>
        </div>
        <div className="mt-6 lg:mt-0 text-[12px] lg:text-[16px] text-primary-black">
          <div className="flex items-center gap-2">
            <div>{weekday}</div>
            <div className="flex items-center gap-2">
              <span>{timeString}</span>
              <span className="h-[15px] border-r-2 border-primary-black mb-1"></span>
              <span>{dateString}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-4 lg:mt-8 text-[14px] lg:text-[18px] font-light text-primary-black"
        dangerouslySetInnerHTML={{
          __html: programsData.Data.Description,
        }}
      ></div>
    </div>
  );
};

export default ProgramsPage;
