import Image from "next/image";

type TNewsCard = {
  type: "vertical" | "horizantal";
  picture?: string;
  title?: string;
  description?: string;
  data?: string;
  time?: string;
};

const NewsCard = ({
  type,
  data,
  description,
  picture,
  time,
  title,
}: TNewsCard) => {
  return (
    <div
      className={`w-full h-full relative border border-secendory-gray ${
        type === "vertical"
          ? "flex flex-col items-stretch rounded-t-lg rounded-b-2xl"
          : "flex rounded-lg"
      }`}
    >
      {/* picture */}
      <div
        className={`relative overflow-hidden ${
          type === "vertical"
            ? "w-full h-1/2 rounded-t-lg"
            : "w-1/2 h-full rounded-lg"
        }`}
      >
        <Image
          className="object-cover"
          src={picture || "/Images/news.png"}
          alt="picture"
          fill
        />
      </div>
      {/* content */}
      <div
        className={`relative flex flex-col items-stretch gap-4 ${
          type === "vertical"
            ? "w-full h-1/2 px-4 pt-4 pb-10"
            : "w-1/2 h-full px-4 pt-4 lg:pt-6 pb-8"
        }`}
      >
        {/* title */}
        <div
          className={`text-[14px] lg:text-[18px] leading-none lg:leading-7 font-semibold text-primary-black ${
            type === "vertical" ? "line-clamp-3" : "line-clamp-4"
          }`}
        >
          عضو هیات رئیسه مجلس: خودروسازان با چراغ سبز شورای رقابت قیمت‌ها را
          افزایش دادند
        </div>
        {/* description */}
        {type === "vertical" ? (
          <div className="text-[12px] lg:text-[16px] line-clamp-2 text-secendory-black font-medium leading-none lg:leading-5">
            تولیدکننده تا دیروز با دلار چهار هزار تومانی مواد اولیه می خرید حالا
            با دلار چهل هزار تومانی باید بخرد....
          </div>
        ) : null}
        {/* date and time */}
        <div
          className={`flex justify-center w-fit items-center gap-1 text-[14px] bg-white leading-none text-third-black absolute bottom-[-1px] left-1/2 -translate-x-1/2 border-x border-t border-secendory-gray rounded-t-lg px-1 pt-1`}
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

export default NewsCard;
