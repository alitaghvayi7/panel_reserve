import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "@/styles/global.css";

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
    <html lang="en">
      <body className={vazir.className}>{children}</body>
    </html>
  );
}
