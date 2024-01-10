import MultiMediaCard from "@/components/shared/Cards/MultiMediaCard";
import NewsCard from "@/components/shared/Cards/NewsCard";
import WebSiteNavigationCard from "@/components/shared/Cards/WebSiteNavigationCard";
import HomePageCarousel from "@/components/HomePage/HomePageCarousel";
import SectionTitle from "@/components/shared/SectionTitle";
import { CandidateInfoNav, NavSections } from "@/data/NavSections";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { getDictionary } from "../../dictionaries";

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
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  );
}
