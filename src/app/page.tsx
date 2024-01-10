import MultiMediaCard from "@/components/shared/Cards/MultiMediaCard";
import NewsCard from "@/components/shared/Cards/NewsCard";
import WebSiteNavigationCard from "@/components/shared/Cards/WebSiteNavigationCard";
import HomePageCarousel from "@/components/HomePage/HomePageCarousel";
import SectionTitle from "@/components/shared/SectionTitle";
import { CandidateInfoNav, NavSections } from "@/data/NavSections";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { getDictionary } from "./dictionaries";

export async function generateMetadata({ params }: any) {
  const headersList = headers();
  const header_url = headersList.get('x-url') || "";
  const dict = await getDictionary()
  return {
    title: dict.home.title,
    description: dict.home.description,
    openGraph: {
      title: dict.home.title,
      description: dict.home.description,
      url: header_url,
      locale: 'fa-IR',
      type: "website",
      siteName: dict.site_name
    },

    other: {
      "og:image": "/assets/logo.png",
      "og:image:width": "151",
      "og:image:height": "151",
      "og:image:type": "image/png",
      "twitter:image": "/assets/logo.png",
      "twitter:image:type": "image/png",
      "twitter:image:width": "151",
      "twitter:image:height": "151"
    }
  }
}

export default async function Home() {
  const dict = await getDictionary()

  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Business",
    "name": dict.home.title,
    "image": "/assets/images/logo.png",
    "legalName": dict.legal,
    "description": dict.home.description,
    "brand": dict.brand,
    "review": {
      "@type": "Review",
      "name": dict.brand,
      "reviewBody": dict.home.description,
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": dict.info.address,
      "postalCode": dict.info.postal_code
    },
    "telePhone": dict.info.phone,
    "url": dict.url,
    "logo": "/assets/images/logo.png",
  }

  return (
    <>
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
        {/* candidate info nav */}
        <div className="flex flex-col items-stretch gap-8 mt-10">
          <SectionTitle title="با دکتر پزشکیان بیشتر آشنا شوید" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6 xl:gap-y-0">
            {CandidateInfoNav.map((item) => {
              return (
                <Link
                  href={item.link}
                  key={item.id}
                  className="flex items-center justify-between px-8 py-6 rounded-2xl bg-[rgba(243,242,252,1)] leading-none place-self-stretch"
                >
                  <div className="flex flex-col justify-center gap-6">
                    <span className="text-[14px] xl:text-[16px] font-bold text-primary-black">
                      {item.title}
                    </span>
                    <p className="text-[12px] text-secondary-black">
                      {item.description}
                    </p>
                  </div>
                  <div className="w-[70px] h-[65px] relative overflow-hidden">
                    <Image src={item.image} alt="" fill />
                  </div>
                </Link>
              );
            })}
          </div>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  );
}
