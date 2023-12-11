import Image from "next/image";

type TMultiMediaCard = {
  picture?: string;
  title?: string;
  description?: string;
  data?: string;
  time?: string;
};

const MultiMediaCard = ({
  data,
  description,
  picture,
  time,
  title,
}: TMultiMediaCard) => {
  return (
    <div
      className={`w-full h-full relative border border-secendory-gray flex flex-col items-stretch rounded-t-lg rounded-b-2xl`}
    >
      {/* picture */}
      <div className={`relative overflow-hidden w-full h-1/2 rounded-t-lg`}>
        <Image
          className="object-cover"
          src={picture || "/Images/news.png"}
          alt="picture"
          fill
        />
      </div>
      {/* content */}
      <div
        className={`relative flex flex-col items-stretch gap-2 w-full h-1/2 px-4 pt-4 pb-10`}
      >
        {/* title */}
        <div
          className={`text-[14px] lg:text-[14px] leading-6 lg:leading-5 font-semibold text-primary-black line-clamp-2 lg:line-clamp-3`}
        >
          رسانه‌ها در مرگ کیسینجر: «وزیر قاتل، استراتژیست زیرک، استاد حقه‌باز و
          مسئول مرگ میلیون‌ها تن»
        </div>
        {/* description */}

        <div className="text-[12px] lg:text-[16px] leading-5 line-clamp-2 text-secendory-black lg:font-light">
          مرگ هنری کیسینجر در سن ۱۰۰ سالگی، واکنش‌هایی را در سراسر جهان برانگیخت
          و میراث بحث‌برانگیز او در سیاست خارجی موجی از انتقادات و ستایش‌ها را
          در پی داشت.
        </div>

        {/* date and time */}
        <div
          className={`flex justify-center items-center gap-1 text-[14px] bg-white leading-none text-third-black absolute bottom-[-1px] z-[9999] left-1/2 -translate-x-1/2 border-x border-t border-secendory-gray rounded-t-lg px-1 pt-1`}
        >
          <div className="flex items-center justify-center leading-none">
            {`${(1404).toLocaleString("fa-IR", {
              useGrouping: false,
            })}/${(9).toLocaleString("fa-IR", {
              useGrouping: false,
            })}/${(23).toLocaleString("fa-IR", { useGrouping: false })}`}
          </div>
          <div className="h-4 w-[1px] bg-third-black mb-1"></div>
          <div className="flex items-center justify-center leading-none">
            {(10).toLocaleString("fa-IR", { useGrouping: false })}:
            {(23).toLocaleString("fa-IR", { useGrouping: false })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiMediaCard;
