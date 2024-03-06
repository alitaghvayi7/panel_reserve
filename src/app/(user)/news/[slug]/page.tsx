import { headers } from "next/headers";
import HomeButton from "@/components/shared/Buttons/HomeButton";
import AuthDialog from "@/components/shared/AuthDialog";
import SectionTitle from "@/components/shared/SectionTitle";
import Image from "next/image";
import { getDictionary } from "@/app/dictionaries";

const getNewsData = async ({
  id,
}: {
  id: number;
}): Promise<{
  TotalRow: number;
  Message: string | null;
  Data: {
    Description: string;
    Id: number;
    Image: string;
    Title: string;
    Visibility: boolean;
  } | null;
  Error: boolean;
}> => {
  const getNews = await fetch(`${process.env.WebUrl}/api/news/getSingleNews`, {
    method: "POST",
    next: {
      tags: ["awards"],
    },
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Id: id,
    }),
  });
  if (!getNews.ok) {
    return {
      Data: null,
      Error: true,
      Message: "خطایی رخ داده است",
      TotalRow: 0,
    };
  }
  const res = await getNews.json();
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

export default async function News({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  const dict = await getDictionary();
  const news = await getNewsData({ id: +slug });

  // const { dateString, timeString, weekday } = parseDateTime(
  //   news.Data
  // );
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
      {/* content */}
      <div className="flex flex-col items-stretch gap-6">
        <div className="flex items-center justify-between lg:hidden">
          {/* <div>
            <div className="flex items-center gap-2 text-[12px] lg:text-[16px] text-primary-black">
              <div>{weekday}</div>
              <div className="flex items-center gap-2">
                <span>{timeString}</span>
                <span className="h-[15px] border-r-2 border-primary-black mb-1"></span>
                <span>{dateString}</span>
              </div>
            </div>
          </div> */}
        </div>

        <div className="flex flex-col items-stretch gap-6">
          {/* title */}
          <div className="flex items-center">
            <div className="ml-auto">
              <SectionTitle Heading="h1" title={news.Data?.Title || ""} />
            </div>
            {/* <div className="hidden lg:inline-flex">
              <div className="flex items-center gap-2 text-[12px] lg:text-[16px] text-primary-black">
                <div>{weekday}</div>
                <div className="flex items-center gap-2">
                  <span>{timeString}</span>
                  <span className="h-[15px] border-r-2 border-primary-black mb-1"></span>
                  <span>{dateString}</span>
                </div>
              </div>
            </div> */}
          </div>
          {/* main content */}
          <div className="flex flex-col items-stretch gap-6">
            {/* image */}
            <div className="relative overflow-hidden rounded-[32px] w-full aspect-square md:aspect-video max-h-[440px]">
              <Image
                className="md:object-cover"
                src={`${news.Data?.Image || "/Images/single-news.png"}`}
                alt="news image"
                fill
              />
            </div>
            {/* context */}
            <div
              dangerouslySetInnerHTML={{
                __html: news.Data?.Description || "",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
