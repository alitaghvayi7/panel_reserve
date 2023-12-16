import HomeButton from "@/components/shared/Buttons/HomeButton";
import SectionTitle from "@/components/shared/SectionTitle";

const suggestionsPage = () => {
  return (
    <div className="flex flex-col items-stretch lg:mt-10">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-20">
        {/* title */}
        <div className="flex items-center justify-between">
          <div>
            <SectionTitle title="پیشنهادات و انتقادات" />
          </div>
          <div className="lg:hidden">
            <HomeButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default suggestionsPage;
