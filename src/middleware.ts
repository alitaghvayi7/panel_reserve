import { getServerSession } from "next-auth";
import { withAuth } from "next-auth/middleware";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { nextAuthOptions } from "./types/Auth";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req.nextUrl.searchParams.get("type"));
    // console.log(req);
    if (!req.nextauth.token) {
      redirect("/");
    }
  },
  {
    // callbacks: {
    //   //   authorized: ({ token, req }) => {
    //   //     req.cookies.set("next-auth.callback-url", "/");
    //   //     return token?.isAdmin ? true : false;
    //   //   },
    // },
    // pages: {
    //   error: "/",
    //   signIn: "/wealth",
    //   verifyRequest: "/",
    // },
  }
);
export const config = { matcher: ["/panel/:path*"] };
