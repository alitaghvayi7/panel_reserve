import { baseUrl } from "@/services/main";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: {
          label: "نام کاربری",
          type: "text",
          placeholder: "نام کاربری خود را وارد کنید",
        },
        password: { label: "رمز عبور", type: "password" },
      },
      name: "LoginWithUsername",
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch("/your/endpoint", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    CredentialsProvider({
      credentials: {
        username: {
          label: "تلفن همراه",
          type: "text",
          placeholder: "تلفن همراه خود را وارد کنید",
        },
        nationalCode: {
          label: "کد ملی",
          type: "text",
          placeholder: "کد ملی خود را وارد کنید",
        },
      },
      name: "LoginWithOTP",
      id: "LoginWithOTP",
      async authorize(credentials, { query }) {
        // console.log(query);
        // const formData = new FormData();
        // formData.append("Mobile", query?.phone);
        const request = await fetch(`${baseUrl}/api/public/get`, {
          method: "POST",
          next: { revalidate: 0 },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${query?.Token}`,
          },
        });

        const res = await request.json();
        // console.log(res);
        // If no error and we have user data, return it
        if (request.ok) {
          return {
            name: `${res.Data.User.Name || ""} ${res.Data.User.Family || ""}`,
            email: null,
            image: null,
            id: res.Data.User.Id,
            token: query?.Token,
            phone: res.Data.User.Mobile,
            isAdmin: res.Data.User.IsAdmin,
            nationalCode: res.Data.User.NationalCode,
          };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    redirect(params) {
      if (params.url.startsWith("/panel")) {
        return "/";
      }
      return params.url;
    },
    async signIn(params) {
      // console.log(params);

      switch (params.account?.provider) {
        case "LoginWithOTP": {
          return true;
        }

        default:
          return true;
      }
    },
    async jwt(params) {
      if (params.trigger === "signIn") {
        const tokan = {
          token: params.user.token,
          id: params.user.id,
          isAdmin: params.user.isAdmin,
          name: params.user.name,
          phone: params.user.phone,
        };
        return (params.token = { ...tokan });
      }
      return params.token;
    },
    async session(params) {
      // console.log(params, "session");

      const user = {
        ...params.session.user,
        token: params.token.token,
        isAdmin: params.token.isAdmin,
        phone: params.token.phone,
      };
      params.session.user = {
        ...user,
      };
      return params.session;
    },
  },
  pages: {
    signIn: "/",
  },
};
