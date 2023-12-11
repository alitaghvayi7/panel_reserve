import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "@/styles/globals.css";
import MainFooter from "@/components/shared/MainFooter";

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
      <body className={`${vazir.className} min-h-screen`}>
        {children}
        <MainFooter />
      </body>
    </html>
  );
}
