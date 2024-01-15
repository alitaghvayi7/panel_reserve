import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "@/styles/globals.css";
import MainFooter from "@/components/shared/MainFooter";
import ClietnSessionProvider from "@/components/shared/ClientSessionProvider";
import NextTopLoader from "nextjs-toploader";

const vazir = Vazirmatn({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "نماینده یار",
  description: "سامانه تعاملی با نمایندگان مجلس",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="rtl" lang="fa-IR">
      <body
        className={`${vazir.className} min-h-screen flex flex-col items-stretch justify-between`}
      >
        <NextTopLoader zIndex={99999} showSpinner={false} color="#65DAB7" />
        <ClietnSessionProvider>
          {children}
          <MainFooter />
        </ClietnSessionProvider>
      </body>
    </html>
  );
}
