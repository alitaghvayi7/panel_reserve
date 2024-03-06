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
  const header_url = headersList.get("x-url") || "";
  const dict = await getDictionary();
  return {
    title: dict.home.title,
    description: dict.home.description,
    openGraph: {
      title: dict.home.title,
      description: dict.home.description,
      url: header_url,
      locale: "fa-IR",
      type: "website",
      siteName: dict.site_name,
    },

    other: {
      "og:image": "/assets/logo.png",
      "og:image:width": "151",
      "og:image:height": "151",
      "og:image:type": "image/png",
      "twitter:image": "/assets/logo.png",
      "twitter:image:type": "image/png",
      "twitter:image:width": "151",
      "twitter:image:height": "151",
    },
  };
}

const getNews = async () => {
  const req = await fetch(`${process.env.WebUrl}/api/news/getNewsList/user`, {
    method: "POST",
    next: {
      tags: ["news"],
    },
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Page: 1,
      PerPage: 10,
      Title: null,
    }),
  });
  const res = await req.json();
  return res;
};

export default async function Home() {
  const dict = await getDictionary();
  const news = await getNews();
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Person",
    name: dict.home.title,
    image: "/assets/images/logo.png",
    legalName: dict.legal,
    description: dict.home.description,
    brand: dict.brand,
    review: {
      "@type": "Review",
      name: dict.brand,
      reviewBody: dict.home.description,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: dict.info.address,
      postalCode: dict.info.postal_code,
    },
    telePhone: dict.info.phone,
    url: dict.url,
    logo: "/assets/images/logo.png",
  };

  return (
    <main className="xl:container">
      <article className="px-6 lg:px-32 py-10">
        <HomePageCarousel />
        {/* nav sections */}
        <section>
          {/* main nav */}
          <nav>
            <ul className="mt-14 grid grid-cols-1 grid-flow-row sm:grid-cols-12 sm:grid-rows-1 gap-y-8 gap-x-4 sm:gap-y-0 sm:gap-x-6">
              {NavSections.map((item) => (
                <li
                  key={item.id}
                  className="sm:col-span-4 h-[157px] xl:h-[170px]"
                >
                  <WebSiteNavigationCard
                    description={item.description}
                    icon={item.icon}
                    name={item.title}
                    link={item.link}
                  />
                </li>
              ))}
            </ul>
          </nav>
          {/* candidate info nav */}
          <nav>
            <div className="flex flex-col items-stretch gap-8 mt-10">
              <SectionTitle title="با دکتر پزشکیان بیشتر آشنا شوید" />
              <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-6 xl:gap-y-0">
                {CandidateInfoNav.map((item) => {
                  return (
                    <li key={item.id} className="xl:h-full">
                      <Link
                        href={item.link}
                        className="flex items-center justify-between px-8 xl:px-4 xl:gap-2 py-6 rounded-2xl bg-[rgba(243,242,252,1)] leading-[16px] place-self-stretch xl:h-full"
                      >
                        <div className="flex flex-col justify-center gap-6">
                          <span className="text-[14px] xl:text-[14px] font-bold text-primary-black">
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
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </section>
        {/* last news section */}
        <section className="flex flex-col items-stretch gap-8 mt-10">
          <div className="flex justify-between">
            <SectionTitle title="آخرین اخبار" />
            <Link className="leading-none text-primary-black" href="/news">
              مشاهده همه
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-1 gap-x-6 gap-y-6 md:gap-y-0">
            <Link
              href={`/news/${news.Data[0].Id}`}
              className="col-span-1 md:col-span-5 h-[288px] md:h-[430px]"
            >
              <NewsCard
                type="vertical"
                title={news.Data[0].Title}
                picture={news.Data[0].Image}
                description={news.Data[0].Description}
                date={news.Data[0].CreatedAt}
              />
            </Link>
            <div className="col-span-1 md:col-span-7 grid grid-cols-1 grid-rows-2 gap-y-6">
              {news.Data.slice(1, 3).map((item: any) => (
                <Link
                  href={`/news/${item.Id}`}
                  key={item.Id}
                  className="h-[127px] md:h-[203px]"
                >
                  <NewsCard
                    title={item.Title}
                    picture={item.Image}
                    description={item.Description}
                    date={item.CreatedAt}
                    type="horizantal"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
        {/* multi media */}
        {/* <section className="flex flex-col items-stretch gap-8 mt-10">
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
        </section> */}
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </main>
  );
}
