import MainHeader from "@/components/shared/MainHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full px-6 py-7 md:px-8 md:py:10 xl:px-[8rem] xl:py-12">
      <MainHeader />
      <main className="lg:max-w-[1200px] lg:mx-auto">{children}</main>
    </div>
  );
}
