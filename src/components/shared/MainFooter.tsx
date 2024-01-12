import { MainFooterAboutUs, MainFooterNavigation } from "@/data/MainFooter";
import Image from "next/image";
import Link from "next/link";

const MainFooter = () => {
  return (
    <footer className="bg-primary-gray">
      <div className="w-full lg:max-w-[1400px] lg:mx-auto flex flex-col lg:flex-row items-stretch lg:items-start lg:justify-start px-6 lg:px-[5rem] py-8 lg:py-10 gap-7 lg:gap-24 mt-auto">
        <div className="flex flex-col xl:flex-row items-center xl:items-start gap-5 xl:gap-10">
          <div className="relative w-[95px] h-[63px] lg:w-[150px] lg:min-w-[150px] lg:h-[100px] lg:min-h-[100px] overflow-hidden">
            <Image
              className="object-cover"
              src={`/Images/Logo.png`}
              alt="logo"
              fill
            />
          </div>
          <div className="flex flex-col items-stretch gap-3 justify-center">
            <h5 className="text-[16px] text-center xl:text-start font-medium leading-none text-primary-black">
              درباره دکتر
            </h5>
            <p className="lg:max-w-[260px] text-[12px] lg:text-[14px] font-light text-secendory-black leading-4 lg:leading-5">
              دکتر مسعود پزشکیان فوق تخصص جراحی قلب، وزیر بهداشت دولت اصلاحات
              ،نایب رئیس مجلس دهم و نماینده شجاع مردم شریف تبریز، آذرشهر و اسکو
              در مجلس یازدهم شورای اسلامی
            </p>
          </div>
        </div>
        <div className="flex gap-16 lg:gap-20">
          <div className="flex flex-col whitespace-nowrap">
            <h5 className="text-[14px] lg:text-[16px] font-medium leading-none text-primary-black border-b border-b-third-gray pl-4 pb-2">
              لینک‌های مفید
            </h5>
            <nav className="mt-4">
              <ul className="flex flex-col gap-3 lg:gap-4">
                {MainFooterNavigation.map((item) => (
                  <li
                    className="text-[14px] lg:text-[16px] text-secendory-black leading-none"
                    key={item.id}
                  >
                    <Link href={item.link}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex flex-col items-start">
            <h5 className="text-[14px] lg:text-[16px] font-medium leading-none text-primary-black border-b border-b-third-gray pl-16 pb-2">
              تماس با ما
            </h5>
            <ul className="mt-4 flex flex-col gap-2">
              {MainFooterAboutUs.map((item) => (
                <li key={item.id} className="flex items-start gap-2">
                  <span className="min-w-[16px] w-[16px] min-h-[16px] h-[16px] lg:min-w-[24px] lg:w-[24px] lg:min-h-[24px] lg:h-[24px]">
                    {item.icon}
                  </span>
                  <p className="lg:max-w-[280px] text-[12px] lg:text-[16px] leading-5 lg:leading-7 text-secendory-black">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
