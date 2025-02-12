import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      access_token?: string;
      refresh_token?: string;
      token?: string;
      id?: string;
      image?: string | null;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      isAdmin: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    access_token?: string;
    refresh_token?: string;
    token?: string;
    id?: string;
    image?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    isAdmin: boolean;
  }
}

declare module "next-auth" {
  interface User {
    access_token?: string;
    refresh_token?: string;
    token?: string;
    id?: string;
    image?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    isAdmin: boolean;
  }

  interface AdapterUser {
    access_token?: string;
    refresh_token?: string;
    token?: string;
    id?: string;
    image?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    isAdmin: boolean;
  }
}
