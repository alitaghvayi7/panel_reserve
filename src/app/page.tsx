import MultiMediaCard from "@/components/shared/Cards/MultiMediaCard";
import NewsCard from "@/components/shared/Cards/NewsCard";
import WebSiteNavigationCard from "@/components/shared/Cards/WebSiteNavigationCard";
import HomePageCarousel from "@/components/HomePage/HomePageCarousel";
import SectionTitle from "@/components/shared/SectionTitle";
import { NavSections } from "@/data/NavSections";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="px-6 lg:px-32 py-10">
      <HomePageCarousel />
      {/* nav sections */}
      <div className="mt-14 grid grid-cols-4 grid-flow-row lg:grid-cols-12 lg:grid-rows-1 gap-y-8 gap-x-4 lg:gap-y-0 lg:gap-x-6">
        {NavSections.map((item) => (
          <div
            key={item.id}
            className="col-span-2 lg:col-span-3 h-[157px] xl:h-[216px]"
          >
            <WebSiteNavigationCard
              description={item.description}
              icon={item.icon}
              name={item.title}
              link={item.link}
            />
          </div>
        ))}
      </div>
      {/* last news */}
      <div className="flex flex-col items-stretch gap-8 mt-10">
        <SectionTitle title="آخرین اخبار" />
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-1 gap-x-6 gap-y-6 md:gap-y-0">
          <div className="col-span-1 md:col-span-5 h-[288px] md:h-[430px]">
            <NewsCard type="vertical" />
          </div>
          <div className="col-span-1 md:col-span-7 grid grid-cols-1 grid-rows-2 gap-y-6">
            <div className="h-[127px] md:h-[203px]">
              <NewsCard type="horizantal" />
            </div>
            <div className="h-[127px] md:h-[203px]">
              <NewsCard type="horizantal" />
            </div>
          </div>
        </div>
      </div>
      {/* multi media */}
      <div className="flex flex-col items-stretch gap-8 mt-10">
        <SectionTitle title="چند رسانه‌ای" />
        <div className="grid grid-cols-1 grid-flow-row md:grid-cols-12 md:grid-rows-1 gap-4 md:gap-y-0">
          <div className="col-span-1 h-[350px] md:col-span-3 md:h-[335px]">
            <MultiMediaCard />
          </div>
          <div className="col-span-1 h-[350px] md:col-span-3 md:h-[335px]">
            <MultiMediaCard />
          </div>
          <div className="col-span-1 h-[350px] md:col-span-3 md:h-[335px]">
            <MultiMediaCard />
          </div>
          <div className="col-span-1 h-[350px] md:col-span-3 md:h-[335px]">
            <MultiMediaCard />
          </div>
        </div>
      </div>
    </main>
  );
}
