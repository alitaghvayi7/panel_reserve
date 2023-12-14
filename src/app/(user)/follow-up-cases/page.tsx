import HomeButton from "@/components/shared/Buttons/HomeButton";
import SectionTitle from "@/components/shared/SectionTitle";

const FollowUpCases = () => {
  return (
    <div className="flex flex-col items-stretch">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
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
        <div>form</div>
      </div>
    </div>
  );
};

export default FollowUpCases;
