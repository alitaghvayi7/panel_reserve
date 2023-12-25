"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
const ClietnSessionProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClietnSessionProvider;
