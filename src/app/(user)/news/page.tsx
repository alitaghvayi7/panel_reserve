import { headers } from "next/headers";
import { getDictionary } from "../../dictionaries";
import SectionTitle from "@/components/shared/SectionTitle";
import { TSearchParams } from "@/types";
import Link from "next/link";
import NewsCard from "@/components/shared/Cards/NewsCard";
import { TablePagination } from "@/components/shared/TablePagination";

const getNews = async ({ page }: { page: number }) => {
  const req = await fetch(`${process.env.WebUrl}/api/news/getNewsList/user`, {
    method: "POST",
    next: {
      tags: ["news"],
    },
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Page: page,
      PerPage: 10,
      Title: null,
    }),
  });
  const res = await req.json();
  return res;
};

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

export default async function Home({
  params,
  searchParams,
}: {
  params: {
    [key: string]: string;
  };
  searchParams: TSearchParams;
}) {
  const dict = await getDictionary();
  const news = await getNews({ page: +searchParams.page || 1 });

  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Business",
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="flex flex-col items-stretch gap-4 lg-gap-6">
        <div>
          <SectionTitle title="جدیدترین اخبار و مقاله‌ها" />
        </div>
        <div className="grid auto-cols-[minmax(0,400px)] sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
          {news.Data.slice(0, 12).map((item: any) => {
            return (
              <Link
                key={item.Id}
                href={`/news/${item.Id}`}
                className="h-[288px] md:h-[430px]"
              >
                <NewsCard
                  type="vertical"
                  title={item.Title}
                  picture={item.Image}
                  description={item.Description}
                  date={item.CreatedAt}
                />
              </Link>
            );
          })}
        </div>
        {/* pagination */}
        <div className="mt-4">
          <TablePagination
            route="/news"
            currentPage={+searchParams.page || 1}
            perPage={10}
            total={news.TotalRow}
            searchParams={searchParams}
          />
        </div>
      </div>
    </>
  );
}
