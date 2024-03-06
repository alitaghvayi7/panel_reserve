import AccountTabs from "@/components/account/Tabs";
import AuthDialog from "@/components/shared/AuthDialog";
import HomeButton from "@/components/shared/Buttons/HomeButton";
import { nextAuthOptions } from "@/types/Auth";
import { getServerSession } from "next-auth";

import { notFound } from "next/navigation";
import { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const sessoin = await getServerSession(nextAuthOptions);
  if (!sessoin?.user) {
    notFound();
  }
  return (
    <div className="flex flex-col items-stretch gap-6">
      <>
        <AccountTabs />
      </>
      <div>{children}</div>
    </div>
  );
};

export default RootLayout;
