import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import PanelMainSidebar from "@/components/panel/MainSidebar";
import { Viewport } from "next";
import { nextAuthOptions } from "@/types/Auth";

export const viewport: Viewport = {
  width: 1200,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(nextAuthOptions);
  if (!session?.user.isAdmin) {
    notFound();
  }
  return (
    <div className="flex w-full max-w-[2000px] mx-auto">
      <div>
        <PanelMainSidebar />
      </div>
      <div className="grow py-4 pr-8 pl-20">{children}</div>
    </div>
  );
}
