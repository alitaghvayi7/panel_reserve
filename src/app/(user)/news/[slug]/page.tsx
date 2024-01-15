import { headers } from "next/headers";
import { getDictionary } from "../../../dictionaries";
import HomeButton from "@/components/shared/Buttons/HomeButton";
import AuthDialog from "@/components/shared/AuthDialog";
import { parseDateTime } from "@/lib/utils";
import SectionTitle from "@/components/shared/SectionTitle";
import Image from "next/image";

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

export default async function News() {
  const dict = await getDictionary();
  const { dateString, timeString, weekday } = parseDateTime(
    new Date().toISOString()
  );
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
          <div>
            <div className="flex items-center gap-2 text-[12px] lg:text-[16px] text-primary-black">
              <div>{weekday}</div>
              <div className="flex items-center gap-2">
                <span>{timeString}</span>
                <span className="h-[15px] border-r-2 border-primary-black mb-1"></span>
                <span>{dateString}</span>
              </div>
            </div>
          </div>
          <div className="flex overflow-hidden lg:hidden gap-2 items-stretch">
            <HomeButton />
            <AuthDialog />
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-6">
          {/* title */}
          <div className="flex items-center">
            <div className="ml-auto">
              <SectionTitle
                Heading="h1"
                title="گزارش عملکرد خودروسازان در ۸ ماهه امسال/تمرکز 
خصوصی‌ها بر سواری و غفلت از سنگین‌ها"
              />
            </div>
            <div className="hidden lg:inline-flex">
              <div className="flex items-center gap-2 text-[12px] lg:text-[16px] text-primary-black">
                <div>{weekday}</div>
                <div className="flex items-center gap-2">
                  <span>{timeString}</span>
                  <span className="h-[15px] border-r-2 border-primary-black mb-1"></span>
                  <span>{dateString}</span>
                </div>
              </div>
            </div>
          </div>
          {/* main content */}
          <div className="flex flex-col items-stretch gap-6">
            {/* image */}
            <div className="relative overflow-hidden rounded-[32px] w-full aspect-square md:aspect-video max-h-[440px]">
              <Image
                className="md:object-cover"
                src={`/Images/single-news.png`}
                alt="news image"
                fill
              />
            </div>
            {/* context */}
            <p>
              جزایر هاوایی آخرین ایالت ثبت‌شده مابین آمریکا هستند. مناطقی که در
              قسمت مرکزی اقیانوس آرام واقع شده‌اند و از پرطرفدارترین مقصدهای
              تفریحی مردم دنیا به‌حساب می‌آیند. مهم‌ترین شهر و پایتخت
              مجمع‌الجزایز هاوایی «هونولولو» نام دارد. هشت جزیره اصلی هاوائی
              اوآهو، مائوئی، کائوآئی، لانائی، مولوکای، نیهاو و کاهولاوی نامیده
              می‌شوند. جزایر هاوائی با میزبانی از کوه‌های آتشفشانی، آبشارهای
              زیبا و پارک‌های ملی در کنار ارائه منظرهای آبی تماشایی (چه خارج و
              چه داخل آب) به «بهشتِ جزیره‌ها» معروف شده است. همراه کجارو باشید
              که در تازه‌ترین قسمت از تورهای مجازی قرار است به‌جزایر هاوائی سفر
              کنیم. به گزارش خبرنگار سیاسی خبرگزاری فارس، جمعه گذشته (۱۲
              آبان‌ماه) بود که سید حسن نصرالله، دبیرکل حزب‌الله لبنان پس از گذشت
              ۲۸ روز از آغاز نبرد حماس علیه رژیم صهیونیستی، در بیروت سخنرانی
              کرد. دبیرکل حزب‌الله لبنان در بخشی از این سخنرانی خطاب به آمریکا
              هشدار داد؛ «ناوهای شما در دریای مدیترانه ما را نمی‌ترساند و هیچگاه
              ما را نخواهد ترساند. من به شما می‌گویم برای ناوهایتان که با آن‌ها
              ما را تهدید می‌کنید{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
